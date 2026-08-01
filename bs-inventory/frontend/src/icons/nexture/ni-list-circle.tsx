import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiListCircle({
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
          d="M22 7L12 7"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M22 17L12 17"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M8 17C8 18.6569 6.65685 20 5 20C3.34315 20 2 18.6569 2 17C2 15.3431 3.34315 14 5 14C6.65685 14 8 15.3431 8 17Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          d="M8 7C8 8.65685 6.65685 10 5 10C3.34315 10 2 8.65685 2 7C2 5.34315 3.34315 4 5 4C6.65685 4 8 5.34315 8 7Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
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
          d="M22 6.25C22.4142 6.25 22.75 6.58579 22.75 7C22.75 7.41421 22.4142 7.75 22 7.75L12 7.75C11.5858 7.75 11.25 7.41421 11.25 7C11.25 6.58579 11.5858 6.25 12 6.25L22 6.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M22 16.25C22.4142 16.25 22.75 16.5858 22.75 17C22.75 17.4142 22.4142 17.75 22 17.75L12 17.75C11.5858 17.75 11.25 17.4142 11.25 17C11.25 16.5858 11.5858 16.25 12 16.25L22 16.25Z"
          fill="currentColor"
        />
        <path
          d="M7.25 17C7.25 15.7574 6.24264 14.75 5 14.75C3.75736 14.75 2.75 15.7574 2.75 17C2.75 18.2426 3.75736 19.25 5 19.25C6.24264 19.25 7.25 18.2426 7.25 17ZM8.75 17C8.75 19.0711 7.07107 20.75 5 20.75C2.92893 20.75 1.25 19.0711 1.25 17C1.25 14.9289 2.92893 13.25 5 13.25C7.07107 13.25 8.75 14.9289 8.75 17Z"
          fill="currentColor"
        />
        <path
          d="M7.25 7C7.25 5.75736 6.24264 4.75 5 4.75C3.75736 4.75 2.75 5.75736 2.75 7C2.75 8.24264 3.75736 9.25 5 9.25C6.24264 9.25 7.25 8.24264 7.25 7ZM8.75 7C8.75 9.07107 7.07107 10.75 5 10.75C2.92893 10.75 1.25 9.07107 1.25 7C1.25 4.92893 2.92893 3.25 5 3.25C7.07107 3.25 8.75 4.92893 8.75 7Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
