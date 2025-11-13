<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\TwoFactorController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\TutorshipController;
use Illuminate\Support\Facades\Auth;

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


    Route::get('/listas', [UserController::class, 'index'])->name('users.index');

    //crud personas
    Route::get('/personas', [PersonController::class, 'index'])->name('personas.index');
    Route::post('/personas/store', [PersonController::class, 'store'])
        ->name('personas.store');
    Route::post('/personas/update/{person}', [PersonController::class, 'update'])->name('personas.update');
    Route::post('/personas/destroy/{person}', [PersonController::class, 'destroy'])->name('personas.destroy');

    //crud courses
    Route::get('/cursos', [CourseController::class, 'index'])->name('cursos.index');
    Route::post('/cursos/store', [CourseController::class, 'store'])
        ->name('cursos.store');
    Route::post('/cursos/update/{course}', [CourseController::class, 'update'])->name('cursos.update');
    Route::post('/cursos/destroy/{course}', [CourseController::class, 'destroy'])->name('cursos.destroy');

    //crud inscripcion
    Route::get('/inscripcion', [EnrollmentController::class, 'index'])->name('inscripcion.index');
    Route::post('/inscripcion/{course}', [EnrollmentController::class, 'store'])->name('inscripcion.store');

    //crud tutorias
    Route::get('/tutorias',[TutorshipController::class, 'index'])->name('tutorias.index');
});


Route::get('/test-setup', function () {
    return config('setup');
});


Route::get('/verify-code', [TwoFactorController::class, 'showForm'])->name('verify.code.form');
Route::post('/verify-code', [TwoFactorController::class, 'verify'])->name('verify.code');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
