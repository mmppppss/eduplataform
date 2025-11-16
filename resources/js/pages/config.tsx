import AppLayout from '@/layouts/app-layout';
import { useState, useEffect } from 'react';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import List from '@/components/List';
import DynamicForm from '@/components/DynamicForm';
import { Button } from '@/components/ui/button';
import Notify from '@/components/ui/Notify';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const breadcrumbs = [
    { title: 'Configuración', href: '/config' },
];

function EditConfig({ campos, handleCancel, selected = null }) {
    const initialData = selected
        ? {
            key: selected.key,
            'value': selected.value
        }
        : {};
    const postRoute = selected ? `/configs/${selected.key}` : '';
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
                    {selected ? 'Editar Configuración' : 'Agregar Configuración'}

                </DialogTitle>
                    {selected && selected.key}
            </DialogHeader>

            <DynamicForm
                fields={campos}
                onCancel={handleCancel}
                postRoute={postRoute}
                initialData={initialData}
                isEdit={selected !== null}
            />
        </DialogContent>
    );
}

export default function Configuracion() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const { configs } = usePage<any>().props;
    const { post } = useForm();

    const handleEdit = (config: any) => {
        setSelected(config);
        setOpen(true);
    };

    const toggleActive = (key: string) => {
        const currentValue = configs[key];
        const newValue = currentValue === 'true' ? 'false' : 'true';

        router.post(`/configs/${key}`, {
            value: newValue
        }, {
            onSuccess: () => {
            },
            onError: (errors) => {
            }
        })
    };

    // Campos para el formulario
    const campos = [

        {
            name: "value",
            label: "Valor",
            type: "number",
            required: true,
            placeholder: "valor"
        },
    ];

    const configsArray = configs ? Object.entries(configs).map(([key, value]) => ({
        key,
        value
    })) : [];
    const groupedConfigs = {
        'Pagos': configsArray.filter(c => c.key.startsWith('amount_')) || [],
        'Seguridad': configsArray.filter(c => c.key.startsWith('twofa_')) || [],
        'Sistema': configsArray.filter(c => !c.key.startsWith('amount_') && !c.key.startsWith('twofa_')) || [],
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuración del Sistema" />
            <Notify />

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Configuración del Sistema</h1>
                </div>

                {/* Configuraciones de Pagos */}
                {groupedConfigs['Pagos'].length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Configuración de Pagos</h2>
                        <List
                            data={groupedConfigs['Pagos']}
                            fields={['key', 'value']}
                            columns={[
                                {
                                    label: 'Configuración',
                                    field: 'key',
                                    render: (v, item) => {
                                        const names: any = {
                                            'amount_mensualidad': 'Mensualidad',
                                            'amount_laboratorio': 'Laboratorio',
                                            'amount_libro': 'Libro'
                                        };
                                        return names[item.key] || item.key;
                                    }
                                },
                                {
                                    label: 'Valor',
                                    field: 'value',
                                    render: (v, item) => `Bs. ${parseFloat(item.value).toFixed(2)}`
                                },
                            ]}
                            onEdit={handleEdit}
                        />
                    </div>
                )}

                {/* Configuraciones de Seguridad */}
                {groupedConfigs['Seguridad'].length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Configuración de Seguridad</h2>
                        <List
                            data={groupedConfigs['Seguridad']}
                            fields={['key', 'value']}
                            columns={[
                                {
                                    label: 'Configuración',
                                    field: 'key',
                                    render: (v, item) => {
                                        const names: any = {
                                            'twofa_admin': '2FA para Administradores',
                                            'twofa_user': '2FA para Usuarios'
                                        };
                                        return names[item.key] || item.key;
                                    }
                                },
                                {
                                    label: 'Estado',
                                    field: 'value',
                                    render: (v, item) => (
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.value === 'true'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {item.value === 'true' ? 'Activado' : 'Desactivado'}
                                        </span>
                                    )
                                },
                            ]}
                            otherActions={[
                                {
                                    label: 'Cambiar Estado',
                                    onClick: (item: any) => toggleActive(item.key)
                                }
                            ]}
                        />
                    </div>
                )}

                {/* Otras configuraciones */}
                {groupedConfigs['Sistema'].length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Otras Configuraciones</h2>
                        <List
                            data={groupedConfigs['Sistema']}
                            fields={['key', 'value']}
                            columns={[
                                {
                                    label: 'Configuración',
                                    field: 'key',
                                    render: (v, item) => item.key
                                },
                                {
                                    label: 'Valor',
                                    field: 'value',
                                    render: (v, item) => item.value
                                },
                            ]}
                            onEdit={handleEdit}
                        />
                    </div>
                )}

                {/* Diálogo para agregar/editar */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <EditConfig
                        campos={campos}
                        handleCancel={() => setOpen(false)}
                        selected={selected}
                    />
                </Dialog>
            </div>
        </AppLayout>
    );
}
