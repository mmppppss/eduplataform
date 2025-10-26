<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Inertia\Inertia;


class TwoFactorController extends Controller
{
    public function showForm()
    {
        return Inertia::render('auth/VerifyCode');
    }

    public function verify(Request $request)
    {
        $request->validate([
            'code' => 'required|numeric',
        ]);

        $userId = $request->session()->get('2fa:user:id');
        $user = User::find($userId);

        if (! $user) {
            return redirect()->route('login')->withErrors([
                'email' => 'Sesión expirada, vuelve a iniciar sesión.',
            ]);
        }

        if ($user->two_factor_code !== $request->code || $user->two_factor_expires_at->isPast()) {
            return back()->withErrors(['code' => 'El código es inválido o expiró.']);
        }

        // limpiar el código
        $user->two_factor_code = null;
        $user->two_factor_expires_at = null;
        $user->save();

        $request->session()->forget('2fa:user:id');

        // ahora sí iniciar sesión real
        Auth::login($user);
        $request->session()->regenerate();


        return redirect()->intended(route('dashboard'));
    }
}
