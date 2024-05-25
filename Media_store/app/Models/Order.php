<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'shipping_fee',
        'free_ship_discount',
        'total_price',
        'status',
        'delivery_type',
        'cancel_at',
        'completed_at',
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
}
