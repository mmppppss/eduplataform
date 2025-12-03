import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AttendanceList({ enrollments, attendances, onSave }) {
    const initialState = {};
    console.log(enrollments);
    attendances.forEach((a) => {
        initialState[a.enrollment_id] = a.state === "asistió";
    });

    const [checks, setChecks] = useState(initialState);

    const toggleCheck = (id) => {
        setChecks({
            ...checks,
            [id]: !checks[id],
        });
    };

    const handleSave = () => {
        const items = enrollments.map((e) => ({
            enrollment_id: e.id,
            state: checks[e.id] ? "asistió" : "falta",
        }));

        onSave(items);
    };

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Lista de inscritos</h2>

            <table className="w-full table-auto border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Estudiante</th>
                        <th className="p-2 border w-10">Asistió</th>
                    </tr>
                </thead>

                <tbody>
                    {enrollments.map((e) => (
                        <tr key={e.id}>
                            <td className="border p-2">
                                {e.student.name} {e.student.last_name}
                            </td>
                            <td className="border p-2 text-center">
                                <input
                                    type="checkbox"
                                    checked={checks[e.id] || false}
                                    onChange={() => toggleCheck(e.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-end">
                <Button onClick={handleSave}>Guardar asistencias</Button>
            </div>
        </div>
    );
}
