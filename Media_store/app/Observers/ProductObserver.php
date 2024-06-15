<?php

namespace App\Observers;

use App\Models\Product;

class ProductObserver
{
    /**
     * Handle the Product "created" event.
     */
    public function created(Product $product): void
    {
        // Get the product data
        $data = request()->all();
        if (!$data) return;

        switch ($data['type']) {
            case 'book':
                $product->book()->create($data['book']);
                break;
            case 'cd':
                $product->cd()->create($data['cd']);
                break;
            case 'dvd':
                $data['dvd']['runtime'] = $data['dvd']['runtime'];
                $product->dvd()->create($data['dvd']);
                break;
        }
        // record action
        $product->productActions()->create([
            'action' => 'created',
            'done_at' => now(),
            'user_id' => auth()->id(),
            'details' => $product->toArray()
        ]);
    }

    /**
     * Handle the Product "updated" event.
     *
     * @param  \App\Models\Product  $product
     * @return void
     */
    public function updated(Product $product)
    {
        $oldProduct = $product->getOriginal();
        $newProduct = $product->getAttributes();

        $changes = $this->getChanges($oldProduct, $newProduct);

        // Record action
        $product->productActions()->create([
            'action' => 'updated',
            'done_at' => now(),
            'user_id' => auth()->id(),
            'details' => $changes
        ]);
    }

    /**
     * Get the changes between the old and new product attributes.
     *
     * @param  array  $oldValues
     * @param  array  $newValues
     * @return array
     */
    private function getChanges($oldValues, $newValues)
    {
        $changes = [];
        foreach ($newValues as $key => $value) {
            if (array_key_exists($key, $oldValues) && $oldValues[$key] !== $value) {
                $changes[$key] = [
                    'old' => $oldValues[$key],
                    'new' => $value,
                ];
            }
        }
        return $changes;
    }

    /**
     * Handle the Product "deleted" event.
     */
    public function deleted(Product $product): void
    {
        // record action
        $product->productActions()->create([
            'action' => 'deleted',
            'done_at' => now(),
            'user_id' => auth()->id(),
            'details' => $product->toArray()
        ]);
    }

    /**
     * Handle the Product "restored" event.
     */
    public function restored(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "force deleted" event.
     */
    public function forceDeleted(Product $product): void
    {
        //
    }
}
