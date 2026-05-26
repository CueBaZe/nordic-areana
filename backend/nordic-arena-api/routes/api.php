<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\BookingController;

Route::get('/connection', function () {
    return response()->json(['message' => 'Connection successful']);
});
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/getTimeSlots', [CalendarController::class, 'getTimeSlots']);
Route::get('/getSports', [CalendarController::class, 'getSports']);


// Protected Routes (Wrapped in your custom middleware)
Route::middleware(['user.auth'])->group(function () {
    Route::post('/createBooking', [BookingController::class, 'bookCourt']);
    Route::get('/getBookings', [BookingController::class, 'getBookings']);
});