import { Form, Head } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyCode() {
    return (
        <AuthLayout
            title="Verificación 2FA"
            description="Revisa tu correo y escribe el código de 6 dígitos que recibiste"
        >
            <Head title="Verificar código" />

            <Form method="post" action={route('verify.code')} className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-2">
                            <label htmlFor="code">Código</label>
                            <Input
                                id="code"
                                type="text"
                                name="code"
                                required
                                autoFocus
                                placeholder="1234"
                            />
                            <InputError message={errors.code} />
                        </div>

                        <Button type="submit" className="mt-4 w-full" disabled={processing}>
                            Verificar código
                        </Button>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
