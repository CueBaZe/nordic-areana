<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{

    protected $authService;

    public function __construct(AuthService $authService) {
        $this->authService = $authService;
    }

    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ], [
            'email.required' => 'E-mailadressen skal udfyldes.',
            'email.email' => 'Indtast venligst en gyldig e-mailadresse.',
            'password' => 'Udfyld venligst password feltet',
        ]);

        $result =  $this->authService->attemptLogin($credentials);

        if (!$result['success']) {
            return response()->json(['message' => $result['message']], 401);
        }

        return response()->json([
            'message' => $result['message'],
            'user' => $result['user']
        ], 200);
    }

    public function register(Request $request) {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'phone' => [
                'required',
                'regex:/^([0-9\s\-\+\(\)]*)$/',
                'min:8',
                'max:20',
                'unique:users,phone' 
            ],
            'password' => [
                'required',
                Password::min(8)
                    ->letters()      // Must have at least one letter
                    ->mixedCase()    // Must have both uppercase and lowercase
                    ->numbers()      // Must have at least one number
                    ->uncompromised(), // Checks if the password has been leaked in a data breach!
            ],
        ], [
            'name.required' => 'Du skal indtaste dit navn.',

            // E-mail
            'email.required' => 'E-mailadressen skal udfyldes.',
            'email.email' => 'Indtast venligst en gyldig e-mailadresse.',
            'email.unique' => 'Denne e-mailadresse er allerede i brug.',

            // Telefon
            'phone.required' => 'Telefonnummeret skal udfyldes.',
            'phone.regex' => 'Telefonnummeret indeholder ugyldige tegn.',
            'phone.min' => 'Telefonnummeret skal være på mindst :min tegn.',
            'phone.max' => 'Telefonnummeret må højest være på :max tegn.',
            'phone.unique' => 'Dette telefonnummer er allerede registreret.',

            // Adgangskode
            'password.required' => 'Du skal vælge en adgangskode.',
            'password.min' => 'Adgangskoden skal være på mindst :min tegn.',
            'password.letters' => 'Adgangskoden skal indeholde mindst ét bogstav.',
            'password.mixed_case' => 'Adgangskoden skal indeholde både store og små bogstaver.',
            'password.numbers' => 'Adgangskoden skal indeholde mindst ét tal.',
            'password.uncompromised' => 'Den valgte adgangskode er desværre dukket op i et offentligt datalæk. Vælg venligst en anden for din egen sikkerheds skyld.',
        ]);

        $result = $this->authService->Register($request->name, $request->email, $request->phone, $request->password);

        if (!$result['success']) {
            return response()->json([
                'message' => $result['message']
            ], 403);
        }

        return response()->json([
            'message' => $result['message'],
        ]);
    }
}
