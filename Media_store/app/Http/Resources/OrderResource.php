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
            'status' => $this->status,
            'payment_method' => $this->payment ? $this->payment->method : null,
            'delivery_type' => $this->delivery ? $this->delivery->type : null,
            'created_at' => $this->created_at->format('Y-m-d'),
            'completed_at' => $this->completed_at ? $this->completed_at->format('Y-m-d') : null,
            'order_items' => $this->order_items,
            'delivery' => $this->delivery,
        ];
    }
}
