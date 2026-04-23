<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PersonController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\TutorshipController;
use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Middleware\ApiAuthenticate;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware(ApiAuthenticate::class)->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/personas', [PersonController::class, 'index']);
    Route::post('/personas', [PersonController::class, 'store']);
    Route::put('/personas/{person}', [PersonController::class, 'update']);
    Route::delete('/personas/{person}', [PersonController::class, 'destroy']);

    Route::get('/cursos', [CourseController::class, 'index']);
    Route::post('/cursos', [CourseController::class, 'store']);
    Route::put('/cursos/{course}', [CourseController::class, 'update']);
    Route::delete('/cursos/{course}', [CourseController::class, 'destroy']);

    Route::get('/tutorias', [TutorshipController::class, 'index']);
    Route::post('/tutorias', [TutorshipController::class, 'store']);
    Route::put('/tutorias/{tutorship}', [TutorshipController::class, 'update']);
    Route::delete('/tutorias/{tutorship}', [TutorshipController::class, 'destroy']);

    Route::get('/asistencias', [AttendanceController::class, 'index']);
    Route::post('/asistencias', [AttendanceController::class, 'store']);

    Route::get('/pagos', [PaymentController::class, 'index']);
    Route::post('/pagos', [PaymentController::class, 'store']);
    Route::put('/pagos/{payment}', [PaymentController::class, 'update']);

    Route::get('/horarios', [ScheduleController::class, 'index']);
    Route::post('/horarios', [ScheduleController::class, 'store']);
    Route::delete('/horarios/{schedule}', [ScheduleController::class, 'destroy']);
});