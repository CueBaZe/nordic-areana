<?php

namespace App\Http\Controllers;
use App\Services\CalendarService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule; 

class CalendarController extends Controller
{
    protected $calendarService;

    public function __construct(CalendarService $calendarService) {
        $this->calendarService = $calendarService;
    }

    public function getTimeSlots(Request $request) {
        $request->validate([
            "date" => 'required|date',
            "type" => [
                'required',
                'string',
            ]
        ]);

        $slots = $this->calendarService->makeTimeSlots(
            $request->date, 
            $request->type
        );

        return response()->json($slots);
        
    }

    public function getSports() {
        $sports = $this->calendarService->getSports();

        return response()->json($sports);
    }
}
