import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reportes',
        href: '/reportes',
    },
];

export default function Reportes() {
    const { users } = usePage().props ;
    console.log(users);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reportes" />
            {users}
        </AppLayout>
    );
}
