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
    { title: 'Inscripcion', href: '/inscripcion' },
];



export default function Inscripcion() {
    const { courses, enrollments, students } = usePage<any>().props;
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [courseData, setCourseData] = useState({})
    const [filteredCourses, setFilteredCourses] = useState(enrollments.data);

    const { data, setData, post } = useForm({
        students: []
    });
    const handleDelete = (id: number) => {

    }
    const handleEnroll = (studentIds: number[]) => {

        router.post(`/inscripcion/${selectedCourse}`, {
            students: studentIds
        }, {
            onSuccess: () => {
                setOpen(false);
            },
            onError: (errors) => {
                alert("Error al inscribir estudiantes");
            }
        });
    };
    const handleEdit = (id: number) => {

    }
    useEffect(() => {
        if (selectedCourse === '') {
            setFilteredCourses(enrollments.data);
        } else {
            const filtered = enrollments.data.filter((p: any) => p.course_id === parseInt(selectedCourse));
            setFilteredCourses(filtered);
        }
        setCourseData(courses.find((r: any) => String(r.id) === selectedCourse))
    }, [selectedCourse]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inscripciones" />
            <Notify />
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Gestión de Inscripciones</h1>
                    {selectedCourse !== '' && <Button onClick={() => setOpen(open ? false : true)}>Agregar nuevas Inscripciones</Button>}
                </div>

                <div className="relative">
                    <label htmlFor="course">Curso: </label>
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
                </div>

                <List
                    data={filteredCourses}
                    fields={['id', 'student.name', 'student.last_name', 'course.course_name']}
                    columns={[
                        {
                            label: 'Estudiante',
                            field: 'student',
                            render: (student) => `${student.name} ${student.last_name}`
                        },
                        {
                            label: 'Curso',
                            field: 'course.course_name'
                        },
                    ]}
                    onDelete={handleDelete}
                />
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-2xl w-[90vw] max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold">
                                {courseData && courseData.course_name}
                            </DialogTitle>
                            <InscriptionForm
                                students={students}
                                selectedStudents={selectedStudents}
                                setSelectedStudents={setSelectedStudents}
                                onEnroll={handleEnroll}
                            />
                        </DialogHeader>
                    </DialogContent>

                </Dialog>

            </div>
        </AppLayout>
    );
}
