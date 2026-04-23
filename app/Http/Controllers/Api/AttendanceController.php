<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Tutorship;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index(Request $request)
    {
        $query = Attendance::with(['enrollment.student.person', 'enrollment.course']);

        if ($request->course_id) {
            $query->whereHas('enrollment', function ($q) use ($request) {
                $q->where('course_id', $request->course_id);
            });
        }

        if ($request->date) {
            $query->where('date', $request->date);
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:persons,id',
            'course_id' => 'required|exists:courses,id',
            'date' => 'required|date',
            'present' => 'required|boolean',
        ]);

        $enrollment = \App\Models\Enrollment::where('student_id', $validated['student_id'])
            ->where('course_id', $validated['course_id'])
            ->first();

        if (!$enrollment) {
            return response()->json(['error' => 'Estudiante no matriculado en este curso'], 404);
        }

        $attendance = Attendance::updateOrCreate(
            ['enrollment_id' => $enrollment->id, 'date' => $validated['date']],
            ['state' => $validated['present'] ? 'asistió' : 'falta']
        );

        return response()->json(['success' => true, 'attendance' => $attendance], 201);
    }
}