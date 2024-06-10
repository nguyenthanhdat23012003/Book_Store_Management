<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DVD extends Model
{
    use HasFactory;

    protected $table = 'DigitalVideoDiscs';

    protected $guarded = [];

    protected $casts = [
        'release_date' => 'datetime',
    ];

    public $timestamps = false;

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
