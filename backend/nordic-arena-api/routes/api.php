<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AccController;
use App\Http\Controllers\PaypalController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/getTimeSlots', [CalendarController::class, 'getTimeSlots']);
Route::get('/getSports', [CalendarController::class, 'getSports']);


// Protected Routes
Route::middleware(['user.auth'])->group(function () {
    Route::post('/createBooking/{id}', [BookingController::class, 'bookCourt']);
    Route::post('/cancelBooking/{id}', [BookingController::class, 'cancelBooking']);
    Route::get('/getBookings/{id}', [BookingController::class, 'getBookings']);
    Route::post('/changeName/{id}', [AccController::class, 'ChangeName']);
    Route::post('/changeEmail/{id}', [AccController::class, 'ChangeEmail']);
    Route::post('/changeNumber/{id}', [AccController::class, 'ChangeNumber']);
    Route::post('/changePassword/{id}', [AccController::class, 'ChangePassword']);
    Route::post('/paypal/createOrder/{id}', [PaypalController::class, 'createPaypalOrder']);
});