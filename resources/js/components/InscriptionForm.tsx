import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface Student {
    id: number;
    name: string;
    last_name: string;
    ci: string;
}

interface CourseEnrollmentSimpleProps {
    courseName: string;
    students: Student[]; // Los estudiantes disponibles (ya filtrados por no inscritos)
    onEnroll: (studentIds: number[]) => void; // Función para enviar las inscripciones
    selectedStudents: number[];
    setSelectedStudents: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function InscriptionForm({
    students,
    selectedStudents, setSelectedStudents,
    onEnroll
}: CourseEnrollmentSimpleProps) {

    const handleCheckboxChange = (studentId: number) => {
        setSelectedStudents(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    const handleSelectAll = () => {
        if (selectedStudents.length === students.length) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(students.map(s => s.id));
        }
    };

    const handleEnroll = () => {
        if (selectedStudents.length > 0) {
            onEnroll(selectedStudents);
            setSelectedStudents([]); // Limpiar selección después de inscribir
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
                Inscribir estudiantes
            </h2>

            <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3">
                                <Checkbox
                                    checked={students.length > 0 && selectedStudents.length === students.length}
                                    onCheckedChange={handleSelectAll}
                                />
                            </th>
                            <th className="p-3 text-left">Nombre</th>
                            <th className="p-3 text-left">Apellido</th>
                            <th className="p-3 text-left">CI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id} className="border-t hover:bg-gray-50">
                                <td className="p-3">
                                    <Checkbox
                                        checked={selectedStudents.includes(student.id)}
                                        onCheckedChange={() => handleCheckboxChange(student.id)}
                                    />
                                </td>
                                <td className="p-3">{student.name}</td>
                                <td className="p-3">{student.last_name}</td>
                                <td className="p-3">{student.ci}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {students.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No hay estudiantes disponibles
                    </div>
                )}
            </div>

            <div className="mt-6 flex justify-between items-center">

                <Button onClick={handleEnroll} disabled={selectedStudents.length === 0}>
                    Inscribir {selectedStudents.length} estudiante(s)
                </Button>
            </div>
        </div>
    );
}
