<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\Intl\Languages;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
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
            'cover_type' => $this->cover_type,
            'authors' => $this->authors,
            'publisher' => $this->publisher ?? "Unknown publisher",
            'number_of_pages' => $this->pages ?? "N/A",
            'language' => $this->language ?? "Unknown language",
            'publication_date' => $this->publication_date->format('d/m/Y'),

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
