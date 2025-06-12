<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return UserResource::collection(User::latest()->simplePaginate(10));
        $users = User::select('id', 'name', 'email', 'created_at')->latest()->simplePaginate(10);
        return response([
            'users' => $users->items(),
            'pagination' => [
                'current_page' => $users->currentPage(),
                'per_page' => $users->perPage(),
                'has_more' => $users->hasMorePages(),
            ]
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => [
                'required',
                'string',
            ],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', Password::min(8)]
        ]);
        $attributes['password'] = bcrypt($attributes['password']);

        $user = User::create($attributes);

        return response([
            'message' => 'User created successfully',
            'data' => $user
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response([
            'data' => $user
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $attributes = $request->validated([
            'name' => [
                'required',
                'string',
            ],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', Password::min(8)]
        ]);
        if (isset($attributes['password'])) {
            $attributes['password'] = bcrypt($attributes['password']);
        }
        $user->update($attributes);

        return response([
            'message' => "User updated successfully",
            ''
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
