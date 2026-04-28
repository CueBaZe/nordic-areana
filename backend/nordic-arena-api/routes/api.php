<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/connection', function () {
    return response()->json([
        'message' => 'Connection successful'    
    ]);
});
