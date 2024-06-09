<?php

namespace App\Repositories\Product;

use Illuminate\Http\Request;

interface ProductRepositoryInterface
{
    /**
     * Display a listing of the resource. (For admin and manager only)
     * 
     * @var \Illuminate\Pagination\LengthAwarePaginator $products 
     */
    public function manageProducts();
}
