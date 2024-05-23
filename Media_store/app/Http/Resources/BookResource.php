<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\Intl\Languages;
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
            'id' => $this->id,
            'authors' => json_decode($this->authors),
            'cover_type' => $this->cover_type,
            'number_of_pages' => $this->pages,
            // 'language' => Languages::getName($this->language),
            'language' => $this->language,
            'publisher' => $this->publisher,
            'publication_date' => $this->publication_date,
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
