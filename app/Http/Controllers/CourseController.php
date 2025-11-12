<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;


class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::with('teacher.person')->get();

        $teachers = User::with('person')
            ->whereHas('person', function ($query) {
                $query->where('role', 'profesor');
            })
            ->get();
        $students = User::with('person')
            ->whereHas('person', function ($query) {
                $query->where('role', 'estudiante');
            })
            ->get();
        // Retornamos a la vista Inertia
        return Inertia::render('cursos', [
            'courses' => $courses,
            'teachers' => $teachers,
            'students' => $students
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_name' => 'required|string|max:255',
            'teacher_id' => 'required|exists:users,id',
        ]);

        $course = Course::create($validated);
        return redirect()->route('cursos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'course_name' => 'required|string|max:255',
            'teacher_id' => 'required|exists:users,id',
        ]);
        $course->update($validated);
        return redirect()->route('cursos.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->active = false;

        $course->save();

        return redirect()->route('cursos.index')->with('success', 'Curso desactivado correctamente.');
    }
}
