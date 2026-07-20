import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPound({
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
          opacity={oneTone ? 1 : 0.6}
          d="M6 12H12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M18 20V20C14.0274 20.6621 9.9726 20.6621 6 20V20M9 20L9 11.9999L9 7.99999C9 5.79086 10.7909 4 13 4L13.5714 4C15.465 4 17 5.53502 17 7.42857"
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
          d="M6 12.75C5.58579 12.75 5.25 12.4142 5.25 12C5.25 11.5858 5.58579 11.25 6 11.25H12C12.4142 11.25 12.75 11.5858 12.75 12C12.75 12.4142 12.4142 12.75 12 12.75H6Z"
          fill="currentColor"
        />
        <path
          d="M18.7402 19.877C18.8039 20.2599 18.5649 20.6236 18.1982 20.7236L18.123 20.7402L17.3623 20.8584C13.5523 21.4127 9.67774 21.3737 5.87695 20.7402C5.46848 20.6722 5.19186 20.2854 5.25976 19.877C5.32784 19.4685 5.71458 19.1919 6.12304 19.2598C6.82959 19.3775 7.5391 19.4738 8.24999 19.5488L8.25 8C8.25 5.37665 10.3766 3.25 13 3.25L13.5713 3.25C15.879 3.25 17.75 5.12095 17.75 7.42871C17.7499 7.84286 17.4142 8.17871 17 8.17871C16.5858 8.17871 16.2501 7.84286 16.25 7.42871C16.25 5.94938 15.0506 4.75 13.5713 4.75L13 4.75C11.2051 4.75 9.75 6.20508 9.75 8L9.74999 19.6748C12.4619 19.8458 15.1888 19.7078 17.8769 19.2598C18.2854 19.1919 18.6722 19.4685 18.7402 19.877Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
