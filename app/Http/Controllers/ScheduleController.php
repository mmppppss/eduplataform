<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::with('schedules')
            ->orderBy('course_name')
            ->get();

        return Inertia::render('horarios', [
            'courses' => $courses
        ]);
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
        $validated = $request->validate([
            'course_id'   => 'required|exists:courses,id',
            'day'         => 'required|in:lunes,martes,miercoles,jueves,viernes,sabado',
            'start_time'  => 'required|date_format:H:i',
            'end_time'    => 'required|date_format:H:i|after:start_time',
        ]);

        $schedule = Schedule::create($validated);
        $course = Course::with('schedules')->find($validated['course_id']);


        return redirect()->route('horarios.index')
            ->with('success', 'Horario agregado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Schedule $schedule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Schedule $schedule)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:schedules,id',
        ]);

        Schedule::destroy($request->id);

        $courses = Course::with('schedules')->get();

        return redirect()->route('horarios.index')
            ->with('error', 'Horario eliminado correctamente.');
    }
}
