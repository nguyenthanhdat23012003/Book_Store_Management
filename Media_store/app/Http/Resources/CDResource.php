<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CDResource extends JsonResource
{
    public static $wrap = null;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $product = $this->product;

        return [
            'id' => $this->id,
            'artists' => $this->artists,
            'albums' => json_decode($this->albums),
            'record_label' => json_decode($this->record_label),
            'track_list' => json_decode($this->track_list),
            'release_date' => $this->release_date,
            'name' => $product->name,
            'type' => $product->type,
            'description' => $product->description,
            'image_path' => $product->image_path,
            'price' => number_format($product->price),
            'in_stock' => $product->in_stock,
            'genre' => $product->genre,
            'weight' => $product->weight,
            'created_at' => $product->created_at,
            'updated_at' => $product->updated_at,
        ];
    }
}
