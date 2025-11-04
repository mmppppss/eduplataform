import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import DynamicForm from '@/components/DynamicForm';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personas',
        href: '/personas',
    },
];

export default function Personas() {
    const { users } = usePage().props as { users: Array<{ id: number; name: string; email: string; created_at: string }> };
    const [open, setOpen] = useState(false);
    const handleAddPerson = () => {
        setOpen(open ? false : true)
    }
    const roles = [
        { value: 'Administrador', label: 'Administrador' },
        { value: 'Profesor', label: 'Profesor' },
        { value: 'Estudiante', label: 'Estudiante' },
        { value: 'Contable', label: 'Contable' },

    ]
    const campos = [
        { name: "name", label: "Nombres", type: "text", required: true, placeholder: "John" },
        { name: "lastname", label: "Apellidos", type: "text", required: true, placeholder: "Doe" },
        { name: "ci", label: "Cedula de Identidad", type: "number", required: true, placeholder: "9876543" },
        { name: "mail", label: "Correo Electrónico", type: "email", required: true, placeholder: "john@example.com" },
        { name: "tel", label: "Teléfono", type: "tel", required: true, placeholder: "76543210" },
        { name: "dir", label: "Dirección", type: "text", placeholder: "Calle falsa 123" },
        { name: "date", label: "Fecha de Nacimiento", type: "date" },
        {
            name: "rol",
            label: "Rol",
            type: "select",
            options: roles,
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion Personas" />
            <div className="p-6">
                <div className="">
                    <h1 className="text-2xl font-bold mb-4">Lista de Personas</h1>
                    <Button onClick={handleAddPerson}>Agregar nueva Persona</Button>
                </div>

                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                            <th className="py-3 px-4">ID</th>
                            <th className="py-3 px-4">Nombre</th>
                            <th className="py-3 px-4">Correo</th>
                            <th className="py-3 px-4">Creado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <></>
                        ))}
                    </tbody>
                </table>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent
                        className="
                        max-w-2xl w-[90vw]
                        max-h-[90vh] overflow-y-auto
                        rounded-2xl p-6 sm:p-8
                    "
                    >
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold">
                                Nueva Persona
                            </DialogTitle>
                        </DialogHeader>
                        <DynamicForm fields={campos} onCancel={handleAddPerson} postRoute="/personas/store" />
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
