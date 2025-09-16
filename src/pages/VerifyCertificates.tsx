import React, { useState } from "react";
import { UploadBox } from "../components";
import type { CertificateResult } from "../types";

export default function VerifyCertificates() {
    const [results, setResults] = useState<CertificateResult[]>([]);

    function handleResult(r: CertificateResult) {
        // append to the results list
        setResults((prev) => [r, ...prev]);
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Verify Certificates</h2>
                <p className="text-sm text-gray-500">Upload a certificate to scan it for authenticity</p>
            </div>

            <UploadBox onResult={handleResult} />

            <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Results</h3>
                {results.length === 0 ? (
                    <div className="bg-white rounded-2xl p-6 shadow-soft text-gray-500">No results yet — upload a file to start.</div>
                ) : (
                    <div className="space-y-4">
                        {results.map((r) => (
                            <div key={r.id} className="bg-white rounded-2xl p-4 shadow-soft">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">{r.filename}</div>
                                        <div className="text-xs text-gray-400">Uploaded: {new Date(r.uploadedAt!).toLocaleString()}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`font-semibold ${r.status === "verified" ? "text-green-600" : r.status === "fraud" ? "text-red-600" : "text-gray-600"}`}>
                                            {r.status.toUpperCase()}
                                        </div>
                                        <div className="text-xs text-gray-400">{r.confidence ? `${r.confidence}% confidence` : ""}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
