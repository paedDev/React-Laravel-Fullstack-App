<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function login(LoginRequest $request)
    {
        $attributes = $request->validated();

        $user = User::create([
            'name' => $attributes['name'],
            'email' => $attributes['email'],
            'password' => bcrypt($attributes['password']),
        ]);
        $token = $user->createToken('main')->plainTextToken;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function signup(SignupRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function logout(Request $request)
    {
        //
    }
}
