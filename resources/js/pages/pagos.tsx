import AppLayout from '@/layouts/app-layout';
import { useState} from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import List from '@/components/List';
import { Button } from '@/components/ui/button';
import Notify from '@/components/ui/Notify';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const breadcrumbs = [
    { title: 'Pagos', href: '/pagos' },
];

function PaymentDialog({ open, setOpen, selectedPayment, setSelectedPayment }: any) {

    const { data, setData, post, processing, errors, reset } = useForm({
        amount: selectedPayment?.amount || "",
        payment_method: "efectivo",
        file_path: null as File | null, // Cambiar receipt por file_path
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData("file_path", file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = () => {
        // Usar FormData para enviar archivos
        const formData = new FormData();
        formData.append('amount', data.amount);
        formData.append('payment_method', data.payment_method);

        if (data.file_path) {
            formData.append('file_path', data.file_path);
        }

        post(`/pagos/${selectedPayment.id}`, formData, {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
            onError: (errors) => {
                alert(errors);
                setOpen(false);
            }
        });
        setOpen(false);
        setSelectedPayment(null);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl w-[90vw] max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Pagar {selectedPayment?.type} de {selectedPayment?.student_name}
                    </DialogTitle>
                </DialogHeader>

                {/* Campos */}
                <div className="space-y-4 mt-4">
                    {/* Monto */}
                    <div>
                        Monto a pagar: {selectedPayment?.amount}
                    </div>

                    {/* Método de pago */}
                    <div>
                        <label className="block font-medium">Método de Pago</label>
                        <select
                            value={data.payment_method}
                            onChange={(e) => setData("payment_method", e.target.value)}
                            className="border p-2 w-full rounded"
                        >
                            <option value="efectivo">Efectivo</option>
                            <option value="qr">QR</option>
                            <option value="transferencia">Transferencia</option>
                        </select>
                        {errors.payment_method && <p className="text-red-500 text-sm">{errors.payment_method}</p>}
                    </div>

                    {/* Comprobante */}
                    <div>
                        <label className="block font-medium">Comprobante (opcional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="border p-2 w-full rounded"
                        />
                        {errors.file_path && <p className="text-red-500 text-sm">{errors.file_path}</p>}

                        {preview && (
                            <div className="mt-3">
                                <img
                                    src={preview}
                                    alt="Vista previa del comprobante"
                                    className="w-full max-w-xs rounded border shadow"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Botón */}
                <div className="flex justify-end mt-6 space-x-2">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={processing}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={processing}
                    >
                        {processing ? 'Procesando...' : 'Confirmar Pago'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default function Pagos() {
    const { paidPayments, pendingPayments } = usePage<any>().props;
    const [open, setOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const handlePay = (payment: any) => {
        setSelectedPayment(payment);
        setOpen(true);
    }

    const handlePrintRecibe = (payment: any) => {
        const printWindow = window.open('', '_blank');

        if (!printWindow) {
            alert('Por favor permite ventanas emergentes para imprimir el recibo');
            return;
        }

        const receiptContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Recibo de Pago</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 20px;
                    color: #333;
                }
                .receipt-container {
                    max-width: 400px;
                    margin: 0 auto;
                    border: 2px solid #000;
                    padding: 20px;
                    background-color: white;
                }
                .header {
                    text-align: center;
                    border-bottom: 2px solid #000;
                    padding-bottom: 15px;
                    margin-bottom: 20px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                    color: #2c3e50;
                }
                .header .subtitle {
                    font-size: 14px;
                    color: #7f8c8d;
                }
                .details {
                    margin-bottom: 20px;
                }
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;
                    padding: 5px 0;
                }
                .detail-label {
                    font-weight: bold;
                    color: #2c3e50;
                }
                .detail-value {
                    text-align: right;
                }
                .amount {
                    font-size: 20px;
                    font-weight: bold;
                    color: #27ae60;
                }
                .separator {
                    border-top: 1px dashed #bdc3c7;
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    font-size: 12px;
                    color: #7f8c8d;
                }
                .qr-code {
                    text-align: center;
                    margin: 15px 0;
                }
                .status-paid {
                    color: #27ae60;
                    font-weight: bold;
                }
                @media print {
                    body {
                        padding: 0;
                    }
                    .receipt-container {
                        border: none;
                        box-shadow: none;
                    }
                    .no-print {
                        display: none;
                    }
                }
                .print-button {
                    background: #3498db;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin: 20px auto;
                    display: block;
                }
            </style>
        </head>
        <body>
            <div class="receipt-container">
                <div class="header">
                    <h1>RECIBO DE PAGO</h1>
                    <div class="subtitle">Plataforma Cedechaco</div>
                </div>

                <div class="details">
                    <div class="detail-row">
                        <span class="detail-label">N° de Recibo:</span>
                        <span class="detail-value">#${payment.id.toString().padStart(6, '0')}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Fecha:</span>
                        <span class="detail-value">${new Date(payment.date).toLocaleDateString('es-ES')}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Estudiante:</span>
                        <span class="detail-value">${payment.student_name}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Concepto:</span>
                        <span class="detail-value">${payment.type}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Método de Pago:</span>
                        <span class="detail-value">${payment.method || 'No especificado'}</span>
                    </div>
                </div>

                <div class="separator"></div>

                <div class="detail-row">
                    <span class="detail-label">Total Pagado:</span>
                    <span class="detail-value amount">Bs. ${parseFloat(payment.amount).toFixed(2)}</span>
                </div>

                <div class="separator"></div>

                <div class="detail-row status-paid">
                    <span>ESTADO:</span>
                    <span>PAGADO</span>
                </div>

                ${payment.file_path ? `
                <div class="detail-row">
                    <span class="detail-label">Comprobante:</span>
                    <span class="detail-value">Adjunto</span>
                </div>
                ` : ''}

                <div class="footer">
                    <div>Este recibo es válido como comprobante de pago</div>
                    <div>Fecha de impresión: ${new Date().toLocaleDateString('es-ES')}</div>
                </div>

                <button class="print-button no-print" onclick="window.print()">Imprimir Recibo</button>
            </div>

            <script>
                // Auto-imprimir después de cargar
                window.onload = function() {
                    setTimeout(() => {
                        window.print();
                    }, 500);
                };

                // Cerrar ventana después de imprimir
                window.onafterprint = function() {
                    setTimeout(() => {
                        window.close();
                    }, 1000);
                };
            </script>
        </body>
        </html>
    `;
        printWindow.document.write(receiptContent);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pagos" />
            <Notify />
            <div className="p-6">
                <h2 className="text-xl font-bold">Pagos Pendientes</h2>
                <List
                    data={pendingPayments}
                    fields={['student_name', 'type']}
                    columns={[
                        {
                            label: 'Estudiante',
                            field: 'student_name', // usamos el campo que ya viene en tu JSON
                            render: (v) => v // simplemente mostramos student_name
                        },
                        {
                            label: 'Fecha',
                            field: 'date',
                            render: (v) => v // puedes formatear si quieres
                        },
                        {
                            label: 'Monto',
                            field: 'amount',
                            render: (v) => `$${v}`
                        },
                        {
                            label: 'Tipo',
                            field: 'type',
                            render: (v) => v.charAt(0).toUpperCase() + v.slice(1) // capitalize
                        },
                    ]}
                    otherActions={[
                        {
                            label: "Pagar",
                            onClick: (item) => handlePay(item),
                        }
                    ]}
                />

                <hr className="my-8" />
                <h2 className="text-xl font-bold">Historial de Pagos</h2>
                <List
                    data={paidPayments}
                    fields={['student_name', 'type']}
                    columns={[
                        {
                            label: 'Estudiante',
                            field: 'student_name', // usamos el campo que ya viene en tu JSON
                            render: (v) => v // simplemente mostramos student_name
                        },
                        {
                            label: 'Fecha Pagado',
                            field: 'date',
                            render: (v) => v // puedes formatear si quieres
                        },
                        {
                            label: 'Monto',
                            field: 'amount',
                            render: (v) => `$${v}`
                        },
                        {
                            label: 'Tipo',
                            field: 'type',
                            render: (v) => v.charAt(0).toUpperCase() + v.slice(1) // capitalize
                        },
                    ]}
                    otherActions={[
                        {
                            label: "Recibo",
                            onClick: (item) => handlePrintRecibe(item),
                        }
                    ]}
                />

                <PaymentDialog open={open} setOpen={setOpen} selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />

            </div>
        </AppLayout>
    );
}
