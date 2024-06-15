<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CD extends Model
{
    use HasFactory;

    protected $table = 'CompactDiscs';

    protected $guarded = [];

    public $timestamps = false;

    protected $casts = [
        'artists' => 'array',
        'albums' => 'array',
        'record_label' => 'array',
        'track_list' => 'array',
        'videos' => 'array',
        'release_date' => 'datetime',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
