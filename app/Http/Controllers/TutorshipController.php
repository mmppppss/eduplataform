<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tutorship;
use Inertia\Inertia;

class TutorshipController extends Controller
{
    public function index()
    {
        return Inertia::render('tutorias', [
            'tutorias' => Tutorship::with(['tutor', 'estudiante'])->get()
        ]);
    }
}
