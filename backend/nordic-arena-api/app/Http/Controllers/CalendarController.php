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
                Rule::in(['padel', 'tennis', 'bordtennis', 'badminton', 'fodbold'])
            ]
        ]);

        $slots = $this->calendarService->makeTimeSlots(
            $request->date, 
            $request->type
        );

        return response()->json($slots);
        
    }
}
