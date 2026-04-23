<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tutorship;
use Illuminate\Http\Request;

class TutorshipController extends Controller
{
    public function index()
    {
        return response()->json(Tutorship::with(['course', 'teacher.person'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'teacher_id' => 'required|exists:persons,id',
        ]);

        $tutorship = Tutorship::create($validated);

        return response()->json(['success' => true, 'tutorship' => $tutorship], 201);
    }

    public function update(Request $request, Tutorship $tutorship)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'teacher_id' => 'required|exists:persons,id',
        ]);

        $tutorship->update($validated);

        return response()->json(['success' => true, 'tutorship' => $tutorship]);
    }

    public function destroy(Tutorship $tutorship)
    {
        $tutorship->delete();
        return response()->json(['success' => true]);
    }
}