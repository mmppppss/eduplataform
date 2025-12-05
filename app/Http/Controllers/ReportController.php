<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Payment;
use App\Models\Person;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    // Vista principal del módulo
    public function index()
    {

        $courses = Course::with('teacher.person')->get();
        $students =  Person::select('id', 'name', 'last_name')
                ->where('role', 'estudiante')
                ->orderBy('name')
                ->get();
        return Inertia::render('reportes', [
            'courses' => $courses,
            'students' => $students
        ]);
    }

    // Reporte de asistencias
    public function attendanceReport(Request $request)
    {
        $query = Attendance::query()
            ->with([
                'enrollment.student:id,name,last_name',
                'enrollment.course:id,course_name'
            ]);

        // Filtro por curso
        if ($request->course_id) {
            $query->whereHas('enrollment', function ($q) use ($request) {
                $q->where('course_id', $request->course_id);
            });
        }

        // Filtro por estudiante
        if ($request->student_id) {
            $query->whereHas('enrollment', function ($q) use ($request) {
                $q->where('student_id', $request->student_id);
            });
        }

        // Filtros por fechas
        if ($request->start_date && $request->end_date) {
            $query->whereBetween('date', [
                Carbon::parse($request->start_date),
                Carbon::parse($request->end_date)
            ]);
        }

        $attendances = $query->orderBy('date', 'desc')->get();

        return [
            'attendances' => $attendances,
        ];
    }

    // Reporte de inscripciones
    public function enrollmentReport(Request $request)
    {
        $query = Enrollment::with([
            'student:id,name,last_name',
            'course:id,course_name'
        ]);

        if ($request->course_id) {
            $query->where('course_id', $request->course_id);
        }

        $enrollments = $query->get();

        return [
            'enrollments' => $enrollments,
        ];
    }

    // Reporte de pagos
    public function paymentsReport(Request $request)
    {
        $query = Payment::with([
            'student:id,name,last_name'
        ]);

        // Rango de fechas
        if ($request->start_date && $request->end_date) {
            $query->whereBetween('payment_date', [
                Carbon::parse($request->start_date),
                Carbon::parse($request->end_date)
            ]);
        }

        $payments = $query->orderBy('payment_date', 'desc')->get();

        return [
            'payments' => $payments,
            'total' => $payments->sum('amount')
        ];
    }
}
