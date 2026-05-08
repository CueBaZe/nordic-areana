<?php

namespace App\Http\Controllers;
use App\Services\CalendarService;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    protected $calendarService;

    public function __construct(CalendarService $calendarService) {
        $this->calendarService = $calendarService;
    }

    public function makeTimeSlots(Request $request) {
        $request->validate([
            "date" => 'required|date',
            "type" => [
                'required',
                'string',
                Rule::in(['padel', 'tennis', 'bordtennis', 'badminton', 'fodbold'])
            ]
        ]);

        
    }
}
