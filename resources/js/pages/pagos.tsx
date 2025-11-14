import AppLayout from '@/layouts/app-layout';
import { useState, useEffect } from 'react';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import List from '@/components/List';
import { Button } from '@/components/ui/button';
import Notify from '@/components/ui/Notify';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import InscriptionForm from '@/components/InscriptionForm';

const breadcrumbs = [
    { title: 'Pagos', href: '/pagos' },
];



export default function Pagos() {
    const { payments } = usePage<any>().props;
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [courseData, setCourseData] = useState({})
    console.log(payments);
    const { data, setData, post } = useForm({
        students: []
    });
    const handleDelete = (id: number) => {

    }
    const handleEnroll = (studentIds: number[]) => {
        console.log('Estudiantes a inscribir:', studentIds);

        router.post(`/inscripcion/${selectedCourse}`, {
            students: studentIds
        }, {
            onSuccess: () => {
                setOpen(false);
            },
            onError: (errors) => {
                console.error(errors);
                alert("Error al inscribir estudiantes");
            }
        });
    };
    const handleEdit = (id: number) => {

    }
    useEffect(() => {

    }, [selectedCourse]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pagos" />
            <Notify />
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Pagos</h1>
                    {selectedCourse !== '' && <Button onClick={() => setOpen(open ? false : true)}>Agregar nuevos pagos</Button>}
                </div>

                {/*
                <div className="relative">
                    <label htmlFor="course">Pagos: </label>
                    <select
                        name="course"
                        className="border rounded px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <option value="">Todos</option>
                        {courses.map((r: any) => (
                            <option key={r.id} value={r.id}>
                                {r.course_name}
                            </option>
                        ))}
                    </select>
                </div>*/}


                <List
                    data={payments}
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
                    onDelete={handleDelete}
                />

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-2xl w-[90vw] max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8">
                        <DialogHeader>

                        </DialogHeader>
                    </DialogContent>

                </Dialog>

            </div>
        </AppLayout>
    );
}
