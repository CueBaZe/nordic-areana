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
                'slots' => $this->generateTimeSlots($bane->opening_time, $bane->closing_time, $date)
            ];
        });
    }

    function generateTimeSlots($start, $end, $date) {
        $slots = [];

        $currentTime = Carbon::now();
        $openingTime = Carbon::parse($start);
        $closingTime = Carbon::parse($end);
        $endOfDay = Carbon::parse($date)->endOfDay();

        $currentSlotTime = Carbon::parse($date)->startOfDay();

        while ($currentSlotTime->lt($endOfDay)) {
            $slotStart = $currentSlotTime->copy();
            
            $slotEnd = $currentSlotTime->copy()->addHour();

            $isOpen = $slotStart->greaterThanOrEqualTo($openingTime) && 
                $slotEnd->lessThanOrEqualTo($closingTime);

            $slots[] = [
                'id' => $date . $slotStart->format('Hi'),
                'start' => $slotStart->format('H:i'),
                'end' => $slotEnd->format('H:i'),
                'date' => $date,
                'available' => true,
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