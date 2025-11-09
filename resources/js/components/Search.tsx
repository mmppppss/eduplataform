import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';

export default function Search({ data, fields, onFiltered }) {
    const [query, setQuery] = useState('');

    const filteredData = useMemo(() => {
        if (!query) return data;

        const q = query.toLowerCase();

        return data.filter(item =>
            fields.some(field => {
                const value = field.split('.').reduce((obj, f) => obj?.[f], item);
                return value && value.toString().toLowerCase().includes(q);
            })
        );
    }, [query, data, fields]);

    //fix the render

    return (
        <div className="flex flex-col gap-4">
            <Input
                type="text"
                placeholder="Buscar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full max-w-sm"
            />
        </div>
    );
}
