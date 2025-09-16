import type { IconProps } from "../types";

export const PendingIcon = (props: IconProps) => {
    const { size, color } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || "24"}
            height={size || "24"}
            viewBox="200 250 700 512"
        >
            <path
                fill={color || "#0F1F3C"}
                d="M511.9 183c-181.8 0-329.1 147.4-329.1 329.1s147.4 329.1 329.1 329.1c181.8 0 329.1-147.4 329.1-329.1S693.6 183 511.9 183m0 585.2c-141.2 0-256-114.8-256-256s114.8-256 256-256 256 114.8 256 256-114.9 256-256 256"
            ></path>
            <path
                fill={color || "#0F1F3C"}
                d="M548.6 365.7h-73.2v161.4l120.5 120.5 51.7-51.7-99-99z"
            ></path>
        </svg>
    );
};
