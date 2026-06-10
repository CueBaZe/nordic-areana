<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AccService;

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
        $id = $request->route('id');
    }
}
