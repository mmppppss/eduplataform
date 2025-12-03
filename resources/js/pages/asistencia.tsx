import { usePage, router , Head} from "@inertiajs/react";
import { useState } from "react";
import AppLayout from "@/layouts/app-layout"
import { Button } from "@/components/ui/button";
import AttendanceList from "@/components/AttendanceList";
import Notify from '@/components/ui/Notify';

const breadcrumbs = [
    { title: 'Asistencias', href: '/asistencias' },
];


export default function Asistencia() {
    const { courses, enrollments, attendances } = usePage().props;

    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleSelectCourse = (courseId) => {
        setSelectedCourse(courseId);
    };

    const handleSaveAttendance = (items) => {
        router.post("/asistencias", { items });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Asistencias" />
            <Notify/>

            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Gestión de Asistencias</h1>
                </div>

                {/* Selección de curso */}
                <div className="flex gap-4">
                    {courses.map((c) => (
                        <Button
                            key={c.id}
                            variant={selectedCourse === c.id ? "default" : "outline"}
                            onClick={() => handleSelectCourse(c.id)}
                        >
                            {c.course_name}
                        </Button>
                    ))}
                </div>

                {/* Lista solo si selecciona un curso */}
                {selectedCourse && (
                    <AttendanceList
                        enrollments={enrollments.filter(e => e.course_id === selectedCourse)}
                        attendances={attendances}
                        onSave={handleSaveAttendance}
                    />
                )}
            </div>
        </AppLayout>
    );
}
