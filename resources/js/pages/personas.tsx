import { Dialog } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

import { Form, Head } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';
import { Select } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personas',
        href: '/personas',
    },
];

export default function Reportes() {
    const { users } = usePage().props as { users: Array<{ id: number; name: string; email: string; created_at: string }> };
    const [openDialog, setOpenDialog] = useState(false);
    const handleAddPerson = () => {
        setOpenDialog(openDialog ? false : true)
    }
    const roles = [
        { value: 'Administrador', label: 'Administrador' },
        { value: 'Profesor', label: 'Profesor' }
    ]
    const form = (<Form method="post" action={route('verify.code')} className="flex flex-col gap-6">
        {({ processing, errors }) => (
            <>
                <div className="grid gap-2">
                    <label htmlFor="name">Nombres</label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        required
                        autoFocus
                        placeholder="John"
                    />
                    <InputError message={errors.code} />
                    <label htmlFor="lastname">Apellidos</label>
                    <Input
                        id="lastname"
                        type="text"
                        name="lastname"
                        required
                        placeholder="Doe"
                    />
                    <InputError message={errors.code} />
                    <label htmlFor="ci">Cedula de Identidad</label>
                    <Input
                        id="ci"
                        type="number"
                        name="ci"
                        required
                        placeholder="9876543"
                    />
                    <InputError message={errors.code} />
                    <label htmlFor="mail">Correo Electronico</label>
                    <Input
                        id="mail"
                        type="email"
                        name="mail"
                        required
                        placeholder="johnDoe@email.com"
                    />
                    <InputError message={errors.code} />
                    <label htmlFor="tel">Telefono</label>
                    <Input
                        id="tel"
                        type="tel"
                        name="tel"
                        required
                        placeholder="76543210"
                    />
                    <InputError message={errors.code} />
                    <label htmlFor="dir">Direccion</label>
                    <Input
                        id="dir"
                        type="text"
                        name="dir"
                        placeholder="Calle falsa 123"
                    />
                    <InputError message={errors.code} />
                    <div className='w-full flex justify-start'>
                        <div>
                            <label htmlFor="date">Fecha de Nacimiento</label>
                            <Input
                                id="date"
                                type="date"
                                name="date"
                            />
                            <InputError message={errors.code} />
                        </div>
                        <div>
                            <label htmlFor="rol">Rol</label>
                            <select>
                                {roles.map(r => {
                                    return <option value={r.value}>{r.label}</option>
                                })}
                            </select>
                            <InputError message={errors.code} />
                        </div>
                    </div>
                </div>
                <div className='mt-4'>
                    <Button type="submit" className="w-auto mr-4" disabled={processing}>
                        Agregar
                    </Button>
                    <Button onClick={handleAddPerson} className="w-auto" disabled={processing}>
                        Cancelar
                    </Button>
                </div>
            </>
        )
        }
    </Form >)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion Personas" />
            <div className="p-6">
                {openDialog ? <Dialog>
                    {form}
                </Dialog> : null}

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
            </div>
        </AppLayout>
    );
}
