import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiShrinkFull({
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
          d="M4.5 19.5L10.5 13.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M13.5 10.5L19.5 4.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M6 12.9998L9.99998 12.9998C10.5523 12.9998 11 13.4475 11 13.9998L11 17.9998"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M18 10.9999L14 11C13.4477 11 13 10.5523 13 9.99998L13 5.99991"
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
          opacity={oneTone ? 1 : 0.4}
          d="M9.96967 12.9697C10.2626 12.6768 10.7373 12.6768 11.0302 12.9697C11.3231 13.2626 11.3231 13.7373 11.0302 14.0302L5.03022 20.0302C4.73732 20.3231 4.26256 20.3231 3.96967 20.0302C3.67678 19.7373 3.67678 19.2626 3.96967 18.9697L9.96967 12.9697Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M18.9697 3.96967C19.2626 3.67678 19.7373 3.67678 20.0302 3.96967C20.3231 4.26256 20.3231 4.73732 20.0302 5.03022L14.0302 11.0302C13.7373 11.3231 13.2626 11.3231 12.9697 11.0302C12.6768 10.7373 12.6768 10.2626 12.9697 9.96967L18.9697 3.96967Z"
          fill="currentColor"
        />
        <path
          d="M5.2502 12.9999C5.2502 12.5857 5.58591 12.25 6.00012 12.25L10.0004 12.2493C10.9666 12.2494 11.7499 13.033 11.7502 13.9991L11.7502 18.0001C11.75 18.4141 11.4143 18.7499 11.0003 18.75C10.5862 18.75 10.2505 18.4141 10.2504 18.0001L10.2497 13.9998C10.2497 13.8617 10.1378 13.7498 9.9997 13.7498L6.00012 13.7498L5.92347 13.7464C5.5453 13.708 5.25028 13.3882 5.2502 12.9999Z"
          fill="currentColor"
        />
        <path
          d="M18.7498 10.9999C18.7497 11.3882 18.4547 11.708 18.0765 11.7464L17.9999 11.7498L14.0003 11.7498C13.0338 11.7498 12.2498 10.9658 12.2498 9.99931L12.2498 5.99973C12.2498 5.5856 12.5856 5.2499 12.9997 5.24982C13.4139 5.24982 13.7496 5.58555 13.7496 5.99973L13.7503 10C13.7504 10.138 13.8623 10.25 14.0003 10.25L17.9999 10.25C18.4141 10.25 18.7498 10.5857 18.7498 10.9999Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
