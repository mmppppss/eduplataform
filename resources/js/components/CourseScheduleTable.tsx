import { useEffect } from 'react';
import { Plus, Trash2 } from "lucide-react";
import { router, usePage } from '@inertiajs/react';


/**
 * Recibe:
 * course = {
 *   id, course_name, schedules: [
 *     { day: 'lunes', start_time: '11:05:31', end_time: '17:05:31' }
 *   ]
 * }
 */
export default function CourseScheduleTable({ course, modify = false }) {

    const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];

    const scheduleMap = {};

    days.forEach(day => {
        scheduleMap[day] = {};
    });
    if (!course.schedules) {
        return null;
    }

    course.schedules.forEach(s => {
        const startHour = parseInt(s.start_time.substring(0, 2), 10);
        const endHour = parseInt(s.end_time.substring(0, 2), 10);

        for (let h = startHour; h < endHour; h++) {
            scheduleMap[s.day][`${h.toString().padStart(2, '0')}:00`] = s;
        }
    });

    const hours = [];
    for (let h = 7; h <= 20; h++) {
        hours.push(`${h.toString().padStart(2, '0')}:00`);
    }

    const onAddSchedule = (day, hour) => {
        console.log(day, hour, course.id);

        const input = prompt("Duración en horas");
        const duration = input ? parseInt(input, 10) : 0;

        if (isNaN(duration)) {
            alert("Debes ingresar un número válido.");
            return;
        }
        const [h, m] = hour.split(":");
        const start = new Date();
        start.setHours(Number(h), Number(m), 0, 0);

        const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

        const start_time = `${String(start.getHours()).padStart(2, "0")}:${String(start.getMinutes()).padStart(2, "0")}`;
        const end_time = `${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`;

        router.post("/horarios/", {
            course_id: course.id,
            day,
            start_time,
            end_time,
        });
    }
    const onDeleteSchedule = (id) => {
        console.log(id);
        if (confirm('¿Seguro que quieres eliminar este horario?')) {
            router.post('/horarios/delete', { id });
        }
    }

        return (
            <div className="overflow-x-auto border rounded-lg mt-4">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Hora</th>
                            {days.map(day => (
                                <th key={day} className="px-4 py-2 border capitalize">{day}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {hours.map(hour => (
                            <tr key={hour}>
                                <td className="border px-3 py-2 flex justify-center items-center">{hour}</td>

                                {days.map(day => {
                                    const entry = scheduleMap[day][hour];

                                    return (
                                        <td key={day} className="border  px-3 py-2 text-center justify-center items-center">
                                            {entry ? (
                                                <div className="bg-blue-100 flex border border-blue-300 rounded p-1 flex flex-row gap-1 items-center text-center justify-center">
                                                    <div>
                                                        {entry.start_time.substring(0, 5)} - {entry.end_time.substring(0, 5)}
                                                    </div>
                                                    {modify &&
                                                        <button
                                                            className="text-red-600 flex items-center gap-1 text-sm"
                                                            onClick={() => onDeleteSchedule(entry.id)}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>}
                                                </div>
                                            ) : modify && (
                                                <div className="bg-blue-100 flex border border-blue-300 rounded flex flex-row gap-1 items-center text-center justify-center">

                                                    <button
                                                        className="text-green-600 w-full flex justify-center items-center hover:bg-green-50 mr-0"
                                                        onClick={() => onAddSchedule(day, hour)}
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
