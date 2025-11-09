import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

export default function DynamicForm({ fields, onCancel, postRoute, initialData = {}, isEdit = false }) {
    const { data, setData, post, processing, errors } = useForm(initialData);

    useEffect(() => {
        setData(initialData);
        console.log(data['role']);
    }, [initialData]);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(postRoute);
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-3">
                {fields.map((field) => (
                    <div key={field.name} className="flex flex-col gap-1">
                        <label htmlFor={field.name}>{field.label}</label>

                        {field.type === 'select' ? (
                            <select
                                id={field.name}
                                name={field.name}
                                value={data[field.name]}
                                onChange={handleChange}
                                required={field.required}
                                className="border rounded px-3 py-2"
                            >
                                <option value="">Seleccione...</option>
                                {field.options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <Input
                                id={field.name}
                                type={field.type}
                                name={field.name}
                                required={field.required}
                                placeholder={field.placeholder}
                                value={
                                    field.type === 'date' && data[field.name]
                                        ? new Date(data[field.name]).toISOString().split('T')[0] // convierte a YYYY-MM-DD
                                        : data[field.name] || ''
                                }
                                onChange={handleChange}
                            />
                        )}

                        {errors[field.name] && <InputError message={errors[field.name]} />}
                    </div>
                ))}
            </div>

            <div className="mt-4 flex gap-4">
                <Button type="submit" disabled={processing}>
                    {isEdit ? 'Actualizar' : 'Agregar'}
                </Button>
                <Button type="button" variant="secondary" disabled={processing} onClick={onCancel}>
                    Cancelar
                </Button>
            </div>
        </form>
    );
}
