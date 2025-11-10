import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import List from '@/components/List';

export default function Courses() {
    const { courses } = usePage().props;
    console.log(courses);
    const handleEdit = (person: any) => {
    };
    const handleDelete = (id: number) => {
    };
    return (
        <AppLayout>
            <Head title="Gestión de Cursos" />


            <List data={courses}
                fields={['course_name', 'teacher_name']}
                columns={[
                    { label: 'Curso', field: 'course_name', render: (v, c) => `${c.course_name}` },
                    { label: 'Profesor', field: 'teacher_name', render: (v, c) => `${c.teacher.person.name} ${c.teacher.person.last_name}` },
                ]}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

        </AppLayout>
    )
}
