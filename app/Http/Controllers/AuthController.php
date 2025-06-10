<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function signup(SignupRequest $request)
    {
        $attributes = $request->validated();

        $user = User::create([
            'name' => $attributes['name'],
            'email' => $attributes['email'],
            'password' => bcrypt($attributes['password']),
        ]);
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }
    public function login(LoginRequest $request)
    {
        $credentialsAttributes = $request->validated();

        if (!Auth::attempt($credentialsAttributes)) {
            return response([
                'message' => 'Provided email address is incorrect',
                'passwordMessage' => 'Provided password is incorrect'
            ], 401); // Optional: add proper HTTP status
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
