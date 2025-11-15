import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function List({
    data = [],
    fields = [],
    columns = [],
    onEdit,
    onDelete,
    otherActions=[],
}) {
    const [query, setQuery] = useState('');

    const filteredData = useMemo(() => {
        if (!query) return data;

        const q = query.toLowerCase();
        return data.filter(item =>
            fields.some(field => {
                const value = field.split('.').reduce((obj, f) => obj?.[f], item);
                return value && value.toString().toLowerCase().includes(q);
            })
        )||[];
    }, [query, data, fields]);

    return (
        <div className="flex flex-col gap-4">
            <Input
                type="text"
                placeholder="Buscar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full max-w-sm"
            />

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                            {columns.map((col) => (
                                <th key={col.label} className="py-3 px-4">{col.label}</th>
                            ))}
                            {(onEdit || onDelete || otherActions && otherActions.length>=1 ) && <th className="py-3 px-4 text-center">Acciones</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {[...(filteredData || [])].map((item) => (
                            <tr key={item.id} className="border-t hover:bg-gray-50">
                                {columns.map((col) => {
                                    const value = col.field.split('.').reduce((obj, f) => obj?.[f], item);
                                    return (
                                        <td key={col.field} className="py-2 px-4">
                                            {col.render ? col.render(value, item) : value}
                                        </td>
                                    );
                                })}

                                {(onEdit || onDelete || otherActions) && (
                                    <td className="py-2 px-4 flex gap-2 justify-center">
                                        {onEdit && (
                                            <Button variant="outline" onClick={() => onEdit(item)}>
                                                Editar
                                            </Button>
                                        )}
                                        {onDelete && (
                                            <Button onClick={() => onDelete(item.id)}>
                                                Eliminar
                                            </Button>
                                        )}
                                        {otherActions.map((action) => (
                                            <Button key={action.label} onClick={() => action.onClick(item)}>
                                                {action.label}
                                            </Button>
                                        ))}
                                    </td>
                                )}
                            </tr>
                        ))}
                        {filteredData.length === 0 && (
                            <tr>
                                <td colSpan={columns.length + 1} className="py-2 px-4 text-center">
                                    No hay nada que mostrar :)
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

