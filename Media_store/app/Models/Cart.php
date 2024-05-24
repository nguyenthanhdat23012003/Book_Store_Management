<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'carts';

    protected $fillable = [
        'user_id',
        'total_price',
        'total_quantity',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function order()
    {
        return $this->hasOne(Order::class);
    }

    public function cart_items()
    {
        return $this->hasMany(Cart_item::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'cart_items')->withPivot('quantity');
    }

    public static function getCartOfThisUser()
    {
        return self::where('user_id', auth()->user()->id)->first();
    }

    public function addProduct($productId, $quantity)
    {
        // Check if the product is already in the cart
        $existingItem = $this->cart_items()->where('product_id', $productId)->first();

        if ($existingItem) {
            // If the product already exists in the cart, update the quantity
            $existingItem->quantity += $quantity;
            $existingItem->save();
            return 'exist';
        } else {
            // If the product does not exist, create a new cart item
            $this->cart_items()->create([
                'product_id' => $productId,
                'quantity' => $quantity,
            ]);
            return 'new';
        }
    }

    public function removeProduct($productId)
    {
        $this->cart_items()->where('product_id', $productId)->delete();
    }

    public function changeQuantity($productId, $quantity)
    {
        return $this->cart_items()->where('product_id', $productId)->update(['quantity' => $quantity]);
    }
}
