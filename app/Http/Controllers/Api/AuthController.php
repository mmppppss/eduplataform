<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'error' => 'Credenciales inválidas',
            ], 401);
        }

        $user = Auth::user();
        
        if (!$user->api_token) {
            $user->api_token = Str::random(60);
            $user->save();
        }

        return response()->json([
            'success' => true,
            'token' => $user->api_token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'person' => $user->person,
            ],
        ]);
    }

    public function me(Request $request)
    {
        $token = $request->bearerToken();
        
        $user = \App\Models\User::where('api_token', $token)->first();
        
        if (!$user) {
            return response()->json(['error' => 'Token inválido'], 401);
        }
        
        return response()->json([
            'id' => $user->id,
            'email' => $user->email,
            'person' => $user->person,
        ]);
    }

    public function logout(Request $request)
    {
        $token = $request->bearerToken();
        
        $user = \App\Models\User::where('api_token', $token)->first();
        
        if ($user) {
            $user->api_token = null;
            $user->save();
        }

        return response()->json(['success' => true]);
    }
}