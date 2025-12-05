import { usePage, router, Head } from "@inertiajs/react";
import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import Notify from "@/components/ui/Notify";

const breadcrumbs = [
    { title: "Reportes", href: "/reportes" }
];

export default function Reportes() {
    const { courses, students } = usePage().props;
    const [courseId, setCourseId] = useState("");
    const [studentId, setStudentId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [data, setData] = useState([]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Módulo de Reportes" />
            <Notify />

            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold mb-4">Módulo de Reportes</h1>

                {data.length === 0 && (
                    <p className="text-gray-500 mt-4">No hay datos para mostrar.</p>
                )}
            </div>
        </AppLayout>
    );
}
