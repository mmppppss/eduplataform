<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::with([
            'enrollment.student' // carga el estudiante relacionado a la inscripción
        ])->orderBy('created_at', 'desc')->get();

        // Transformamos para que devuelva solo los campos necesarios
        $data = $payments->map(function ($payment) {
            return [
                'id' => $payment->id,
                'enrollment_id' => $payment->enrollment_id,
                'student_name' => $payment->enrollment->student ?
                    $payment->enrollment->student->name . ' ' . $payment->enrollment->student->last_name : null,
                'date' => $payment->date->format('Y-m-d'),
                'amount' => $payment->amount,
                'type' => $payment->type,
            ];
        });

        return Inertia::render('pagos', [
            'payments' => $data
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
