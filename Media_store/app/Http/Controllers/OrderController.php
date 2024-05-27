<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Orders/Index', [
            'orders' => Order::with(['order_items.product', 'delivery'])
                ->where('user_id', auth()->id())
                ->where('status', '<>', 'pending')
                ->latest()
                ->paginate(12),
            'message' => session('success') ?? session('error'),
            'success' => session('success') ? true : false,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the number of items in stock
        $items = collect($request->products);
        $total_price = 0;
        foreach ($items as $item) {
            if ($item['in_stock'] < $item['quantity']) {
                return redirect()->back()->with('error', 'Not enough stock for ' . $item['name']);
            }
            $total_price += $item['price'] * $item['quantity'];
        }

        // calculate the total price of the order
        $order = $request->user()->orders()->create([
            'total_price' => $total_price,
        ]);

        // create the order items
        $order->order_items()->createMany(
            $items->map(function ($item) {
                return [
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'],
                ];
            })->toArray()
        );

        return to_route('order.show', $order->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with('order_items.product')->findOrFail($id);
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }
        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $order = Order::findOrFail($id);
        $data = $request->all();
        $order->update([
            'shipping_fee' => $data['shipping_fee'],
            'free_ship_discount' => $data['free_ship_discount'],
            'delivery_type' => $data['delivery_type'],
            'total_price' => $data['total_price'],
            'status' => 'unpaid',
        ]);

        // store the delivery
        $order->delivery()->create([
            'phone' => $data['phone'],
            'province' => $data['province'],
            'address' => $data['address'],
            'status' => 'in progress'
        ]);

        // store the payment
        $order->payment()->create([
            'payment_method' => $data['payment_method'],
            'total_payment' => $data['total_price'],
            'paid_at' => now(),
        ]);

        // remove the items from the cart
        $order_products = $order->order_items->pluck('product_id');
        $cart = $request->user()->cart;
        $cart->products()->detach($order_products);

        if ($data['payment_method'] === 'vn pay') {
            return to_route('checkout', $order->id);
        } else {
            return to_route('order.index')->with('success', 'Place order successfully');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
