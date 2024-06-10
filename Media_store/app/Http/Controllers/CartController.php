<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Repositories\Cart\CartEloquentRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    protected $cartRepository;

    public function __construct(CartEloquentRepository $cartRepo)
    {
        $this->cartRepository = $cartRepo;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Carts/Index', [
            'error' => session('error')
        ]);
    }

    public function addToCart(Request $request, Product $product)
    {
        return $this->cartRepository->addToCart($request, $product);
    }

    public function removeFromCart(Request $request, Product $product)
    {
        return $this->cartRepository->removeFromCart($request, $product);
    }

    public function updateCart(Request $request, Product $product)
    {
        return $this->cartRepository->changeQuantity($request, $product);
    }
}
