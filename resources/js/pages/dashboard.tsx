import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, DollarSign, UserCheck, Clock, Calendar } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const {
        profile,
        stats,
        recentPayments,
        todayAttendances,
        upcomingClasses,
        pendingTutorships
    } = usePage<{
        profile: { user: any; role: string };
        stats: any;
        recentPayments: any[];
        todayAttendances: any[];
        upcomingClasses: any[];
        pendingTutorships: any[];
    }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Header con saludo personalizado */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-gray-600">Bienvenido, {profile.role}</p>
                    </div>
                </div>

                {/* Estadísticas Principales */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="relative overflow-hidden border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.totalStudents || 0}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats?.activeStudents || 0} activos
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Cursos</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.totalCourses || 0}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats?.coursesWithTeachers || 0} profesores
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Bs. {stats?.monthlyRevenue || 0}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats?.pendingPayments || 0} pagos pendientes
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Asistencia Hoy</CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.todayAttendance || 0}%</div>
                            <p className="text-xs text-muted-foreground">
                                {stats?.todayPresent || 0} presentes
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Segunda Fila: Clases de Hoy y Pagos Recientes */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Clases de Hoy */}
                    <Card className="relative overflow-hidden border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Clases de Hoy
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {upcomingClasses?.length > 0 ? (
                                <div className="space-y-3">
                                    {upcomingClasses.map((classItem) => (
                                        <div key={classItem.id} className="flex justify-between items-center p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{classItem.course_name}</p>
                                                <p className="text-sm text-gray-600">
                                                    {classItem.dia} • {classItem.hora_inicio} - {classItem.hora_fin}
                                                </p>
                                            </div>
                                            <p className="text-sm font-medium text-right">{classItem.teacher_name}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500">No hay clases programadas para hoy</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Pagos Recientes */}
                    <Card className="relative overflow-hidden border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5" />
                                Pagos Recientes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentPayments?.length > 0 ? (
                                <div className="space-y-3">
                                    {recentPayments.slice(0, 5).map((payment) => (
                                        <div key={payment.id} className="flex justify-between items-center p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{payment.student_name}</p>
                                                <p className="text-sm text-gray-600 capitalize">{payment.type}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">Bs. {payment.amount}</p>
                                                <span className={`text-xs px-2 py-1 rounded-full ${
                                                    payment.state === 'pagado'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {payment.state}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500">No hay pagos recientes</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Tercera Fila: Asistencia y Tutorías */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Asistencia de Hoy */}
                    <Card className="relative overflow-hidden border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader>
                            <CardTitle>Registro de Asistencia - Hoy</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {todayAttendances?.length > 0 ? (
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {todayAttendances.map((attendance) => (
                                        <div key={attendance.id} className="flex justify-between items-center p-2 border rounded">
                                            <span className="font-medium text-sm">{attendance.student_name}</span>
                                            <span className={`text-xs px-2 py-1 rounded ${
                                                attendance.estado === 'asistió' ? 'bg-green-100 text-green-800' :
                                                attendance.estado === 'retraso' ? 'bg-yellow-100 text-yellow-800' :
                                                attendance.estado === 'licencia' ? 'bg-blue-100 text-blue-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {attendance.estado}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500">No hay registros de asistencia para hoy</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Tutorías Activas */}
                    <Card className="relative overflow-hidden border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader>
                            <CardTitle>Tutorías Activas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {pendingTutorships?.length > 0 ? (
                                <div className="space-y-3 max-h-60 overflow-y-auto">
                                    {pendingTutorships.slice(0, 4).map((tutorship) => (
                                        <div key={tutorship.id} className="p-3 border rounded-lg">
                                            <p className="font-medium">{tutorship.student_name}</p>
                            <p className="text-sm text-gray-600">
                                Tutor: {tutorship.tutor_name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500">No hay tutorías activas</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Acciones Rápidas */}
                <Card className="relative overflow-hidden border border-sidebar-border/70 dark:border-sidebar-border">
                    <CardHeader>
                        <CardTitle>Acciones Rápidas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="outline" asChild>
                                <a href="/cursos">Gestionar Cursos</a>
                            </Button>
                            <Button variant="outline" asChild>
                                <a href="/asistencias">Revisar Asistencia</a>
                            </Button>
                            <Button variant="outline" asChild>
                                <a href="/tutorias">Gestionar Tutorías</a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
