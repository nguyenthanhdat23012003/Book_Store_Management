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
            'authors' => $this->authors,
            'cover_type' => $this->cover_type,
            'publisher' => $this->publisher,
            'number_of_pages' => $this->pages,
            'language' => $this->language,
            'publication_date' => $this->publication_date->format('d/m/Y'),
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
