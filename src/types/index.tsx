// export all your types from this file
// EXAMPLE
// export type { default as MyType } from './myType'


export interface CertificateResult {
    id: string;
    filename: string;
    status: "verified" | "fraud" | "unknown";
    confidence?: number;
    uploadedAt?: string;
}


export interface IconProps {
    size?: number | string;
    color?: string;
}