import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lista',
        href: '/listas',
    },
];

export default function Reportes() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Listas" />
            aqui iran las listas jjsdjsad
        </AppLayout>
    );
}
