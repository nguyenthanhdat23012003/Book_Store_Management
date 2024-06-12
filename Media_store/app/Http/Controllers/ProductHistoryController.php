<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductActionsResource;
use Inertia\Inertia;
use App\Models\ProductHistory;

class ProductHistoryController extends Controller
{
    public function index()
    {
        $query = ProductHistory::with([
            'product' => function ($query) {
                $query->withTrashed();
            },
            'actor'
        ]);

        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_dir', 'desc');

        if (request('action') && request('action') !== 'all') {
            $query->where('action', request('action'));
        }

        if (request('actor_name')) {
            $query->whereHas('actor', function ($query) {
                $query->where('name', 'like', '%' . request('actor_name') . '%');
            });
        };

        if (request('product_name')) {
            $query->whereHas('product', function ($query) {
                $query->where('name', 'like', '%' . request('product_name') . '%');
            });
        };

        $history = $query->orderBy($sortField, $sortDirection)->paginate(10)->appends(request()->query());

        // dd($history);
        return Inertia::render('ProductActions/Index', [
            'productActions' => ProductActionsResource::collection($history),
            'queryParams' => request()->query() ?: null,
            'alert' => session('success') ?? session('fail'),
            'success' => session('success') ? true : false
        ]);
    }
}
