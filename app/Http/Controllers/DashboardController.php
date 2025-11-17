<?php


namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;


class DashboardController extends Controller
{
    public function index()
    {
        $today = now()->toDateString();
        $currentDay = strtolower(now()->isoFormat('dddd'));

        // Convertir día en español
        $daysMap = [
            'monday' => 'lunes',
            'tuesday' => 'martes',
            'wednesday' => 'miercoles',
            'thursday' => 'jueves',
            'friday' => 'viernes',
            'saturday' => 'sabado'
        ];
        $todaySpanish = $daysMap[strtolower(now()->englishDayOfWeek)] ?? 'lunes';

        $stats = [
            'totalStudents' => \App\Models\Person::where('role', 'estudiante')->count(),
            'activeStudents' => \App\Models\Enrollment::distinct('student_id')->count('student_id'),
            'totalCourses' => \App\Models\Course::count(),
            'coursesWithTeachers' => \App\Models\Person::where('role', 'profesor')->count(),
            'monthlyRevenue' => \App\Models\Payment::where('state', 'pagado')
                ->whereMonth('date', now()->month)
                ->sum('amount'),
            'pendingPayments' => \App\Models\Payment::where('state', 'no pagado')->count(),
        ];
        // Pagos recientes
        $recentPayments = \App\Models\Payment::with(['enrollment.student'])
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'student_name' => $payment->enrollment->student->name . ' ' . $payment->enrollment->student->last_name,
                    'amount' => $payment->amount,
                    'type' => $payment->type,
                    'state' => $payment->state,
                    'date' => $payment->date,
                ];
            });

        // Tutorías activas - CORREGIDO
        $pendingTutorships = \App\Models\Tutorship::with(['student', 'tutor'])
            ->limit(5)
            ->get()
            ->map(function ($tutorship) {
                return [
                    'id' => $tutorship->id,
                    'student_name' => $tutorship->student->name . ' ' . $tutorship->student->last_name,
                    'tutor_name' => $tutorship->tutor->name . ' ' . $tutorship->tutor->last_name, // Acceso directo
                ];
            });

        return Inertia::render('dashboard', [
            'profile' => [
                'user' => auth()->user(),
                'role' => auth()->user()->person->role ?? 'usuario'
            ],
            'stats' => $stats,
            'recentPayments' => $recentPayments,
            'pendingTutorships' => $pendingTutorships,
        ]);
    }
}
