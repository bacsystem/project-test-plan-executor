import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiZoomIn({
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
          d="M22 22L18.5 18.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth={iconStrokeWidth} />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9 11.4999H14M11.5004 8.99957L11.5004 13.9996"
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
          d="M19.0303 17.9697C18.7374 17.6768 18.2627 17.6768 17.9698 17.9697C17.6769 18.2626 17.6769 18.7373 17.9698 19.0302L21.4698 22.5302C21.7627 22.8231 22.2374 22.8231 22.5303 22.5302C22.8232 22.2373 22.8232 21.7626 22.5303 21.4697L19.0303 17.9697Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.5 1.25C17.1609 1.25 21.75 5.83908 21.75 11.5C21.75 17.1609 17.1609 21.75 11.5 21.75C5.83908 21.75 1.25 17.1609 1.25 11.5C1.25 5.83908 5.83908 1.25 11.5 1.25ZM11.5 8.25C11.086 8.25019 10.75 8.58593 10.75 9V10.75H9C8.58591 10.75 8.2502 11.086 8.25 11.5C8.25027 11.914 8.58596 12.25 9 12.25H10.75V14C10.7503 14.4139 11.0861 14.7498 11.5 14.75C11.9141 14.75 12.2497 14.414 12.25 14V12.25H14L14.0771 12.2461C14.4549 12.2075 14.7498 11.8879 14.75 11.5C14.7498 11.112 14.455 10.7925 14.0771 10.7539L14 10.75H12.25V9C12.25 8.58581 11.9142 8.25 11.5 8.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M10.75 13.9995L10.75 12.2495H9.00002C8.58581 12.2495 8.25002 11.9137 8.25002 11.4995C8.25021 11.0855 8.58592 10.7495 9.00001 10.7495H10.75L10.75 8.99951C10.75 8.58544 11.086 8.2497 11.5 8.24951C11.9142 8.24951 12.25 8.58533 12.25 8.99951L12.25 10.7495H14L14.0772 10.7534C14.455 10.792 14.7498 11.1115 14.75 11.4995C14.75 11.8877 14.4551 12.207 14.0772 12.2456L14 12.2495H12.25L12.25 13.9995C12.25 14.4137 11.9142 14.7495 11.5 14.7495C11.086 14.7493 10.75 14.4136 10.75 13.9995Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
