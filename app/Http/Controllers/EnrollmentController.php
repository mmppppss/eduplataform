<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Person;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EnrollmentController extends Controller
{
    function index(Request $request)
    {

        $query = Enrollment::with(['student', 'course']);

        // Filtrar por estudiante
        if ($request->has('student_id') && $request->student_id) {
            $query->where('student_id', $request->student_id);
        }

        // Filtrar por curso
        if ($request->has('course_id') && $request->course_id) {
            $query->where('course_id', $request->course_id);
        }
        $enrollments = $query->paginate(200)->withQueryString();

        $students = Person::where('role', 'estudiante')->select('id', 'name', 'last_name', 'ci')->get();
        $courses = Course::select('id', 'course_name')->get();

        return Inertia::render('inscripcion', [
            'enrollments' => $enrollments,
            'students' => $students,
            'courses' => $courses,
        ]);
    }


    public function store(Request $request, Course $course)
    {
        $validated = $request->validate([
            'students' => 'required|array|min:1',
            'students.*' => ['integer',
                Rule::exists('persons', 'id')->where(fn($query) => $query->where('role', 'estudiante'))]
        ], [
            'students.required' => 'Debe seleccionar al menos un estudiante.',
            'students.array' => 'Los estudiantes deben enviarse como un array.',
            'students.min' => 'Debe seleccionar al menos un estudiante.',
            'students.*.integer' => 'Los IDs de estudiantes deben ser números.',
            'students.*.exists' => 'Alguno de los estudiantes seleccionados no existe.',
        ]);

        $enrolledCount = 0;

        foreach ($validated['students'] as $studentId) {

            $enrollment = Enrollment::firstOrCreate(
                [
                    'course_id' => $course->id,
                    'student_id' => $studentId,
                ],
                [
                    'enroll_date' => now()->toDateString(),
                ]
            );

            if ($enrollment->wasRecentlyCreated) {
                $enrolledCount++;
            }
        }

        return redirect()->back()->with('success', "{$enrolledCount} estudiante(s) inscrito(s) correctamente.");
    }
}
