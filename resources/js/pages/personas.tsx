import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import DynamicForm from '@/components/DynamicForm';
import List from '@/components/List';
import Notify from '@/components/ui/Notify';

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
    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [filteredPersons, setFilteredPersons] = useState(persons);
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
    const handleRoleChange = (role: string) => {
        setSelectedRole(role);
    };

    useEffect(() => {
        if (!open) {
            setSelectedPerson(null)
        }
        if (selectedRole === '') {
            setFilteredPersons(persons);
        } else {
            const filtered = persons.filter((p: any) => p.role === selectedRole);
            setFilteredPersons(filtered);
        }

    }, [open, selectedPerson, persons, selectedRole]);

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
            <Notify />
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold mb-4">Gestion de Personas   </h1>


                    <Button onClick={handleAddPerson}>Agregar Persona</Button>
                </div>

                <div className="relative">
                    <select
                        className="border rounded px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedRole}
                        onChange={(e) => handleRoleChange(e.target.value)}
                    >
                        <option value="">Personas</option>
                        {roles.map((r) => (
                            <option key={r.value} value={r.value}>
                                {r.label}
                            </option>
                        ))}
                    </select>
                </div>

                <List data={filteredPersons}
                    fields={['name', 'last_name', 'user.email', 'ci', 'role','phone']}
                    columns={[
                        { label: 'Rol', field: 'role', render: (v) => v?.toUpperCase() },
                        { label: 'Nombre', field: 'name', render: (v, p) => `${p.name} ${p.last_name}` },
                        { label: 'CI', field: 'ci', render: (p) => `${p}` },
                        { label: 'Correo', field: 'user.email', render: (v) => <a href={`mailto:${v}`}>{v}</a> },
                        { label: 'Teléfono', field: 'phone', render: (v) => <a href={`https://wa.me/591${v}`}>{v}</a> },
                    ]}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <Dialog open={open} onOpenChange={setOpen}>
                    <AddPerson campos={campos} handleAddPerson={handleAddPerson} selectedPerson={selectedPerson} />
                </Dialog>
            </div>
        </AppLayout>
    );
}
