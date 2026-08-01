import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiArrowDownLeft({
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
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 17L8.00002 17.0001C7.44773 17.0001 7 16.5524 7 16.0001L7 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M17 7.0498L7.80762 16.2422"
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
          d="M12.7499 17C12.7499 17.4142 12.4142 17.7499 12 17.7499L8.0004 17.7499C7.0339 17.7499 6.25061 16.9666 6.25059 16.0001L6.2499 11.9998C6.24998 11.5858 6.58573 11.25 6.99982 11.2499C7.41398 11.2499 7.74965 11.5857 7.74974 11.9998L7.75043 16.0001C7.75045 16.1382 7.86234 16.2501 8.0004 16.2501L12 16.2501C12.4142 16.2501 12.7499 16.5858 12.7499 17Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M17.5303 7.58002L17.5821 7.5227C17.8221 7.22813 17.8048 6.79383 17.5303 6.51936C17.2374 6.22646 16.7626 6.22646 16.4697 6.51936L7.27729 15.7117C6.98439 16.0046 6.98439 16.4795 7.27729 16.7724C7.57018 17.0653 8.04505 17.0653 8.33795 16.7724L17.5303 7.58002Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
