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

    public function cart_items()
    {
        return $this->hasMany(Cart_item::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'cart_items')->withPivot('quantity');
    }
}
