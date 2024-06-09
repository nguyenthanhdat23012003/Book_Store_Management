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
                $data['book']['authors'] = json_encode($data['book']['authors']);
                $product->book()->create($data['book']);
                break;
            case 'cd':
                $data['cd']['artists'] = json_encode($data['cd']['artists']);
                $data['cd']['albums'] = json_encode($data['cd']['albums']);
                $data['cd']['track_list'] = json_encode($data['cd']['track_list']);
                $data['cd']['record_label'] = json_encode($data['cd']['record_label']);
                $product->cd()->create($data['cd']);
                break;
            case 'dvd':
                $product->dvd()->create($data['dvd']);
                break;
        }
        // record action
        $product->productActions()->create([
            'action' => 'created',
            'done_at' => now(),
            'user_id' => auth()->id(),
            'details' => json_encode($product->toArray())
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
            'details' => json_encode($changes)
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
     * Handle the Product "deleting" event.
     */
    public function deleting(Product $product): void
    {
        // record action
        $product->productActions()->create([
            'action' => 'deleted',
            'done_at' => now(),
            'user_id' => auth()->id(),
            'details' => json_encode($product->toArray())
        ]);

        // dissociate the productActions from the product
        // $actions->product()->dissociate();
        // $actions->save();
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
