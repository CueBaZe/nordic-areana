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

        $currentSlotTime = $openingTime->Copy();

        while ($currentSlotTime->lt($closingTime)) {
            $startingTime = $currentSlotTime->Copy();

            $currentSlotTime->addHour();

            $slots[] = [
                'start' => $startingTime->format('H:i'),
                'end' => $currentSlotTime->format('H:i'),
                'date' => $date
            ];
        }

        return $slots;
    }

    public function getSports() {
        $sports = DB::table('sports')->get();

        return $sports;
    }
}