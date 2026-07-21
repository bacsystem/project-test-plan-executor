import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiDollar({
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
          d="M17 8V8C17 5.79086 15.2091 4 13 4L11 4C8.79086 4 7 5.79086 7 8V8C7 10.2091 8.79086 12 11 12L13 12C15.2091 12 17 13.7909 17 16V16C17 18.2091 15.2091 20 13 20L11 20C8.79086 20 7 18.2091 7 16V16"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 21.5L12 2.5"
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
          d="M11 19.25L13 19.25C14.7949 19.25 16.25 17.7949 16.25 16C16.25 14.2051 14.7949 12.75 13 12.75L11 12.75C8.37665 12.75 6.25 10.6234 6.25 8C6.25 5.37665 8.37665 3.25 11 3.25L13 3.25C15.6234 3.25 17.75 5.37665 17.75 8C17.75 8.41421 17.4142 8.75 17 8.75C16.5858 8.75 16.25 8.41421 16.25 8C16.25 6.20507 14.7949 4.75 13 4.75L11 4.75C9.20507 4.75 7.75 6.20507 7.75 8C7.75 9.79492 9.20507 11.25 11 11.25L13 11.25C15.6234 11.25 17.75 13.3766 17.75 16C17.75 18.6234 15.6234 20.75 13 20.75L11 20.75C8.37665 20.75 6.25 18.6234 6.25 16C6.25 15.5858 6.58579 15.25 7 15.25C7.41421 15.25 7.75 15.5858 7.75 16C7.75 17.7949 9.20507 19.25 11 19.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M12.75 21.5L12.7461 21.5771C12.7075 21.9551 12.3882 22.25 12 22.25C11.5858 22.25 11.25 21.9142 11.25 21.5L11.25 2.5C11.25 2.08579 11.5858 1.75 12 1.75C12.4142 1.75 12.75 2.08579 12.75 2.5L12.75 21.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
