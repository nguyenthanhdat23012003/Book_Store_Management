<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductActionsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product' => new ProductResource($this->product),
            'actor' => new UserResource($this->actor),
            'action' => $this->action,
            'done_at' => $this->done_at->format('Y-m-d H:i'),
            'details' => $this->details
        ];
    }
}
