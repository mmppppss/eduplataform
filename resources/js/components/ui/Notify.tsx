import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function Notify() {
    const { flash } = usePage().props as any;
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<"success" | "error" | null>(null);

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType("success");
        } else if (flash?.error) {
            setMessage(flash.error);
            setType("error");
        } else {
            setMessage(null);
            setType(null);
        }

        if (flash?.success || flash?.error) {
            const timer = setTimeout(() => {
                setMessage(null);
                setType(null);
            }, 2500); // 3.5 segundos
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!message) return null;

    return (
        <div className="fixed top-4 right-4 z-50">
            <div
                className={`max-w-sm w-full rounded-lg shadow-lg px-4 py-3 text-white text-sm font-medium
                    ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
            >
                {type === "success" ? "" : "⚠️ "} {message}
            </div>
        </div>
    );
}
