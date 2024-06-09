<?php

namespace App\Repositories\Cart;

use App\Repositories\EloquentRepository;

class CartEloquentRepository extends EloquentRepository implements CartRepositoryInterface
{

    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return \App\Models\Cart::class;
    }

    /**
     * Add product to cart
     * @var \Illuminate\Http\Request $request
     * @var \App\Models\Product $product
     */
    public function addToCart($request, $product)
    {

        $cart = $request->user()->cart ??  $request->user()->cart()->create();

        $productID = $product->id;
        $quantity = $request->quantity ?? 1;

        // Check if the product is already in the cart
        $existingItem = $cart->cart_items()->where('product_id', $product->id)->first();

        if ($existingItem) {
            // If the product already exists in the cart, update the quantity
            $existingItem->quantity += $quantity;
            $existingItem->save();
            return response()->json('exist');
        } else {
            // If the product does not exist, create a new cart item
            $cart->cart_items()->create([
                'product_id' => $productID,
                'quantity' => $quantity,
            ]);
            return response()->json('new');
        }
    }

    /**
     * Remove product from cart
     * @var \Illuminate\Http\Request $request
     * @var \App\Models\Product $product
     */
    public function removeFromCart($request, $product)
    {
        $cart = $request->user()->cart;
        $cart->cart_items()->where('product_id', $product->id)->delete();
        return to_route('cart.index');
    }

    /**
     * Change quantity of product in cart
     * @var \Illuminate\Http\Request $request
     * @var \App\Models\Product $product
     */
    public function changeQuantity($request, $product)
    {
        $cart = $request->user()->cart;
        $res = $cart->cart_items()->where('product_id', $product->id)->update(['quantity' => $request->quantity]);
        return response()->json($res ? 'success' : 'fail');
    }
}
