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
    { title: 'Cursos', href: '/cursos' },
];

function AddCourse({ campos, handleClose, selectedCourse = null }) {
    const initialData = selectedCourse
        ? {
            course_name: selectedCourse.course_name,
            teacher_id: selectedCourse.teacher_id,
        }
        : {};

    const postRoute = selectedCourse
        ? `/cursos/update/${selectedCourse.id}`
        : '/cursos/store';

    return (
        <DialogContent className="max-w-lg w-[90vw] max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8">
            <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                    {selectedCourse ? 'Editar Curso' : 'Agregar Curso'}
                </DialogTitle>
            </DialogHeader>

            <DynamicForm
                fields={campos}
                onCancel={handleClose}
                postRoute={postRoute}
                initialData={initialData}
                isEdit={!!selectedCourse}
            />
        </DialogContent>
    );
}

export default function Courses() {
    const { courses, teachers} = usePage<any>().props;
    const { post } = useForm();
    const [open, setOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleAddCourse = () => setOpen(true);

    const handleEdit = (course: any) => {
        setSelectedCourse(course);
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedCourse(null);
    };
    const handleDelete = (id: number) => {
        if (confirm('¿Seguro que quieres eliminar este curso?')) {
            post(`/cursos/destroy/${id}`, {
                onSuccess: () => {
                    console.log('Curso desactivado correctamente');
                },
                onError: (errors) => {
                    console.error(errors);
                }
            })
        }
    };

    const teachersSelect = teachers.map((t: any) => ({
        value: t.id,
        label: `${t.person.name} ${t.person.last_name}`,
    }));

    const campos = [
        { name: "course_name", label: "Nombre del Curso", type: "text", required: true, placeholder: "Curso" },
        { name: "teacher_id", label: "Profesor", type: "select", options: teachersSelect, required: true },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Cursos" />

            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Gestión de Cursos</h1>
                    <Button onClick={handleAddCourse}>Agregar Curso</Button>
                </div>

                <List
                    data={courses}
                    fields={['course_name', 'teacher_name', 'active']}
                    columns={[
                        { label: 'Curso', field: 'course_name', render: (v, c) => c.course_name },
                        { label: 'Activo', field: 'active', render: (v, c) => c.active },
                        {
                            label: 'Profesor',
                            field: 'teacher_name',
                            render: (v, c) => `${c.teacher.person.name} ${c.teacher.person.last_name}`
                        },
                    ]}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <Dialog open={open} onOpenChange={setOpen}>
                    <AddCourse campos={campos} handleClose={handleCloseDialog} selectedCourse={selectedCourse} />
                </Dialog>
            </div>
        </AppLayout>
    );
}
