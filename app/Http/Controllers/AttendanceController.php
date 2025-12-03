<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $user = Auth::user();
        $teacherId = $user->id;

        $courses = Course::select('id', 'course_name')
            ->where('teacher_id', $teacherId)
            ->get();

        $courseIds = $courses->pluck('id');

        $enrollments = Enrollment::with([
            'student:id,id,name,last_name',
        ])
            ->select('id', 'course_id', 'student_id')
            ->whereIn('course_id', $courseIds)
            ->get();

        $enrollmentIds = $enrollments->pluck('id');

        $attendances = Attendance::select('id', 'enrollment_id', 'state', 'date')
            ->whereIn('enrollment_id', $enrollmentIds)
            ->get();

        return Inertia::render('asistencia', [
            'courses'     => $courses,
            'enrollments' => $enrollments,
            'attendances' => $attendances,
        ]);
    }



    public function list(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'date'      => 'required|date',
        ]);

        $students = Enrollment::with(['student.user'])
            ->where('course_id', $request->course_id)
            ->get();

        // Traer asistencias existentes para esa fecha
        $attendances = Attendance::where('date', $request->date)
            ->get()
            ->keyBy('enrollment_id');

        return [
            'students'    => $students,
            'attendances' => $attendances,
        ];
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */


    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.enrollment_id' => 'required|exists:enrollments,id',
            'items.*.state' => 'required|in:asistió,retraso,licencia,falta',
        ]);

        $items = $request->input('items');

        foreach ($items as $item) {
            Attendance::updateOrCreate(
                ['enrollment_id' => $item['enrollment_id'], 'date' => now()->toDateString()],
                ['state' => $item['state']]
            );
        }

        return redirect()->back()->with('success', 'Asistencias guardadas correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attendance $attendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        //
    }
}
