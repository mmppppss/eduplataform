<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tutorship;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class TutorshipController extends Controller
{
    public function index()
    {

        $students = User::with('person')
            ->whereHas('person', function ($query) {
                $query->where('role', 'estudiante');
            })
            ->get();
        $tutors = User::with('person')
            ->whereHas('person', function ($query) {
                $query->where('role', 'tutor');
            })
            ->get();
        return Inertia::render('tutorias', [
            'tutorias' => Tutorship::with(['tutor', 'student'])->get(),
            'students' => $students,
            'tutors' => $tutors
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tutor_id' => [
                'required',
                'integer',
                Rule::exists('persons', 'id')->where(fn($q) => $q->where('role', 'tutor')),
            ],
            'student_id' => [
                'required',
                'integer',
                Rule::exists('persons', 'id')->where(fn($q) => $q->where('role', 'estudiante')),
                Rule::unique('tutorships', 'student_id')
                    ->where(fn($q) => $q->where('tutor_id', $request->tutor_id)),
            ],
        ]);

        Tutorship::create($validated);

        return redirect()
            ->route('tutorias.index')
            ->with('success', 'Tutoría creada correctamente');
    }
    public function destroy(Tutorship $tutorship)
    {
        $tutorship->delete();
        return redirect()
            ->route('tutorias.index')
            ->with('success', 'Tutoría eliminada correctamente');
    }
    public function update(Request $request, Tutorship $tutorship)
    {
        $validated = $request->validate([
            'tutor_id' => [
                'required',
                'integer',
                Rule::exists('persons', 'id')->where(fn($q) => $q->where('role', 'tutor')),
            ],
            'student_id' => [
                'required',
                'integer',
                Rule::exists('persons', 'id')->where(fn($q) => $q->where('role', 'estudiante')),
                Rule::unique('tutorships', 'student_id')
                    ->where(fn($q) => $q->where('tutor_id', $request->tutor_id)),
            ],
        ]);

        $tutorship->update($validated);
        return redirect()
            ->route('tutorias.index')
            ->with('success', 'Tutoría actualizada correctamente');
    }
}
