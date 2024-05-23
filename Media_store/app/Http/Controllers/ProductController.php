<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\CDResource;
use App\Http\Resources\DVDResource;
use App\Http\Resources\BookResource;
use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['book', 'cd', 'dvd'])->paginate(20);

        $transformedProducts = $products->getCollection()->map(function ($product) {
            switch ($product->type) {
                case 'book':
                    return new BookResource($product->book);
                case 'cd':
                    return new CDResource($product->cd);
                case 'dvd':
                    return new DVDResource($product->dvd);
                default:
                    return $product;
            }
        });

        $paginatedProducts = new LengthAwarePaginator(
            $transformedProducts,
            $products->total(),
            $products->perPage(),
            $products->currentPage(),
            ['path' => Paginator::resolveCurrentPath()]
        );

        return Inertia::render('Products/Index', [
            'products' => $paginatedProducts,
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
