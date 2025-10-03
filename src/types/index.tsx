// export all your types from this file
// EXAMPLE
// export type { default as MyType } from './myType'


export interface CertificateResult {
    id: string | number;
    filename: string;
    status: "verified" | "fraud" | "unknown";
    confidence?: number;
    uploadedAt?: string | Date;
}


export interface IconProps {
    size?: number | string;
    color?: string;
}

export interface CertificateResult {
    id: string | number;                     // unique id for each result
    filename: string;               // uploaded file name
    uploadedAt?: string | Date;      // upload time
    studentName?: string;
    course?: string;
    yearOfPass?: string | number;
    institution?: string;
    certificateId?: string;

    status: "verified" | "fraud" | "unknown"; // quick status
    finalStatus?: string;            // final consolidated status

    hash?: string;                   // file hash
    confidence?: number;             // detection confidence (0–100)

    validFormat?: boolean | string;
    hasQr?: boolean | string;
    qrContent?: string[];
    logoVerified?: boolean | string;
    layoutVerified?: boolean | string;
    duplicateCheck?: boolean | string;
    hashMatch?: boolean | string;
}