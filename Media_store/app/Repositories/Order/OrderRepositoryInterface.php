<?php

namespace App\Repositories\Order;

use App\Models\Order;
use Illuminate\Http\Request;

interface OrderRepositoryInterface
{
    /**
     * Display a listing of the resource. (For admin and manager only)
     * 
     * @var \Illuminate\Pagination\LengthAwarePaginator $products 
     */
    public function manageOrders();

    /**
     * Confirm an order
     * @var Order $order
     */
    public function confirmOrder(Order $order);

    /**
     * Reject an order
     * @var Order $order
     */
    public function rejectOrder(Order $order);
}
