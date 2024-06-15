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
            'id' => $product->id,
            'collections' => $this->collections ?? "Unknown collections",
            'albums' => $this->albums ?? ["Unknown albums"],
            'artists' => $this->artists ?? ["Unknown artists"],
            'record_label' => $this->record_label ?? ["Unknown record label"],
            'track_list' => $this->track_list ?? ["Unknown track list"],
            'videos' => $this->videos ?? ["Unknown videos"],
            'country' => $this->country ?? "Unknown country",
            'release_date' => $this->release_date->format('d/m/Y'),

            'name' => $product->name,
            'type' => $product->type,
            'description' => $product->description,
            'image_path' => Storage::url($product->image_path),
            'price' => $product->price,
            'in_stock' => $product->in_stock,
            'genre' => $product->genre,
            'weight' => $product->weight,
            'rating' => $product->avgRating,
            'ratingsCount' => $product->ratingsCount,
            'sold' => $product->sold,
            'created_at' => $product->created_at->format('i:H d/m/Y'),
            'updated_at' => $product->updated_at->format('i:H d/m/Y'),
        ];
    }
}
