<?php

namespace App\Repositories\Order;

use App\Http\Resources\OrderResource;
use Inertia\Inertia;
use Illuminate\Pagination\Paginator;
use App\Repositories\EloquentRepository;
use App\Repositories\Order\OrderRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class OrderEloquentRepository extends EloquentRepository implements OrderRepositoryInterface
{

    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return \App\Models\Order::class;
    }

    /**
     * Display a listing of the resource. (For admin and manager only)
     * 
     * @var \Illuminate\Pagination\LengthAwarePaginator $orders 
     */
    public function manageOrders()
    {
        $query = $this->_model::with([
            'order_items' => function ($query) {
                $query->with(['product' => function ($query) {
                    $query->withTrashed();
                }]);
            },
            'delivery',
            'payment'
        ]);

        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_dir', 'asc');

        if (request('name')) {
            $query->whereHas('user', function ($q) {
                $q->where('name', 'like', '%' . request('name') . '%');
            });
        };

        if (request('status')) {
            request('status') === 'all' ? '' : $query->where('status', request('status'));
        };

        if (request('delivery_type') && request('delivery_type') !== 'all') {
            $query->whereHas('delivery', function ($q) {
                $q->where('type', request('delivery_type'));
            });
        };

        if (request('payment_method') && request('payment_method') !== 'all') {
            $query->whereHas('payment', function ($q) {
                $q->where('method', request('payment_method'));
            });
        }

        $orders = $query->orderBy($sortField, $sortDirection)->paginate(10);

        $transformedOrders = OrderResource::collection($orders);

        $paginatedOrders = new LengthAwarePaginator(
            $transformedOrders,
            $orders->total(),
            $orders->perPage(),
            $orders->currentPage(),
            ['path' => Paginator::resolveCurrentPath()]
        );

        return Inertia::render('Orders/Manage', [
            'orders' => $paginatedOrders,
            'queryParams' => request()->query() ?: null,
            'alert' => session('success') ?? session('fail'),
            'success' => session('success') ? true : false
        ]);
    }

    /**
     * Confirm an order
     * @var Order $order
     */
    public function confirmOrder($order)
    {
        // Disable events temporarily and update the order
        $this->_model::withoutEvents(
            function () use ($order) {
                $order->status = 'confirmed';
                $order->delivery->status = 'in progress';
                $order->delivery->save();
                $order->save();
            }
        );
    }

    /**
     * Reject an order
     * @var Order $order
     */
    public function rejectOrder($order)
    {
        $message = null;

        // Disable events temporarily and update the order
        $this->_model::withoutEvents(
            function () use ($order) {

                $order->status = 'rejected';
                $reason = request('reason');
                switch ($reason) {
                    case 'undeliveried':
                        $order->delivery->status = 'rejected';
                        $message = 'Order is undeliveried';
                        break;
                    case 'out_of_stock':
                        $message = 'Product is out of stock';
                        break;
                    case 'item_not_found':
                        $message = 'We cannot find the item';
                        break;
                    case 'other':
                        $message = 'Other reason';
                        break;
                }
                $order->save();
            }
        );
    }
}
