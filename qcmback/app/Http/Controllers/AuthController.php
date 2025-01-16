<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        $credentials = $request->validated();
        // dd($credentials["email"]);
        $user = User::where('email',$credentials["email"])->first();
        if(!$user || !Hash::check($credentials["password"],$user->password)){
            return response()->json([
                'message' => 'password ou email incorrect'
            ],422);
        }

        $token = $user->createToken($user->name);
        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function logout(Request $request){
        // dd($request->user());
        $request->user()->tokens()->delete();
        return [
            'message' => 'you are logget out.'
        ];
    }
}
