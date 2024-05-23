<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\Intl\Languages;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'id' => $this->id,
            'director' => $this->director,
            'disc_type' => $this->disc_type,
            // 'language' => Languages::getName($this->language),
            'language' => $this->language,
            'runtime' => $this->runtime,
            'studio' => $this->studio,
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
