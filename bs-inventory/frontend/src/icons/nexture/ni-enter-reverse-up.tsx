import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEnterReverseUp({
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
          d="M11.5 8L8.70711 5.20711C8.31658 4.81658 7.68342 4.81658 7.29289 5.20711L4.5 8"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M8 5.5L8 15C8 17.2091 9.79086 19 12 19L19 19"
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
          d="M12.0303 8.53033C12.3232 8.23744 12.3232 7.76268 12.0303 7.46978L9.23736 4.67681C8.55396 3.9935 7.44615 3.9935 6.76275 4.67681L3.96978 7.46978C3.67689 7.76268 3.67689 8.23744 3.96978 8.53033C4.26268 8.82322 4.73744 8.82322 5.03033 8.53033L7.8233 5.73736C7.92091 5.63983 8.0792 5.63983 8.17681 5.73736L10.9698 8.53033C11.2627 8.82322 11.7374 8.82322 12.0303 8.53033Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M12 18.25L19 18.25C19.4142 18.25 19.75 18.5858 19.75 19C19.75 19.4142 19.4142 19.75 19 19.75L12 19.75C9.37665 19.75 7.25 17.6234 7.25 15L7.25 5.5C7.25 5.08579 7.58579 4.75 8 4.75C8.41421 4.75 8.75 5.08579 8.75 5.5L8.75 15C8.75 16.7949 10.2051 18.25 12 18.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
