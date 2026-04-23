<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        $query = Schedule::with(['tutorship.course', 'tutorship.teacher.person']);

        if ($request->day) {
            $query->where('day', $request->day);
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tutorship_id' => 'required|exists:tutorships,id',
            'day' => 'required|string|in:lunes,martes,miércoles,jueves,viernes,sábado,domingo',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
        ]);

        $schedule = Schedule::create($validated);

        return response()->json(['success' => true, 'schedule' => $schedule], 201);
    }

    public function destroy(Schedule $schedule)
    {
        $schedule->delete();
        return response()->json(['success' => true]);
    }
}