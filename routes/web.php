<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\TwoFactorController;

use App\Http\Controllers\ConfigController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\TutorshipController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth'])->group(function () {
    Route::get('/reportes', function () {
        return Inertia::render('reportes');
    })->name('reportes');
    Route::middleware(['role:administrador'])->group(function () {

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
        Route::get('/tutorias', [TutorshipController::class, 'index'])->name('tutorias.index');
        Route::post('/tutorias/{tutorship}', [TutorshipController::class, 'store'])->name('tutorias.store');
        Route::post('/tutorias/destroy/{tutorship}', [TutorshipController::class, 'destroy'])->name('tutorias.destroy');
        Route::post('/tutorias/update/{tutorship}', [TutorshipController::class, 'update'])->name('tutorias.update');

        //config
        Route::get('/config', [ConfigController::class, 'index'])->name('configs.index');
        Route::post('/configs/{key}', [ConfigController::class, 'update'])->name('configs.update');
    });

    Route::middleware(['role:contable'])->group(function () {
        Route::get('/pagos', [PaymentController::class, 'index'])->name('pagos.index');
        Route::get('/historialpagos', [PaymentController::class, 'indexpaid'])->name('pagos.indexpaid');
        Route::post('/pagos/{payment}', [PaymentController::class, 'update'])->name('pagos.update');
    });

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});


Route::get('/test-setup', function () {
    return config('setup');
});


Route::get('/verify-code', [TwoFactorController::class, 'showForm'])->name('verify.code.form');
Route::post('/verify-code', [TwoFactorController::class, 'verify'])->name('verify.code');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
