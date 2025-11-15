<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paidPayments = Payment::with(['enrollment.student'])
            ->where('state', 'pagado')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'enrollment_id' => $payment->enrollment_id,
                    'student_name' => $payment->enrollment->student ?
                        $payment->enrollment->student->name . ' ' . $payment->enrollment->student->last_name : null,
                    'date' => $payment->date->format('Y-m-d'),
                    'amount' => $payment->amount,
                    'type' => $payment->type,
                    'state' => $payment->state,
                    'method' => $payment->method,
                    'file_path' => $payment->file_path,
                ];
            });

        $pendingPayments = Payment::with(['enrollment.student'])
            ->where('state', '!=', 'pagado')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'enrollment_id' => $payment->enrollment_id,
                    'student_name' => $payment->enrollment->student ?
                        $payment->enrollment->student->name . ' ' . $payment->enrollment->student->last_name : null,
                    'date' => $payment->date->format('Y-m-d'),
                    'amount' => $payment->amount,
                    'type' => $payment->type,
                    'state' => $payment->state,
                    'method' => $payment->method,
                    'file_path' => $payment->file_path,
                ];
            });

        return Inertia::render('pagos', [
            'paidPayments' => $paidPayments,
            'pendingPayments' => $pendingPayments
        ]);
    }


    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'payment_method' => 'sometimes|string',
            'file_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $validated['state'] = 'pagado';

        if ($request->has('payment_method')) {
            $validated['method'] = $request->payment_method;
        }

        if ($request->hasFile('file_path')) {
            if ($payment->file_path) {
                Storage::disk('public')->delete($payment->file_path);
            }

            $path = $request->file('file_path')->store('comprobantes', 'public');
            $validated['file_path'] = $path;
        }

        $payment->update($validated);

        return redirect()->back()->with('success', 'Pago confirmado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
