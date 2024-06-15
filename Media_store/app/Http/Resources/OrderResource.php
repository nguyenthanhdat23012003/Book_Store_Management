<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $this->order_items->transform(function ($item) {
            if (!str_contains($item->product->image_path, "/storage/")) {
                $item->product->image_path = Storage::url($item->product->image_path);
            }
            return $item;
        });
        return [
            'id' => $this->id,
            'user_name' => $this->user->name,
            'total_price' => $this->total_price,
            'shipping_fee' => $this->shipping_fee,
            'free_ship_discount' => $this->free_ship_discount,
            'status' => $this->status,
            'payment_method' => $this->payment ? $this->payment->method : null,
            'delivery_type' => $this->delivery ? $this->delivery->type : null,
            'created_at' => $this->created_at->format('Y-m-d H:i'),
            'completed_at' => $this->completed_at ? $this->completed_at->format('Y-m-d H:i') : null,
            'order_items' => $this->order_items,
            'delivery' => [
                'name' => $this->delivery->name,
                'email' => $this->delivery->email,
                'phone' => $this->delivery->phone,
                'province' => $this->delivery->province,
                'address' => $this->delivery->address,
                'status' => $this->delivery->status,
                'completed_at' => $this->delivery->completed_at ? $this->delivery->completed_at->format('Y-m-d H:i') : null,
                'rejected_at' => $this->delivery->rejected_at ? $this->delivery->rejected_at->format('Y-m-d H:i') : null,
            ],
            'payment' => [
                'method' => $this->payment->method,
                'total' => $this->payment->total,
                'paid_at' => $this->payment->paid_at ? $this->payment->paid_at->format('Y-m-d H:i') : null,
                // 'updated_at' => $this->payment->updated_at->format('Y-m-d'),
            ],
        ];
    }
}
