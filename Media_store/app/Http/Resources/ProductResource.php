<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            // 'id' => $this->id,
            // 'type' => $this->type,
            // 'name' => $this->name,
            // 'image_url' => $this->image_path,
            // 'description' => $this->description,
            // 'price' => $this->price,
            // 'in_stock' => $this->in_stock,
            // 'quantity' => 1,
        ];
    }
}
