<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::with(['enrollment.student.person', 'enrollment.tutorship.course']);

        if ($request->status) {
            $query->where('status', $request->status);
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'enrollment_id' => 'required|exists:enrollments,id',
            'amount' => 'required|numeric',
            'payment_date' => 'required|date',
            'reference' => 'nullable|string',
        ]);

        $payment = Payment::create($validated);

        return response()->json(['success' => true, 'payment' => $payment], 201);
    }

    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pendiente,aprobado,rechazado',
            'amount' => 'numeric',
            'payment_date' => 'date',
        ]);

        $payment->update($validated);

        return response()->json(['success' => true, 'payment' => $payment]);
    }
}