import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiArrowLeftRight({
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
          d="M8.5 20.5L5.70711 17.7071C5.31658 17.3166 5.31658 16.6834 5.70711 16.2929L8.5 13.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M15.5 10.5L18.2929 7.70711C18.6834 7.31658 18.6834 6.68342 18.2929 6.29289L15.5 3.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M19 17L6 17"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M5 7L18 7"
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
          d="M9.03033 21.0303C8.73744 21.3232 8.26268 21.3232 7.96978 21.0303L5.17681 18.2374C4.4935 17.554 4.4935 16.4461 5.17681 15.7628L7.96978 12.9698C8.26268 12.6769 8.73744 12.6769 9.03033 12.9698C9.32322 13.2627 9.32322 13.7374 9.03033 14.0303L6.23736 16.8233C6.13983 16.9209 6.13983 17.0792 6.23736 17.1768L9.03033 19.9698C9.32322 20.2627 9.32322 20.7374 9.03033 21.0303Z"
          fill="currentColor"
        />
        <path
          d="M14.9697 11.0303C15.2626 11.3232 15.7373 11.3232 16.0302 11.0303L18.8232 8.23736C19.5065 7.55396 19.5065 6.44615 18.8232 5.76275L16.0302 2.96978C15.7373 2.67689 15.2626 2.67689 14.9697 2.96978C14.6768 3.26268 14.6768 3.73744 14.9697 4.03033L17.7626 6.8233C17.8602 6.92091 17.8602 7.0792 17.7626 7.17681L14.9697 9.96978C14.6768 10.2627 14.6768 10.7374 14.9697 11.0303Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M19 17.75L19.0771 17.7461C19.4551 17.7075 19.75 17.3882 19.75 17C19.75 16.5858 19.4142 16.25 19 16.25L6 16.25C5.58579 16.25 5.25 16.5858 5.25 17C5.25 17.4142 5.58579 17.75 6 17.75L19 17.75Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M5 7.75L4.92285 7.74609C4.54488 7.70747 4.25 7.38817 4.25 7C4.25 6.58579 4.58579 6.25 5 6.25L18 6.25C18.4142 6.25 18.75 6.58579 18.75 7C18.75 7.41421 18.4142 7.75 18 7.75L5 7.75Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
