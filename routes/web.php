<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\TwoFactorController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::get('/test-setup', function () {
    return config('setup');
});


Route::get('/verify-code', [TwoFactorController::class, 'showForm'])->name('verify.code.form');
Route::post('/verify-code', [TwoFactorController::class, 'verify'])->name('verify.code');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
