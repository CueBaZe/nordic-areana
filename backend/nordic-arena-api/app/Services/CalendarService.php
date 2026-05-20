<?php 

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Bane;
use Carbon\Carbon;


class CalendarService {
    public function makeTimeSlots(string $date, string $type) {
        $baner = Bane::where('type', $type)->get();

        if ($baner->isEmpty()) {
            return [
                'Error' => true,
                'Message' => 'Der findes ingen baner med denne type',
            ];
        }

        return $baner->map(function ($bane) use ($date) {
            return [
                'id' => $bane->id,
                'title' => $bane->title,
                'slots' => $this->generateTimeSlots($bane->opening_time, $bane->closing_time, $date, $bane->id)
            ];
        });
    }

    function generateTimeSlots($start, $end, $date, $baneId) {
        $slots = [];

        $currentTime = Carbon::now();
        $openingTime = Carbon::parse($start)->setDateFrom(Carbon::parse($date));
        $closingTime = Carbon::parse($end)->setDateFrom(Carbon::parse($date));
        $endOfDay = Carbon::parse($date)->endOfDay()->subHour(1);
        $bane = Bane::where("id", $baneId)->first();


        $currentSlotTime = Carbon::parse($date)->startOfDay();

        while ($currentSlotTime->lt($endOfDay)) {
            $slotStart = $currentSlotTime->copy();
            
            $slotEnd = $currentSlotTime->copy()->addHour();

            $isOpen = $slotStart->greaterThanOrEqualTo($openingTime) && 
                $slotEnd->lessThanOrEqualTo($closingTime);

            $isAvailable = DB::table('bookings') //checks if there already is a booking on that date and time
                ->where('bane_id', $baneId)
                ->where('start_time', $slotStart)
                ->where('end_time', $slotEnd)
                ->where('date', $date)
                ->doesntExist();

                

            $slots[] = [
                'id' => $baneId . '_' . $date . '_' . $slotStart->format('Hi'),
                'start' => $slotStart->format('H:i'),
                'end' => $slotEnd->format('H:i'),
                'date' => $date,
                'price' => $bane->price,
                'available' => $isAvailable,
                'open' => $isOpen,
            ];

            $currentSlotTime->addHour();
        }

        return $slots;
    }

    public function getSports() {
        $sports = DB::table('sports')->get();

        return $sports;
    }
}