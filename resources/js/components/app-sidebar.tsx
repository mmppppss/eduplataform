import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Folder, LayoutGrid,  PersonStandingIcon, BookOpen, ClipboardList, UsersRound } from 'lucide-react';
import AppLogo from './app-logo';
import { usePage } from '@inertiajs/react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
        role: ['administrador', 'estudiante', 'profesor', 'contable', 'tutor'],
    },
    {
        title: 'Reportes',
        href: '/reportes',
        icon: Folder,
        role: ['administrador', 'estudiante', 'profesor', 'contable', 'tutor'],
    },
    {
        title: 'Personas',
        href: '/personas',
        icon: PersonStandingIcon,
        role: ['administrador'],
    },
    {
        title: 'Cursos',
        href: '/cursos',
        icon: BookOpen,
        role: ['administrador'],
    },
    {
        title: 'Inscripciones',
        href: '/inscripcion',
        icon: ClipboardList,
        role: ['administrador'],
    },
    {
        title: 'Tutorias',
        href: '/tutorias',
        icon: UsersRound,
        role: ['administrador'],
    }

];

const footerNavItems: NavItem[] = [
    /*{
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },*/
];

export function AppSidebar() {
    const profile = usePage<{ profile: { user: any; role: string } }>().props.profile;
    const navitems = mainNavItems.filter(item => item.role?.includes(profile.role));
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navitems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
