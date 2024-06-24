<?php

namespace App\Repositories\Product;

use Inertia\Inertia;
use App\Http\Resources\ProductResource;
use App\Repositories\EloquentRepository;

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
            $query->where('name', 'LIKE', '%' . request('name') . '%');
        }

        if (request('type' && request('type') !== 'all')) {
            $query->where('type', request('type'));
        }

        $products = $query->orderBy($sortField, $sortDirection)->paginate(10)->appends(request()->query())->onEachSide(1);

        return Inertia::render('Products/Manage', [
            'products' => ProductResource::collection($products),
            'queryParams' => request()->query() ?: null,
            'alert' => session('success') ?? session('fail'),
            'success' => session('success') ? true : false
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = $this->_model::where('in_stock', '>', '0');

        if (request('name')) {
            $query->where('name', 'LIKE', '%' . request('name') . '%')
                ->orWhere('genre', 'LIKE', '%' . request('name') . '%');
        }

        if (request('type') && request('type') !== 'all') {
            $query->where('type', request('type'));
        }

        if (request('genre') && request('genre') !== 'all') {
            $query->where('genre', 'LIKE', '%' . request('genre') . '%');
        }

        if (request('price_range')) {
            if (request('price_range.min')) {
                $query->where('price', '>=', request('price_range.min') * 1000)->orderBy('price', 'asc');
            }
            if (request('price_range.max')) {
                $query->where('price', '<=', request('price_range.max') * 1000)->orderBy('price', 'asc');
            }
        }

        if (request('rating')) {
            $query->where('avgRating', '>=', 2 * request('rating') - 1)->orderBy('avgRating', 'asc');
        }

        if (!request('sort_field') || request('sort_field') === 'random') {
            $query->inRandomOrder();
        } else if (request('sort_field') && request('sort_dir')) {
            $query->orderBy(request('sort_field'), request('sort_dir'));
        }


        $products = $query->paginate(12)->appends(request()->query())->onEachSide(1);

        return Inertia::render('Products/Index', [
            'products' => ProductResource::collection($products),
            'queryParams' => request()->query() ?: null,
        ]);
    }
}
