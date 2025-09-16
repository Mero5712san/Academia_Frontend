import type { IconProps } from "../types";

export const RecentIcon = (props: IconProps) => {
    const { size, color } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || "24"}
            height={size || "24"}
            viewBox="0 0 24 24"
            fill="none"
        >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
                fill={color || "#141124"}
                d="M9.682 18.75a.75.75 0 0 1 .75-.75 8.25 8.25 0 1 0-6.189-2.795v-2.637a.75.75 0 0 1 1.5 0v4.243a.75.75 0 0 1-.751.75H.75a.75.75 0 0 1 0-1.5H3a9.75 9.75 0 1 1 7.433 3.44.75.75 0 0 1-.751-.751m2.875-4.814L9.9 11.281a.75.75 0 0 1-.22-.531v-5.2a.75.75 0 1 1 1.5 0v4.889l2.436 2.436a.75.75 0 1 1-1.061 1.06Z"
                transform="translate(1.568 2.25)"
            />
        </svg>
    );
};
