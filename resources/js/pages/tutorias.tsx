import AppLayout from '@/layouts/app-layout';
import { useState, useEffect } from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import List from '@/components/List';
import DynamicForm from '@/components/DynamicForm';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const breadcrumbs = [
    { title: 'Tutorias', href: '/tutorias' },
];

export default function Tutorias() {

    const { tutorias } = usePage<any>().props;
    console.log(tutorias);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Cursos" />

            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Gestión de Cursos</h1>
                    <Button >Agregar Tutoria</Button>
                </div>



            </div>
        </AppLayout>
    );
}
