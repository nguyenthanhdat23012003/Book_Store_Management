<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Delivery;
use Illuminate\Http\Request;
use App\Http\Resources\DeliveryResource;
use App\Models\Order;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;

class DeliveryController extends Controller
{
    public function manage()
    {
        $query = Delivery::with('order')->whereHas('order', function ($query) {
            $query->where('status', 'confirmed')
                ->orWhere('status', 'completed');
        });

        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_dir', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        };

        if (request('status') && request('status') !== 'all') {
            $query->where('status', request('status'));
        };

        if (request('type') && request('type') !== 'all') {
            $query->where('type', request('type'));
        };

        $deliveries = $query->orderBy($sortField, $sortDirection)->paginate(10);

        $transformedDeliveries = DeliveryResource::collection($deliveries);

        $paginatedDeliveries = new LengthAwarePaginator(
            $transformedDeliveries,
            $deliveries->total(),
            $deliveries->perPage(),
            $deliveries->currentPage(),
            ['path' => Paginator::resolveCurrentPath()]
        );

        return Inertia::render('Deliveries/Manage', [
            'deliveries' => $paginatedDeliveries,
            'queryParams' => request()->query() ?: null,
        ]);
    }

    public function confirm(Delivery $delivery)
    {
        $delivery->status = 'in progress';
        $delivery->save();

        return response()->json(['status' => 'success', 'message' => 'Confirm delivery successfully']);
    }

    public function reject(Delivery $delivery)
    {
        $delivery->status = 'rejected';
        $delivery->rejected_at = now();
        $delivery->save();

        Order::withoutEvents(function () use ($delivery) {
            $delivery->order->status = 'rejected';
            $delivery->order->save();
        });

        return response()->json(['status' => 'success', 'message' => 'Refuse delivery successfully']);
    }

    public function complete(Delivery $delivery)
    {
        $delivery->status = 'completed';
        $delivery->completed_at = now();
        $delivery->save();

        return response()->json(['status' => 'success', 'message' => 'Confirm delivery completion successfully']);
    }
}
