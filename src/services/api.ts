// Mock API - replace with real axios calls
import type { CertificateResult } from "../types";

export function uploadCertificateMock(file: File): Promise<CertificateResult> {
    return new Promise((resolve) => {
        // simulate network + processing delay
        setTimeout(() => {
            const id = Math.random().toString(36).slice(2, 9);
            const statusCandidates: CertificateResult["status"][] = ["verified", "fraud", "unknown"];
            const status = statusCandidates[Math.floor(Math.random() * statusCandidates.length)];
            resolve({
                id,
                filename: file.name,
                status,
                confidence: Math.round(60 + Math.random() * 40),
                uploadedAt: new Date().toISOString(),
            });
        }, 1400 + Math.random() * 1600);
    });
}

export function fetchRecentMock(): Promise<CertificateResult[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const items: CertificateResult[] = Array.from({ length: 6 }).map((_, i) => ({
                id: `r${i}`,
                filename: `certificate-${i + 1}.png`,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                status: ["verified", "fraud", "unknown"][i % 3] as any,
                confidence: 80 - i * 5,
                uploadedAt: new Date(Date.now() - i * 3600 * 1000).toISOString(),
            }));
            resolve(items);
        }, 600);
    });
}
