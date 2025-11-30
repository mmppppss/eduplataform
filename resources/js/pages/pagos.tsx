import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
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
import ImageDialog from '@/components/ImageDialog';

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
    const { pendingPayments } = usePage<any>().props;
    const [open, setOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const handlePay = (payment: any) => {
        setSelectedPayment(payment);
        setOpen(true);
    }

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
                <PaymentDialog open={open} setOpen={setOpen} selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />

            </div>
        </AppLayout>
    );
}
