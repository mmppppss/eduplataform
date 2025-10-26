<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\TwoFactorController;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();
        $role = $user->role();
        return Inertia::render('dashboard',  [
            'user' => $user,
            'role' => $role
        ]);
    })->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/reportes', function () {
        return Inertia::render('reportes');
    })->name('reportes');

    Route::get('/listas', function () {
        return Inertia::render('listas');
    })->name('listas');
});


Route::get('/test-setup', function () {
    return config('setup');
});


Route::get('/verify-code', [TwoFactorController::class, 'showForm'])->name('verify.code.form');
Route::post('/verify-code', [TwoFactorController::class, 'verify'])->name('verify.code');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
