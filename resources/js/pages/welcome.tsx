import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BookOpen, Users, Award, Clock, MapPin, Phone, Mail } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const { setup } = usePage().props;
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard {setup.name}
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Iniciar Sesión
                                </Link>
                                {/*    <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Registrar
                                </Link>*/}
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <div className="flex w-full max-w-6xl items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                        <div className="text-center">
                            {/* Header Principal */}
                            <div className="mb-12">

                                <div className="flex justify-center mb-4">
                                    <img
                                        src={setup.icon_full}
                                        alt={setup.name}
                                        className="lg:h-90 object-contain" // Ajusta la altura según necesites
                                    />
                                </div>
                                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6">
                                    Formando líderes para el futuro
                                </p>
                                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                                    Institución educativa comprometida con la excelencia académica
                                    y el desarrollo integral de nuestros estudiantes.
                                </p>
                            </div>

                            {/* Características Principales */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                <div className="flex flex-col items-center p-6">
                                    <div className="bg-blue-100 p-4 rounded-full mb-4 dark:bg-blue-900">
                                        <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Excelencia Académica</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Programas educativos de calidad con profesores altamente calificados
                                    </p>
                                </div>

                                <div className="flex flex-col items-center p-6">
                                    <div className="bg-green-100 p-4 rounded-full mb-4 dark:bg-green-900">
                                        <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Acompañamiento Personal</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Sistema de tutorías y seguimiento individualizado para cada estudiante
                                    </p>
                                </div>

                                <div className="flex flex-col items-center p-6">
                                    <div className="bg-purple-100 p-4 rounded-full mb-4 dark:bg-purple-900">
                                        <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Formación Integral</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Desarrollo de habilidades académicas, sociales y emocionales
                                    </p>
                                </div>
                            </div>

                            {/* Información de Contacto */}
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-8">
                                <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex items-center justify-center gap-3">
                                        <MapPin className="h-5 w-5 text-blue-600" />
                                        <span className="text-gray-600 dark:text-gray-300">
                                            Av. Educación #123, Ciudad
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center gap-3">
                                        <Phone className="h-5 w-5 text-green-600" />
                                        <span className="text-gray-600 dark:text-gray-300">
                                            +591 1234-5678
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center gap-3">
                                        <Mail className="h-5 w-5 text-purple-600" />
                                        <span className="text-gray-600 dark:text-gray-300">
                                            info@{setup.name?.toLowerCase().replace(/\s+/g, '') || 'institucion'}.edu
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Horarios de Atención */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                                <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
                                    <Clock className="h-6 w-6" />
                                    Horarios de Atención
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
                                    <div className="text-center">
                                        <p className="font-semibold">Lunes a Viernes</p>
                                        <p>7:00 AM - 8:00 PM</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-semibold">Sábados</p>
                                        <p>8:00 AM - 2:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Call to Action */}
                            {!auth.user && (
                                <div className="mt-12">
                                    <h3 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h3>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link
                                            href={route('login')}
                                            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                        >
                                            Acceder al Sistema
                                        </Link>
                                        <Link
                                            href="https://wa.me"
                                            className="inline-block border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900"
                                        >
                                            Solicitar Información
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="hidden h-14.5 lg:block"></div>
                </div>
            </div>
            <div className="hidden h-14.5 lg:block"></div>
        </>
    );
}
