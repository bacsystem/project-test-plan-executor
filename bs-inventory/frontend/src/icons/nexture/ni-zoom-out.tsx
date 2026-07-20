import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiZoomOut({
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
          d="M9 11.5H14"
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
          d="M11.5 1.25C17.1609 1.25 21.75 5.83908 21.75 11.5C21.75 17.1609 17.1609 21.75 11.5 21.75C5.83908 21.75 1.25 17.1609 1.25 11.5C1.25 5.83908 5.83908 1.25 11.5 1.25ZM9 10.75C8.58579 10.75 8.25 11.0858 8.25 11.5C8.25 11.9142 8.58579 12.25 9 12.25H14C14.4142 12.25 14.75 11.9142 14.75 11.5C14.75 11.0858 14.4142 10.75 14 10.75H9Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M14 10.75C14.4142 10.75 14.75 11.0858 14.75 11.5C14.75 11.9142 14.4142 12.25 14 12.25H9.00001C8.58579 12.25 8.25001 11.9142 8.25 11.5C8.25 11.0858 8.58579 10.75 9 10.75H14Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
