<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $guarded = [];

    protected $casts = [
        'completed_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function delivery()
    {
        return $this->hasOne(Delivery::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment_detail::class);
    }

    public function order_items()
    {
        return $this->hasMany(Order_item::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_items')->withPivot('quantity');
    }

    /**
     * Check if all products in the order are available in stock.
     * 
     * @return array An array containing out-of-stock products.
     */
    public function productsAreAvailable()
    {
        $outOfStockProducts = [];

        foreach ($this->order_items as $orderItem) {
            $product = $orderItem->product;
            if ($product->in_stock < $orderItem->quantity) {
                $outOfStockProducts[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'requested_quantity' => $orderItem->quantity,
                    'available_stock' => $product->in_stock,
                ];
            }
        }

        return $outOfStockProducts;
    }
}
