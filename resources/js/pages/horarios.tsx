import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import Notify from '@/components/ui/Notify';
import CourseScheduleTable from '@/components/CourseScheduleTable';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Horarios',
        href: '/horarios',
    },
];

export default function Horarios() {
    const { courses, role} = usePage<any>().props
    const [modify, setModify] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    const handleModify = () => {
        setModify(!modify);
    };

    const handleCourseChange = (id: string) => {
        setSelectedCourseId(id);
        setSelectedCourse(courses.find((p: any) => p.id === parseInt(id)));
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion de Horarios" />
            <Notify />
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Horarios</h1>
                    {role=="administrador" && <Button onClick={handleModify}>Modificar Horarios</Button> }
                </div>

                <div className="relative">
                    <select
                        className="border rounded px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedCourseId}
                        onChange={(e) => handleCourseChange(e.target.value)}
                    >
                        <option value="">Seleccione un curso</option>
                        {courses.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.course_name}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedCourse && <CourseScheduleTable course={selectedCourse} modify={modify} />}
            </div>
        </AppLayout>
    );
}
