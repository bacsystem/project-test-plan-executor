import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiMenuLeft({
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
        <path d="M4 5L6 5" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M4 12L6 12" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M4 19L6 19" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20 5L10 5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20 12L10 12M10 12L12.5 9.5M10 12L12.5 14.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20 19L10 19"
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
          d="M6 4.25C6.41421 4.25 6.75 4.58579 6.75 5C6.75 5.41421 6.41421 5.75 6 5.75L4 5.75C3.58579 5.75 3.25 5.41421 3.25 5C3.25 4.58579 3.58579 4.25 4 4.25L6 4.25Z"
          fill="currentColor"
        />
        <path
          d="M6 11.25C6.41421 11.25 6.75 11.5858 6.75 12C6.75 12.4142 6.41421 12.75 6 12.75L4 12.75C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25L6 11.25Z"
          fill="currentColor"
        />
        <path
          d="M6 18.25C6.41421 18.25 6.75 18.5858 6.75 19C6.75 19.4142 6.41421 19.75 6 19.75L4 19.75C3.58579 19.75 3.25 19.4142 3.25 19C3.25 18.5858 3.58579 18.25 4 18.25L6 18.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M20 4.25L20.0771 4.25391C20.4551 4.29253 20.75 4.61183 20.75 5C20.75 5.41421 20.4142 5.75 20 5.75L10 5.75C9.58579 5.75 9.25 5.41421 9.25 5C9.25 4.58579 9.58579 4.25 10 4.25L20 4.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11.9697 8.96967C12.2626 8.67678 12.7373 8.67678 13.0302 8.96967C13.3231 9.26256 13.3231 9.73732 13.0302 10.0302L11.8105 11.2499L19.9999 11.2499C20.4142 11.2499 20.7499 11.5857 20.7499 11.9999C20.7499 12.4142 20.4142 12.7499 19.9999 12.7499L11.8105 12.7499L13.0302 13.9697L13.082 14.0263C13.3223 14.3209 13.3048 14.7556 13.0302 15.0302C12.7556 15.3048 12.3209 15.3223 12.0263 15.082L11.9697 15.0302L9.46967 12.5302C9.17678 12.2373 9.17678 11.7626 9.46967 11.4697L11.9697 8.96967Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M20 18.25L20.0771 18.2539C20.4551 18.2925 20.75 18.6118 20.75 19C20.75 19.4142 20.4142 19.75 20 19.75L10 19.75C9.58579 19.75 9.25 19.4142 9.25 19C9.25 18.5858 9.58579 18.25 10 18.25L20 18.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
