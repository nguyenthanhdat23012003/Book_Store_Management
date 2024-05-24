<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $guarded = [];

    public function book()
    {
        return $this->hasOne(Book::class);
    }

    public function cd()
    {
        return $this->hasOne(CD::class);
    }

    public function dvd()
    {
        return $this->hasOne(DVD::class);
    }

    public function cart_item()
    {
        return $this->hasMany(Cart_item::class);
    }

    public function carts()
    {
        return $this->belongsToMany(Cart::class, 'cart_items');
    }
}
