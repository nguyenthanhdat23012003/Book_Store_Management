<?php

namespace App\Repositories\Order;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\Paginator;
use App\Http\Resources\OrderResource;
use App\Repositories\EloquentRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Repositories\Order\OrderRepositoryInterface;

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
        if (auth()->user()->cannot('viewAny', $this->_model)) {
            abort(403, 'Unauthorized action.');
        };

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
        $sortDirection = request('sort_dir', 'desc');

        if (request('name')) {
            $query->whereHas('user', function ($q) {
                $q->where('name', 'LIKE', '%' . request('name') . '%');
            });
        };

        if (request('status') && request('status') !== 'all') {
            $query->where('status', request('status'));
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

        $orders = $query->orderBy($sortField, $sortDirection)->paginate(10)->appends(request()->query())->onEachSide(1);

        return Inertia::render('Orders/Manage', [
            'orders' => OrderResource::collection($orders),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Confirm an order
     * @var Order $order
     */
    public function confirmOrder($order)
    {
        if (auth()->user()->cannot('viewAny', $this->_model)) {
            abort(403, 'Unauthorized action.');
        };

        $outOfStock = $order->productsAreAvailable();
        if (!empty($outOfStock)) {
            return response()->json(['status' => 'fail', 'message' => 'Some products are out of stock']);
        }
        // dd($outOfStock);
        // Disable events temporarily and update the order
        $this->_model::withoutEvents(
            function () use ($order) {
                $order->status = 'confirmed';
                $order->save();
            }
        );

        // Disable events temporarily and update the stock of products
        Product::withoutEvents(
            function () use ($order) {
                foreach ($order->order_items as $item) {
                    $item->product->update([
                        'in_stock' => $item->product->in_stock - $item->quantity
                    ]);
                };
            }
        );

        return response()->json(['status' => 'success', 'message' => 'You have comfirmed order from ' . $order->user->name]);
    }

    /**
     * Reject an order
     * @var Order $order
     */
    public function rejectOrder($order)
    {
        if (auth()->user()->cannot('viewAny', $this->_model)) {
            abort(403, 'Unauthorized action.');
        };

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

        return response()->json(['status' => 'success', 'message' => 'You have rejected order from ' . $order->user->name]);
    }

    /**
     * Place order again
     * @var Order $order
     */
    public function buyAgain($order)
    {
        // dd($order);
        if ($order->status !== 'completed') {
            return to_route('order.edit', $order);
        } else {
            $cart = auth()->user()->cart;
            foreach ($order->order_items as $item) {
                $cart->cart_items()->updateOrCreate(
                    ['product_id' => $item->product_id],
                    ['quantity' => DB::raw("quantity + {$item->quantity}")]
                );
            }

            return to_route('cart.index');
        }
    }

    /**
     * Confirm receipt of order
     * @var Order $order
     */
    public function confirmReceipt($order)
    {
        if (auth()->user()->cannot('view', $order)) {
            abort(403, 'Unauthorized action.');
        };

        // Disable events temporarily and update the order
        $this->_model::withoutEvents(
            function () use ($order) {
                $order->status = 'completed';
                $order->completed_at = now();
                $order->save();
            }
        );

        return response()->json(['status' => 'success', 'message' => 'Confirm receipt of order successfully']);
    }
}
