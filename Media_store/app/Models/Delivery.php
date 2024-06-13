<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    use HasFactory;

    protected $table = 'deliveries';

    protected $guarded = [];

    protected $casts = [
        'confirmed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public $timestamps = false;

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
