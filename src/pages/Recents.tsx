import React, { useEffect, useState } from "react";
import { fetchRecent } from "../services/api";
import { CertificateCard } from "../components";
import type { CertificateResult } from "../types";

export default function Recents() {
    const [items, setItems] = useState<CertificateResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecent().then((rows) => {
            setItems(rows);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Recents</h2>
            {loading ? (
                <div className="bg-white rounded-2xl p-6 shadow-soft">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map((it) => (
                        <CertificateCard key={it.id} item={it} onClick={() => alert(`Open details for ${it.filename}`)} />
                    ))}
                </div>
            )}
        </div>
    );
}
