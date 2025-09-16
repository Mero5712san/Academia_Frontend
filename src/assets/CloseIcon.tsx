import type { IconProps } from "../types";

export const CloseIcon = (props: IconProps) => {
    const { size, color } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || "24"}
            height={size || "24"}
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke={color || "#000"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m18 18-6-6m0 0L6 6m6 6 6-6m-6 6-6 6"
            ></path>
        </svg>
    );
};
