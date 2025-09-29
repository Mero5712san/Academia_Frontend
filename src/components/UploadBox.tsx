import React, { useState } from "react";
import { uploadCertificate } from "../services/api";
import type { CertificateResult } from "../types";

export const UploadBox = ({ onResult }: { onResult: (r: CertificateResult) => void }) => {
    const [loading, setLoading] = useState(false);
    const [filename, setFilename] = useState<string | null>(null);

    async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setFilename(file.name);
        setLoading(true);
        try {
            const res = await uploadCertificate(file);

            // map backend response to CertificateResult type
            const mapped: CertificateResult = {
                id: res.id,
                filename: file.name,
                uploadedAt: new Date().toISOString(),
                status: res.status, // "verified" | "fraud" etc
                confidence: res.verification?.hash_match ? 100 : 60, // just an example mapping
                studentName: res.student_name,
                institution: res.institution,
                yearOfPass: res.year_of_pass,
                course: res.course,
                grade: res.grade,
                certificateId: res.certificate_id,
                finalStatus: res.verification?.final_status,
                hash: res.hash,
                filePath: res.file_path,
            };

            onResult(mapped);
        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="bg-white rounded-2xl p-6 shadow-soft h-64 flex items-center justify-center">
                <div className="w-full max-w-3xl text-center">
                    <div className="text-sm text-gray-500 mb-4">
                        Upload certificate (drag & drop or choose file)
                    </div>
                    <label className="block cursor-pointer">
                        <input
                            type="file"
                            accept="image/*,application/pdf"
                            className="hidden"
                            onChange={handleFile}
                        />
                        <div className="border-2 border-dashed border-gray-200 rounded-xl py-10">
                            <div className="text-tealDark font-semibold">Select File</div>
                            <div className="text-xs text-gray-400 mt-2">
                                {filename ?? "No file selected"}
                            </div>
                        </div>
                    </label>
                    <div className="mt-4">
                        <button
                            disabled
                            className="bg-tealPrimary/80 text-white px-4 py-2 rounded-md text-sm"
                        >
                            Upload (auto)
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                {loading && (
                    <div className="p-4 rounded-lg bg-white shadow-soft text-sm">
                        Processing... please wait.
                    </div>
                )}
            </div>
        </div>
    );
};
