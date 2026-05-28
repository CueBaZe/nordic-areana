<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Models\User;

class BookingService {
    public function createBooking(int $courtId, int $userId, string $start, string $end, string $date) {

        $currentTime = Carbon::now();
        $today = $currentTime->copy()->toDateString();
        $twoWeeksAhead = $currentTime->copy()->addDay(14);

        if ($today > $date) {
            throw new \Exception('Systemet tillader desværre ikke booking af datoer, der allerede er passerede.');
        }

        if ($twoWeeksAhead < $date) {
            throw new \Exception('Vores bookingsystem tillader reservationer maksimalt 14 dage frem.');
        }

        $currentTimeString = $currentTime->copy()->toTimeString();

        if ($currentTimeString >= $start) { //checks if the time has pasted
            throw new \Exception('Denne tid er allrede passeret');
        }

        $validUser = User::where('id', $userId)->first();

        if (!$validUser) { //checks if the user exists
            throw new \Exception('Denne bruger findes ikke');
        }

        $existingBooking = DB::table('bookings')
            ->where('bane_id', $courtId)
            ->where('start_time', $start)
            ->where('end_time', $end)
            ->where('date', $date)
            ->first();

        if ($existingBooking) { //checks if the slot is available
            throw new \Exception('Banen er allerede booket i dette tidsrum.');
        }

        return DB::table('bookings')
            ->insert([
                'bane_id' => $courtId,
                'user_id' => $userId,
                'start_time' => $start,
                'end_time' => $end,
                'date' => $date,
            ]);
    }

    public function getBookings(int $userId) {
        $currentTime = Carbon::now();
        $date = $currentTime->toDateString();
        $time = $currentTime->toTimeString();

        $todaysBookings = DB::table('bookings')
            ->where('user_id', $userId)
            ->where('date', $date)
            ->where('start_time', '>', $currentTime)
            ->get();

        foreach ($todaysBookings as $booking) {
            $bane = DB::table('baner')->where('id', $booking->bane_id)->first();

            $booking->title = $bane ? $bane->title : 'Ukendt bane';
        }
        
        $otherBookings = DB::Table('bookings')
            ->where('user_id', $userId)
            ->where('date', '!=', $date)
            ->where('date', '>', $date)
            ->get();

        foreach ($otherBookings as $booking) {
            $bane = DB::table('baner')->where('id', $booking->bane_id)->first();

            $booking->title = $bane ? $bane->title : 'Ukendt bane';
        }

        if (!$otherBookings && !$todaysBookings) {
            throw new \Exception('Denne bruger har ingen bookninger');
        }

        return [
            'today' => $todaysBookings,
            'other' => $otherBookings
        ];
    }
}