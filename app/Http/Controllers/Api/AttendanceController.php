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
        $query = Attendance::with(['enrollment.student.person', 'enrollment.tutorship']);

        if ($request->tutorship_id) {
            $query->whereHas('enrollment.tutorship', function ($q) use ($request) {
                $q->where('id', $request->tutorship_id);
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
            'tutorship_id' => 'required|exists:tutorships,id',
            'date' => 'required|date',
            'student_id' => 'required|exists:persons,id',
            'present' => 'required|boolean',
        ]);

        $enrollment = \App\Models\Enrollment::where('tutorship_id', $validated['tutorship_id'])
            ->where('student_id', $validated['student_id'])
            ->first();

        if (!$enrollment) {
            return response()->json(['error' => 'Estudiante no matriculado'], 404);
        }

        $attendance = Attendance::updateOrCreate(
            ['enrollment_id' => $enrollment->id, 'date' => $validated['date']],
            ['state' => $validated['present'] ? 'presente' : 'ausente']
        );

        return response()->json(['success' => true, 'attendance' => $attendance], 201);
    }
}