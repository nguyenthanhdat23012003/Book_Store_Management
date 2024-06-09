<?php

namespace App\Observers;

use App\Models\Order;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    public function created(Order $order): void
    {
        $items = collect(request()->products);

        // create the order items
        $order->order_items()->createMany(
            $items->map(function ($item) {
                return [
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'],
                ];
            })->toArray()
        );
    }

    /**
     * Handle the Order "updating" event.
     */
    public function updating(Order $order): void
    {
        $data = request()->all();
        // dd($data);

        // store the delivery
        $order->delivery()->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'type' => $data['delivery_type'],
            'province' => $data['province'],
            'address' => $data['address'],
            'status' => 'pending'
        ]);

        // store the payment
        $order->payment()->create([
            'method' => $data['payment_method'],
            'total' => $data['total_price'],
        ]);
    }

    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        // remove the items from the cart
        $order_products = $order->order_items->pluck('product_id');
        $cart = request()->user()->cart;
        $cart->products()->detach($order_products);
    }

    /**
     * Handle the Order "deleted" event.
     */
    public function deleted(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "restored" event.
     */
    public function restored(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "force deleted" event.
     */
    public function forceDeleted(Order $order): void
    {
        //
    }
}
