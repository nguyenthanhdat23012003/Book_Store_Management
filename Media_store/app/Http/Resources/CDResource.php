<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'collections' => $this->collections,
            'albums' => $this->albums,
            'artists' => $this->artists,
            'record_label' => $this->record_label,
            'track_list' => $this->track_list,
            'release_date' => $this->release_date->format('d/m/Y'),
            'name' => $product->name,
            'type' => $product->type,
            'description' => $product->description,
            'image_path' => Storage::url($product->image_path),
            'price' => $product->price,
            'in_stock' => $product->in_stock,
            'genre' => $product->genre,
            'weight' => $product->weight,
            'created_at' => $product->created_at->format('i:H d/m/Y'),
            'updated_at' => $product->updated_at->format('i:H d/m/Y'),
        ];
    }
}
