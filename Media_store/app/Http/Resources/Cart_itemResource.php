<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class Cart_itemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->product->id,
            'type' => $this->product->type,
            'name' => $this->product->name,
            'image_url' => Storage::url($this->product->image_path),
            'description' => $this->product->description,
            'price' => $this->product->price,
            'in_stock' => $this->product->in_stock,
            'quantity' => $this->quantity,
        ];
    }
}
