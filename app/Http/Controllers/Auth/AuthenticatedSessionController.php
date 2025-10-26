<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\HtmlMail;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $user = Auth::user();

        Auth::logout();

        $code = rand(1000, 9999);

        $user->two_factor_code = $code;
        $user->two_factor_expires_at = now()->addMinutes(5);
        $user->save();

        $request->session()->put('2fa:user:id', $user->id);

        // enviar correo con el código
        $data = [
            'contenido' => 'Tu codigo es: <strong>'.$code.'</strong>',
        ];

        Mail::to($user->email)
            ->queue(new HtmlMail('Codigo de un solo uso para autenticacion', $data));

        $request->session()->regenerate();

        //redirigir al formulario de verificación
        return redirect()->route('verify.code.form')
            ->with('status', 'Se envió un código a tu correo.');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
