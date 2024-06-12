<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

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
            'id' => $this->id,
            'type' => $this->type,
            'image_path' => Storage::url($this->image_path),
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'in_stock' => $this->in_stock,
            'genre' => $this->genre,
            'weight' => $this->weight,
            'rating' => $this->rating,
            'sold' => $this->sold,
            'created_at' => $this->created_at->format('Y-m-d'),
        ];
    }
}
