<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class PaypalService 
{
    public function createPaypalOrder($eventId) {

        $token = $this->getPaypalAccessToken();
        
    }

    public function approvePaypalOrder($orderId, $eventId) {

    }

    private function getPaypalAccessToken() {
        $clientId = config('services.paypal.client_id') ?? env('VITE_PAYPAL_CLIENT_ID');
        $secret = config('services.paypal.secret') ?? env('VITE_PAYPAL_SECRET_KEY');
        $baseUrl = env('VITE_PAYPAL_BASEURL');

        $response = Http::withoutVerifying()
            ->asForm()
            ->withBasicAuth($clientId, $secret)
            ->post("{$baseUrl}/v1/oauth2/token", [
                'grant_type' => 'client_credentials',
            ]);
        
        if ($response->failed()) {
            Log::error('Paypal Auth failed: ' . $response->body());
            throw new \Exception('Could not authenticate with paypal');
        }
        return $response->json()['access_token'];
    }
}