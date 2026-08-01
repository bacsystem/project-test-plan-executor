import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiMenuRight({
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
          d="M10 12L20 12M20 12L17.5 9.5M20 12L17.5 14.5"
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
          d="M18.0303 8.96967C17.7374 8.67678 17.2627 8.67678 16.9698 8.96967C16.6769 9.26256 16.6769 9.73732 16.9698 10.0302L18.1895 11.2499L10.0001 11.2499C9.58584 11.2499 9.25006 11.5857 9.25006 11.9999C9.25006 12.4142 9.58584 12.7499 10.0001 12.7499L18.1895 12.7499L16.9698 13.9697L16.918 14.0263C16.6777 14.3209 16.6952 14.7556 16.9698 15.0302C17.2444 15.3048 17.6791 15.3223 17.9737 15.082L18.0303 15.0302L20.5303 12.5302C20.8232 12.2373 20.8232 11.7626 20.5303 11.4697L18.0303 8.96967Z"
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
