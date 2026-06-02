<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\BookingController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/getTimeSlots', [CalendarController::class, 'getTimeSlots']);
Route::get('/getSports', [CalendarController::class, 'getSports']);


// Protected Routes (Wrapped in your custom middleware)
Route::middleware(['user.auth'])->group(function () {
    Route::post('/createBooking/{id}', [BookingController::class, 'bookCourt']);
    Route::post('/cancelBooking/{id}', [BookingController::class, 'cancelBooking']);
    Route::get('/getBookings/{id}', [BookingController::class, 'getBookings']);
});