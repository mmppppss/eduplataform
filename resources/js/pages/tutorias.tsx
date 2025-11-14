import AppLayout from '@/layouts/app-layout';
import { useState, useEffect } from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
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
    { title: 'Tutorias', href: '/tutorias' },
];
function AddTutor({ campos, handleCancel, selected = null }) {
    const postRoute = selected
        ? `/tutorias/update/${selected.id}`
        : '/tutorias/store';
    const initialData = selected
        ? {
            student_id: selected.student_id,
            tutor_id: selected.tutor_id,
        }
        : {};
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
                    Selecciona el Estudiante y el Tutor
                </DialogTitle>
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

export default function Tutorias() {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const { tutorias, tutors, students } = usePage<any>().props;
    const { post } = useForm();
    const handleDelete = (id: number) => {
        if (confirm('¿Eliminar relacion de tutoria?')) {
            post(`/tutorias/destroy/${id}`, {
                onSuccess: () => {
                    alert('Eliminado correctamente');
                },
                onError: (errors) => {
                }
            })
        }
    };
    const handleEdit = (tutoria: any) => {
        setSelected(tutoria);
        setOpen(true);
    };


    const tutorsSelect = tutors.map((t: any) => ({
        value: t.person_id,
        label: `${t.person.name} ${t.person.last_name}`,
    }));
    const studentsSelect = students.map((t: any) => ({
        value: t.person_id,
        label: `${t.person.name} ${t.person.last_name}`,
    }))
    const campos = [
        { name: "student_id", label: "Estudiante", type: "select", options: studentsSelect, required: true },
        { name: "tutor_id", label: "Tutor", type: "select", options: tutorsSelect, required: true },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestionar Tutorias" />
            <Notify />
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Gestión de Tutorias</h1>
                    <Button onClick={() => setOpen(open ? false : true)} >Agregar Tutoria</Button>
                </div>


                <List
                    data={tutorias}
                    fields={['student.name', 'tutor.name']}
                    columns={[
                        {
                            label: 'Estudiante',
                            field: 'student.name',
                            render: (v, item) => `${item.student?.name} ${item.student?.last_name}`
                        },
                        {
                            label: 'Tutor',
                            field: 'tutor.name',
                            render: (v, item) => `${item.tutor?.name} ${item.tutor?.last_name}`
                        },
                    ]}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />



                <Dialog open={open} onOpenChange={setOpen}>
                    <AddTutor campos={campos} handleCancel={() => setOpen(false)} selected={selected}  />
                </Dialog>

            </div>
        </AppLayout>
    );
}
