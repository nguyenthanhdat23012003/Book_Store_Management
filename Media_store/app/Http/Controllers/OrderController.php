<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreOrderRequest;
use App\Repositories\Order\OrderEloquentRepository;

class OrderController extends Controller
{
    protected $orderRepository;

    public function __construct(OrderEloquentRepository $orderRepo)
    {
        $this->orderRepository = $orderRepo;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Order::where('user_id', auth()->id())
            ->with([
                'order_items' => function ($query) {
                    $query->with(['product' => function ($query) {
                        $query->withTrashed();
                    }]);
                },
                'delivery',
                'payment'
            ]);

        if (request('field') && request('field') !== 'all') {
            if (request('field') === 'paid') {
                $query->whereIn('status', ['paid', 'pending']);
            } else if (request('field') === 'failed') {
                $query->whereIn('status', ['failed', 'rejected', 'cancelled']);
            } else {
                $query->where('status', request('field'));
            }
        }

        $order = $query->orderBy('created_at', 'desc')->paginate(6)->appends(request()->query())->onEachSide(1);

        return Inertia::render('Orders/Index', [
            'orders' => OrderResource::collection($order),
            'queryParams' => request()->query() ?: null,
            'alert' => session('success') ?? session('fail'),
            'success' => session('success') ? true : false
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $items = collect($request->products);
        $total_price = 0;

        // Validate the number of items in stock
        foreach ($items as $item) {
            if ($item['in_stock'] < $item['quantity']) {
                return back()->with('error', 'The quantity of ' . $item['name'] . ' is not enough. Available: ' . $item['in_stock']);
            }
            $total_price += (int) $item['price'] * (int) $item['quantity'];
        }

        // calculate the total price of the order
        $order = $request->user()->orders()->create([
            'total_price' => $total_price,
            'status' => 'cancelled',
        ]);

        return to_route('order.edit', $order->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with([
            'order_items' => function ($query) {
                $query->with(['product' => function ($query) {
                    $query->withTrashed();
                }]);
            },
            'delivery',
            'payment'
        ])->findOrFail($id);

        if (auth()->user()->cannot('view', $order)) {
            return to_route('orders.index')->with('fail', 'You are not authorized to view this order.');
        }


        return Inertia::render('Orders/Show', [
            'order' => new OrderResource($order),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $order = Order::with([
            'order_items' => function ($query) {
                $query->with(['product' => function ($query) {
                    $query->withTrashed();
                }]);
            }
        ])->findOrFail($id);

        if (auth()->user()->cannot('update', $order)) {
            return to_route('orders.index')->with('fail', 'You are not authorized to edit this order.');
        }

        // add the image path to the product
        $order->order_items->transform(function ($item) {
            $item->product->image_path = Storage::url($item->product->image_path);
            return $item;
        });

        return Inertia::render('Orders/Edit', [
            'order' => $order,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreOrderRequest $request, string $id)
    {
        $order = Order::findOrFail($id);
        if (auth()->user()->cannot('update', $order)) {
            return to_route('orders.index')->with('fail', 'You are not authorized to edit this order.');
        }

        $data = $request->validated();
        // dd($data);

        $order->update([
            'shipping_fee' => $data['shipping_fee'],
            'free_ship_discount' => $data['free_ship_discount'],
            'total_price' => $data['total_price'],
            'status' => $data['payment_method'] === 'vnpay' ? 'unpaid' : 'pending',
        ]);

        if ($data['payment_method'] === 'vnpay') {
            return to_route('checkout', $order->id);
        } else {
            return to_route('order.index')->with('success', 'Place order successfully');
        }
    }

    public function manage()
    {
        return $this->orderRepository->manageOrders();
    }

    public function confirm(Order $order)
    {
        return $this->orderRepository->confirmOrder($order);
    }

    public function reject(Order $order)
    {
        return $this->orderRepository->rejectOrder($order);
    }

    public function buyAgain(Order $order)
    {
        return $this->orderRepository->buyAgain($order);
    }

    public function confirmReceipt(Order $order)
    {
        return $this->orderRepository->confirmReceipt($order);
    }
}
