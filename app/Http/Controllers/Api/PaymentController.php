<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::with(['enrollment.student.person', 'enrollment.course']);

        if ($request->state) {
            $query->where('state', $request->state);
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'enrollment_id' => 'required|exists:enrollments,id',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'type' => 'nullable|string',
        ]);

        $payment = Payment::create($validated);

        return response()->json(['success' => true, 'payment' => $payment], 201);
    }

    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'state' => 'required|string|in:pendiente,aprobado,rechazado',
            'amount' => 'numeric',
            'date' => 'date',
        ]);

        $payment->update($validated);

        return response()->json(['success' => true, 'payment' => $payment]);
    }
}