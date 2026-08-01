import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiFaceNeutral({
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
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={iconStrokeWidth} />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M8.5 15L12 15L15.5 15"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9 10L9 9"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M15 10L15 9"
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25ZM8.5 14.25C8.08579 14.25 7.75 14.5858 7.75 15C7.75 15.4142 8.08579 15.75 8.5 15.75H15.5C15.9142 15.75 16.25 15.4142 16.25 15C16.25 14.5858 15.9142 14.25 15.5 14.25H8.5ZM9 8.25C8.58579 8.25 8.25 8.58579 8.25 9V10C8.25 10.4142 8.58579 10.75 9 10.75C9.41421 10.75 9.75 10.4142 9.75 10V9C9.75 8.58579 9.41421 8.25 9 8.25ZM15 8.25C14.5858 8.25 14.25 8.58579 14.25 9V10C14.25 10.4142 14.5858 10.75 15 10.75C15.4142 10.75 15.75 10.4142 15.75 10V9C15.75 8.58579 15.4142 8.25 15 8.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M15.5 14.25C15.9142 14.25 16.25 14.5858 16.25 15C16.25 15.4142 15.9142 15.75 15.5 15.75H8.5C8.08579 15.75 7.75 15.4142 7.75 15C7.75 14.5858 8.08579 14.25 8.5 14.25H15.5Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M9 8.25C9.41421 8.25 9.75 8.58579 9.75 9V10C9.75 10.4142 9.41421 10.75 9 10.75C8.58579 10.75 8.25 10.4142 8.25 10V9C8.25 8.58579 8.58579 8.25 9 8.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M15 8.25C15.4142 8.25 15.75 8.58579 15.75 9V10C15.75 10.4142 15.4142 10.75 15 10.75C14.5858 10.75 14.25 10.4142 14.25 10V9C14.25 8.58579 14.5858 8.25 15 8.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
