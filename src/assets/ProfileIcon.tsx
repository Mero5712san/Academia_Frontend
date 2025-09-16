import type { IconProps } from "../types";

export const ProfileIcon = (props: IconProps) => {
    const { size, color } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || "24"}
            height={size || "24"}
            fill="none"
            viewBox="0 0 16 16"
        >
            <path
                fill={color || "#000"}
                d="M8 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6M14 12a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v3h12z"
            ></path>
        </svg>
    );
};
