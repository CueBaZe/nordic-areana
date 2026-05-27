<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BookingService;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    protected $bookingService;

    public function __construct(BookingService $bookingService) {
        $this->bookingService = $bookingService;
    }

    public function bookCourt(Request $request) {
        $request->validate([
            'courtId' => 'required',
            'userId' => 'required',
            'start' => 'required',
            'end' => 'required',
            'date' => 'required',
        ]);

        try {
            $Booking = $this->bookingService->createBooking(
                $request->courtId, 
                $request->userId, 
                $request->start, 
                $request->end, 
                $request->date
            );

            return response()->json([
                'success' => true,
                'message' => 'Booking oprettet'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Booking Fejl: ' . $e->getMessage()
            ], 400);
        }

    } 

    public function getBookings(Request $request) {
        try {
            $Bookings = $this->bookingService->getBookings($request->route('id'));

            return response()->json([
                'success' => true,
                'today' => $Bookings['today'],
                'other' =>$Bookings['other'],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Bookings Fejl: ' . $e->getMessage(),
            ], 400);
        }

    }
}
