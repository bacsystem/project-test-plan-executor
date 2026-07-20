import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEnterDown({
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
          d="M11.5 16L8.70711 18.7929C8.31658 19.1834 7.68342 19.1834 7.29289 18.7929L4.5 16"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M8 18.5L8 9C8 6.79086 9.79086 5 12 5L19 5"
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
          d="M12.0303 15.4697C12.3232 15.7626 12.3232 16.2373 12.0303 16.5302L9.23736 19.3232C8.55396 20.0065 7.44615 20.0065 6.76275 19.3232L3.96978 16.5302C3.67689 16.2373 3.67689 15.7626 3.96978 15.4697C4.26268 15.1768 4.73744 15.1768 5.03033 15.4697L7.8233 18.2626C7.92091 18.3602 8.0792 18.3602 8.17681 18.2626L10.9698 15.4697C11.2627 15.1768 11.7374 15.1768 12.0303 15.4697Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M12 5.75L19 5.75C19.4142 5.75 19.75 5.41421 19.75 5C19.75 4.58579 19.4142 4.25 19 4.25L12 4.25C9.37665 4.25 7.25 6.37665 7.25 9L7.25 18.5C7.25 18.9142 7.58579 19.25 8 19.25C8.41421 19.25 8.75 18.9142 8.75 18.5L8.75 9C8.75 7.20508 10.2051 5.75 12 5.75Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
