<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AccService;
use Illuminate\Validation\Rules\Password;

class AccController extends Controller
{
    protected $accService;

    public function __construct(AccService $accService) {
        $this->accService = $accService;
    }

    //Change name
    public function ChangeName(Request $request) {
        $request->validate([
            'newName' => 'required'
        ]);

        $id = $request->route('id');

        try {
            $this->accService->ChangeName($id, $request->newName);

            return response()->json([
                'success' => true,
                'message' => 'Navn ændret',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 404);
        }
    }

    //Change email
    public function ChangeEmail(Request $request) {
        $request->validate([
            'newEmail' => 'required|email|unique:users,email',
        ], [
            'newEmail.email' => 'Indtast en gyldig e-mailadresse.',
            'newEmail.unique' => 'Denne e-mailadresse er allerede i brug.'
        ]);

        $id = $request->route('id');

        try {
            $this->accService->ChangeEmail($id, $request->newEmail);

            return response()->json([
                'success' => true,
                'message' => 'Email ændret'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    //Change phone number
    public function ChangeNumber(Request $request) {

        $request->validate([
            'newNumber' => [
                'required',
                'regex:/^([0-9\s\-\+\(\)]*)$/',
                'min:8',
                'max:20',
                'unique:users,phone',
            ],
        ], [
            'newNumber.regex' => 'Telefonnummeret må kun indeholde tal og tegn som mellemrum, +, - og parenteser.',
            'newNumber.min' => 'Telefonnummeret skal være mindst 8 tegn langt.',
            'newNumber.max' => 'Telefonnummeret må højst være 20 tegn langt.',
            'newNumber.unique' => 'Dette telefonnummer er allerede i brug.'
        ]);

        $id = $request->route('id');

        try {
            $this->accService->ChangeNumber($id, $request->newNumber);

            return response()->json([
                'success' => true,
                'message' => 'Number ændret'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    //Change Password
    public function ChangePassword(Request $request) {
        $request->validate([
            'oldPassword' => 'required',
            'newPassword' => [
                'required',
                Password::min(8)
                    ->letters()      // Must have at least one letter
                    ->mixedCase()    // Must have both uppercase and lowercase
                    ->numbers()      // Must have at least one number
                    ->uncompromised(), // Checks if the password has been leaked in a data breach!
            ],
            'repeatPassword' => 'required',
        ], [
            'newPassword.password' => 'Adgangskoden skal være mindst 8 tegn og indeholde store og små bogstaver samt tal.'

        ]);

        $id = $request->route('id');

        try {
            $this->accService->ChangePassword($id, $request->oldPassword, $request->newPassword, $request->repeatPassword);

            return response()->json([
            'success' => true,
            'message' => 'Password ændret',
        ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
