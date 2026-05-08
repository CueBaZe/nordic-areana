<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CalendarController;


Route::get('/connection', function () {
    return response()->json([
        'message' => 'Connection successful'    
    ]);
});

Route::get('/getTimeSlots', [CalendarController::class, 'getTimeSlots']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
