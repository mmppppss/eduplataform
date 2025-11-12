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
    { title: 'Inscripcion', href: '/inscripcion' },
];



export default function Inscripcion() {
    const { courses, enrollments } = usePage<any>().props;
    const [selectedCourse, setSelectedCourse] = useState('');
    const [filteredCourses, setFilteredCourses] = useState(enrollments.data);
    const handleDelete = (id: number) => {

    }
    const handleEdit = (id: number) => {

    }
    useEffect(() => {
        console.log(selectedCourse);
        if (selectedCourse === '') {
            setFilteredCourses(enrollments.data);
        } else {
            const filtered = enrollments.data.filter((p: any) => p.course_id === parseInt(selectedCourse));
            console.log(filtered);
            setFilteredCourses(filtered);
        }
    }, [selectedCourse]);



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inscripciones" />

            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Inscripciones</h1>
                </div>

                <div className="relative">
                    <label htmlFor="course">Curso: </label><select
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
                    fields={['id', 'student.name', 'student.last_name', 'course.course_name', 'enroll_date']}
                    columns={[
                        { label: 'ID', field: 'id' },
                        {
                            label: 'Estudiante',
                            field: 'student',
                            render: (student) => `${student.name} ${student.last_name}`
                        },
                        {
                            label: 'Curso',
                            field: 'course.course_name'
                        },
                        {
                            label: 'Fecha',
                            field: 'enroll_date',
                            render: (enroll_date) => new Date(enroll_date).toLocaleDateString()
                        }
                    ]}
                    onDelete={handleDelete}
                />
            </div>
        </AppLayout>
    );
}
