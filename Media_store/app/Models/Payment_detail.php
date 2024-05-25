<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment_detail extends Model
{
    use HasFactory;

    protected $table = 'payment_details';

    protected $fillable = [
        'order_id',
        'payment_method',
        'total_payment',
        'paid_at',
    ];

    public $timestamps = false;

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
