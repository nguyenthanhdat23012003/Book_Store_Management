<?php

namespace App\Repositories\Cart;

use App\Models\Product;
use Illuminate\Http\Request;

interface CartRepositoryInterface
{
    /**
     * Add product to cart
     * @var \Illuminate\Http\Request $request
     * @var \App\Models\Product $product
     */
    public function addToCart(Request $request, Product $product);

    /**
     * Remove product from cart
     * @var \Illuminate\Http\Request $request
     * @var \App\Models\Product $product
     */
    public function removeFromCart(Request $request, Product $product);

    /**
     * Change quantity of product in cart
     * @var \Illuminate\Http\Request $request
     * @var \App\Models\Product $product
     */
    public function changeQuantity(Request $request, Product $product);
}
