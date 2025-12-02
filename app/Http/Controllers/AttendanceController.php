<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Course;
use App\Models\Enrollment;

use Illuminate\Http\Request;
use Inertia\Inertia;


class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::select('id', 'course_name')->get();

        return Inertia::render('Attendances/Index', [
            'courses' => $courses,
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
        //
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
