import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import DynamicForm from '@/components/DynamicForm';
import Search from '@/components/Search';

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


function AddPerson({ campos, handleAddPerson, selectedPerson = null }) {
    const initialData = selectedPerson
        ? {
            name: selectedPerson.name,
            last_name: selectedPerson.last_name,
            ci: selectedPerson.ci,
            email: selectedPerson.user?.email || '',
            phone: selectedPerson.phone,
            address: selectedPerson.address,
            birth_date: selectedPerson.birth_date,
            role: selectedPerson.role,
        }
        : {};

    const postRoute = selectedPerson
        ? `/personas/update/${selectedPerson.id}`
        : '/personas/store';

    return (
        <DialogContent
            className="
                max-w-2xl w-[90vw]
                max-h-[90vh] overflow-y-auto
                rounded-2xl p-6 sm:p-8
            "
        >
            <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                    {selectedPerson ? 'Editar Persona' : 'Nueva Persona'}
                </DialogTitle>
            </DialogHeader>

            <DynamicForm
                fields={campos}
                onCancel={handleAddPerson}
                postRoute={postRoute}
                initialData={initialData}
                isEdit={selectedPerson !== null}
            />
        </DialogContent>
    );
}
export default function Personas() {
    const { persons } = usePage<any>().props
    const [filteredPersons, setFilteredPersons] = useState(persons);
    const [open, setOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const { post } = useForm();
    const handleAddPerson = () => {
        setOpen(open ? false : true)
    }

    const handleEdit = (person: any) => {
        setSelectedPerson(person);
        setOpen(true);
    };
    const handleDelete = (id: number) => {
        if (confirm('¿Seguro que quieres eliminar esta persona?')) {
            post(`/personas/destroy/${id}`);
        }
    };

    useEffect(() => {
        if (!open) {
            setSelectedPerson(null)
        }
    }, [open]);

    const roles = [
        { value: 'administrador', label: 'Administrador' },
        { value: 'profesor', label: 'Profesor' },
        { value: 'estudiante', label: 'Estudiante' },
        { value: 'contable', label: 'Contable' },

    ]
    const campos = [
        { name: "name", label: "Nombres", type: "text", required: true, placeholder: "John" },
        { name: "last_name", label: "Apellidos", type: "text", required: true, placeholder: "Doe" },
        { name: "ci", label: "Cedula de Identidad", type: "number", required: true, placeholder: "9876543" },
        { name: "email", label: "Correo Electrónico", type: "email", required: true, placeholder: "john@example.com" },
        { name: "phone", label: "Teléfono", type: "tel", required: true, placeholder: "76543210" },
        { name: "address", label: "Dirección", type: "text", required: true, placeholder: "Calle falsa 123", value: "Calle falsa 123" },
        { name: "birth_date", label: "Fecha de Nacimiento", required: true, type: "date" },
        {
            name: "role",
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
                    <Search
                        data={persons}
                        fields={['name', 'email', 'phone']}
                        onFiltered={setFilteredPersons}
                    />
                </div>

                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">

                            <th className="py-3 px-4">Rol</th>
                            <th className="py-3 px-4">Nombre</th>
                            <th className="py-3 px-4">Correo</th>
                            <th className="py-3 px-4">Telefono</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPersons.map((p: any) => (
                            <tr key={p.id} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-4">{p.role.toUpperCase()}</td>
                                <td className="py-2 px-4">{p.name} {p.last_name}</td>
                                <td className="py-2 px-4"><a href={`mailto:${p.user?.email}`}> {p.user?.email}</a></td>
                                <td className="py-2 px-4"><a href={`https://wa.me/591${p.phone}`}>{p.phone}</a> </td>
                                <td>
                                    <Button variant="outline" onClick={() => handleEdit(p)}>
                                        Editar
                                    </Button>
                                </td>
                                <td>
                                    <Button onClick={() => handleDelete(p.id)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Dialog open={open} onOpenChange={setOpen}>
                    <AddPerson campos={campos} handleAddPerson={handleAddPerson} selectedPerson={selectedPerson} />
                </Dialog>
            </div>
        </AppLayout>
    );
}
