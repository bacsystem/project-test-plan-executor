import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEuro({
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
          d="M17 7.42857V7.42857C17 5.53502 15.465 4 13.5714 4L11 4C8.79087 4 7 5.79086 7 8L7 11.9999L7 16C7 18.2091 8.79086 20 11 20L13.5714 20C15.465 20 17 18.465 17 16.5714V16.5714"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M4 10.5L12 10.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M4 13.5H10"
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
          d="M11 3.25L13.5713 3.25C15.8791 3.25 17.75 5.12095 17.75 7.42871C17.7499 7.84286 17.4142 8.17871 17 8.17871C16.5858 8.17871 16.2501 7.84286 16.25 7.42871C16.25 5.94938 15.0506 4.75 13.5713 4.75L11 4.75C9.20508 4.75 7.75 6.20508 7.75 8L7.75 16C7.75 17.7949 9.20508 19.25 11 19.25L13.5713 19.25C15.0506 19.25 16.25 18.0506 16.25 16.5713C16.2501 16.1571 16.5858 15.8213 17 15.8213C17.4142 15.8213 17.7499 16.1571 17.75 16.5713L17.7441 16.7861C17.6324 18.9941 15.807 20.75 13.5713 20.75L11 20.75C8.37665 20.75 6.25 18.6233 6.25 16L6.25 8C6.25 5.37665 8.37665 3.25 11 3.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M4 11.25C3.58579 11.25 3.25 10.9142 3.25 10.5C3.25 10.0858 3.58579 9.75 4 9.75L12 9.75C12.4142 9.75 12.75 10.0858 12.75 10.5C12.75 10.9142 12.4142 11.25 12 11.25L4 11.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M4 14.25C3.58579 14.25 3.25 13.9142 3.25 13.5C3.25 13.0858 3.58579 12.75 4 12.75H10C10.4142 12.75 10.75 13.0858 10.75 13.5C10.75 13.9142 10.4142 14.25 10 14.25H4Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
