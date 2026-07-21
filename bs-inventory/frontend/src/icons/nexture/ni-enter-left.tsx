import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEnterLeft({
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
          d="M8 11.5L5.20711 8.70711C4.81658 8.31658 4.81658 7.68342 5.20711 7.29289L8 4.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M5.5 8L15 8C17.2091 7.99999 19 9.79086 19 12L19 19"
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
          d="M8.53033 12.0303C8.23744 12.3232 7.76268 12.3232 7.46978 12.0303L4.67681 9.23736C3.9935 8.55396 3.9935 7.44615 4.67681 6.76275L7.46978 3.96978C7.76268 3.67689 8.23744 3.67689 8.53033 3.96978C8.82322 4.26268 8.82322 4.73744 8.53033 5.03033L5.73736 7.8233C5.63983 7.92091 5.63983 8.0792 5.73736 8.17681L8.53033 10.9698C8.82322 11.2627 8.82322 11.7374 8.53033 12.0303Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M18.25 12L18.25 19C18.25 19.4142 18.5858 19.75 19 19.75C19.4142 19.75 19.75 19.4142 19.75 19L19.75 12C19.75 9.37665 17.6233 7.25 15 7.25L5.5 7.25C5.08578 7.25 4.75 7.58579 4.75 8C4.75 8.41421 5.08579 8.75 5.5 8.75L15 8.75C16.7949 8.75 18.25 10.2051 18.25 12Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
