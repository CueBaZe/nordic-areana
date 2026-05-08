<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bane extends Model
{

        protected $table = 'baner';

    protected $fillable = [
        'title', 
        'type', 
        'opening_time', 
        'closing_time', 
        'price'
    ];

    protected $casts = [
        'opening_time' => 'datetime:H:i',
        'closing_time' => 'datetime:H:i',
    ];
}
