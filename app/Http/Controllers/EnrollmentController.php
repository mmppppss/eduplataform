<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Person;
use Inertia\Inertia;
use Illuminate\Http\Request;

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
        $enrollments = $query->paginate(10)->withQueryString();

        $students = Person::where('role', 'student')->select('id', 'name', 'last_name')->get();
        $courses = Course::select('id', 'course_name')->get();

        return Inertia::render('inscripcion', [
            'enrollments' => $enrollments,
            'students' => $students,
            'courses' => $courses,
        ]);
    }
}
