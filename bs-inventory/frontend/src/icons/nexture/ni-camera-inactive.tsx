import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCameraInactive({
  className,
  variant = "outlined",
  size = "medium",
  oneTone = false,
}: NextureIconsProps) {
  const iconSize = sizeHelper(size);
  const iconStrokeWidth = strokeSizeHelper(iconSize);

  if (variant === "outlined") {
    return (
      <svg
        width={iconSize}
        height={iconSize}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.1499 5.44998C15.4347 5.77639 17.2578 7.54689 17.6373 9.82355C17.8774 11.2646 17.8774 12.7354 17.6373 14.1765C17.2578 16.4531 15.4347 18.2236 13.1499 18.55C11.0675 18.8475 8.93249 18.8475 6.85015 18.55C4.56529 18.2236 2.74218 16.4531 2.36274 14.1765C2.12257 12.7354 2.12257 11.2646 2.36274 9.82355C2.74218 7.54689 4.56528 5.77639 6.85014 5.44998C8.93249 5.1525 11.0675 5.1525 13.1499 5.44998Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M18 9L20.3778 8.32064C20.9676 8.15212 21.5687 8.54946 21.6448 9.15813L21.7829 10.2635C21.9271 11.4167 21.9271 12.5833 21.7829 13.7365L21.6448 14.8419C21.5687 15.4505 20.9676 15.8479 20.3778 15.6794L18 15"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M13 10L12 10"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M3 21L9.875 14.125L14.1719 9.82812L21 3"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
      </svg>
    );
  } else {
    return (
      <svg
        width={iconSize}
        height={iconSize}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M20.1719 7.59917C21.2037 7.30461 22.2553 8.00026 22.3887 9.06499L22.5273 10.1705C22.6791 11.3849 22.6791 12.6142 22.5273 13.8287L22.3887 14.9341C22.2555 15.9992 21.204 16.6947 20.1719 16.4L19.3887 16.1763C19.6017 15.6599 19.7617 15.1148 19.8564 14.5464C20.1373 12.861 20.1373 11.1382 19.8564 9.45269C19.7616 8.88401 19.6019 8.33855 19.3887 7.82183L20.1719 7.59917Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M20.4699 2.46952L20.5266 2.41842C20.8211 2.17796 21.2559 2.19486 21.5306 2.46952C21.8053 2.74418 21.8222 3.17897 21.5817 3.47356L21.5306 3.53018L3.53044 21.5303C3.23755 21.8232 2.76268 21.8232 2.46978 21.5303C2.17689 21.2374 2.17689 20.7626 2.46978 20.4697L20.4699 2.46952Z"
          fill="currentColor"
        />
        <path
          d="M17.5506 7.51086C17.9583 8.16628 18.2443 8.9062 18.3768 9.70031C18.6305 11.2226 18.6304 12.7776 18.3768 14.2999C17.9431 16.9009 15.8618 18.9197 13.2557 19.2921C11.1032 19.5996 8.89648 19.5996 6.74396 19.2921C6.47003 19.253 6.20225 19.1945 5.94122 19.1202L17.5506 7.51086Z"
          fill="currentColor"
        />
        <path
          d="M6.74396 4.70715C8.89637 4.39969 11.1033 4.39971 13.2557 4.70715C14.0207 4.81646 14.7404 5.06841 15.3865 5.43469L3.28009 17.5411C2.42797 16.6763 1.83238 15.5566 1.62286 14.2999C1.36923 12.7776 1.36917 11.2226 1.62286 9.70031C2.05667 7.09956 4.13801 5.07954 6.74396 4.70715Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
