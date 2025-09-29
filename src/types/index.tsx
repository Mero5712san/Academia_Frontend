// export all your types from this file
// EXAMPLE
// export type { default as MyType } from './myType'


export interface CertificateResult {
    id: string | number;
    filename: string;
    status: "verified" | "fraud" | "unknown";
    confidence?: number;
    uploadedAt?: string;
}


export interface IconProps {
    size?: number | string;
    color?: string;
}

export interface CertificateResult {
    id: number | string,
    student_name: string,
    institution: string,
    course: string,
    year_of_pass: number,
    status: "verified" | "fraud" | "unknown",
    hash: string,
    file_path: string,
}