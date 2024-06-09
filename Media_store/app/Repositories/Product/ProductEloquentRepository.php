<?php

namespace App\Repositories\Product;

use Inertia\Inertia;
use Illuminate\Pagination\Paginator;
use App\Http\Resources\ProductResource;
use App\Repositories\EloquentRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductEloquentRepository extends EloquentRepository implements ProductRepositoryInterface
{

    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return \App\Models\Product::class;
    }

    /**
     * Display a listing of the resource. (For admin and manager only)
     * 
     * @var \Illuminate\Pagination\LengthAwarePaginator $products 
     */
    public function manageProducts()
    {
        $query = $this->_model::query();

        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_dir', 'asc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        } else if (request('type')) {
            request('type') === 'all' ? '' : $query->where('type', request('type'));
        }

        $products = $query->orderBy($sortField, $sortDirection)->paginate(10);

        $transformedProducts = ProductResource::collection($products);

        $paginatedProducts = new LengthAwarePaginator(
            $transformedProducts,
            $products->total(),
            $products->perPage(),
            $products->currentPage(),
            ['path' => Paginator::resolveCurrentPath()]
        );
        return Inertia::render('Products/Manage', [
            'products' => $paginatedProducts,
            'queryParams' => request()->query() ?: null,
            'alert' => session('success') ?? session('fail'),
            'success' => session('success') ? true : false
        ]);
    }
}
