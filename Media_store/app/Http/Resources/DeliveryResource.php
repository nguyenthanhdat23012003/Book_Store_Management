<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeliveryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'name' => $this->name,
            'phone' => $this->phone,
            'province' => $this->province,
            'address' => $this->address,
            'status' => $this->status,
            'type' => $this->type,
            'completed_at' => $this->completed_at ? $this->completed_at->format('d-m-Y') : null,
            'rejected_at' => $this->rejected_at ? $this->rejected_at->format('d-m-Y') : null,
            'order' => [
                'id' => $this->order->id,
                'created_at' => $this->order->created_at->format('Y-m-d'),
                'free_ship_discount' => $this->order->free_ship_discount,
                'shipping_fee' => $this->order->shipping_fee,
                'total' => $this->order->total_price,
            ],
        ];
    }
}
