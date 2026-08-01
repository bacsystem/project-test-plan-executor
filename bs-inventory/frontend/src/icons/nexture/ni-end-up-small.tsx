import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEndUpSmall({
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
          opacity={oneTone ? 1 : 0.6}
          d="M16 15.5L13.0607 12.5607C12.4749 11.9749 11.5251 11.9749 10.9393 12.5607L8 15.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path d="M16 8.5L12 8.5L8 8.5" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
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
          d="M16.5303 16.0303C16.8232 15.7374 16.8232 15.2627 16.5303 14.9698L13.5909 12.0303C12.7122 11.1518 11.2879 11.1518 10.4092 12.0303L7.46978 14.9698C7.17689 15.2627 7.17689 15.7374 7.46978 16.0303C7.76268 16.3232 8.23744 16.3232 8.53033 16.0303L11.4698 13.0909C11.7626 12.7981 12.2375 12.7981 12.5303 13.0909L15.4698 16.0303C15.7627 16.3232 16.2374 16.3232 16.5303 16.0303Z"
          fill="currentColor"
        />
        <path
          d="M8 9.25L16 9.25C16.4142 9.25 16.75 8.91421 16.75 8.5C16.75 8.08579 16.4142 7.75 16 7.75L8 7.75C7.58579 7.75 7.25 8.08579 7.25 8.5C7.25 8.91421 7.58579 9.25 8 9.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
