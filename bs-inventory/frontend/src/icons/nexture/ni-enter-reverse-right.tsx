import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEnterReverseRight({
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
          d="M16 11.5L18.7929 8.70711C19.1834 8.31658 19.1834 7.68342 18.7929 7.29289L16 4.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M18.5 8L9 8C6.79086 7.99999 5 9.79086 5 12L5 19"
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
          d="M15.4697 12.0303C15.7626 12.3232 16.2373 12.3232 16.5302 12.0303L19.3232 9.23736C20.0065 8.55396 20.0065 7.44615 19.3232 6.76275L16.5302 3.96978C16.2373 3.67689 15.7626 3.67689 15.4697 3.96978C15.1768 4.26268 15.1768 4.73744 15.4697 5.03033L18.2626 7.8233C18.3602 7.92091 18.3602 8.0792 18.2626 8.17681L15.4697 10.9698C15.1768 11.2627 15.1768 11.7374 15.4697 12.0303Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M5.75 12L5.75 19C5.75 19.4142 5.41421 19.75 5 19.75C4.58579 19.75 4.25 19.4142 4.25 19L4.25 12C4.25 9.37665 6.37665 7.25 9 7.25L18.5 7.25C18.9142 7.25 19.25 7.58579 19.25 8C19.25 8.41421 18.9142 8.75 18.5 8.75L9 8.75C7.20508 8.75 5.75 10.2051 5.75 12Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
