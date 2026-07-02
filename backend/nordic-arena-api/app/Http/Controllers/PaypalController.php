<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PaypalService;

class PaypalController extends Controller
{
    protected $paypalService;

    public function __construct(PaypalService $paypalService) {

        $this->paypalService = $paypalService;
    }

    public function createPaypalOrder(Request $request) {
        $request->validate([
            'eventId' => 'required'
        ]);
    }

    public function approvePaypalOrder(Request $request) {

    } 

}
