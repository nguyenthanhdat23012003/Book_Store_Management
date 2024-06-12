<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\Intl\Languages;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class DVDResource extends JsonResource
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
            'disc_type' => $this->disc_type,
            'director' => $this->director,
            'runtime' => $this->runtime,
            'studio' => $this->studio,
            'language' => $this->language,
            'release_date' => $this->release_date->format('d/m/Y'),

            'name' => $product->name,
            'type' => $product->type,
            'description' => $product->description,
            'image_path' => Storage::url($product->image_path),
            'price' => $product->price,
            'in_stock' => $product->in_stock,
            'genre' => $product->genre,
            'weight' => $product->weight,
            'rating' => $product->rating,
            'sold' => $product->sold,
            'created_at' => $product->created_at->format('i:H d/m/Y'),
            'updated_at' => $product->updated_at->format('i:H d/m/Y'),
        ];
    }
}
