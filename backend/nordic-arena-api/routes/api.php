<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\BookingController;


Route::get('/connection', function () {
    return response()->json([
        'message' => 'Connection successful'    
    ]);
});

Route::get('/getTimeSlots', [CalendarController::class, 'getTimeSlots']);
Route::get('/getSports', [CalendarController::class, 'getSports']);

Route::post('/createBooking', [BookingController::class, 'bookCourt']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
