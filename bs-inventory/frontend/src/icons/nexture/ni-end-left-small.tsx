import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEndLeftSmall({
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
          d="M15.5 8L12.5607 10.9393C11.9749 11.5251 11.9749 12.4749 12.5607 13.0607L15.5 16"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path d="M8.5 8L8.5 12L8.5 16" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
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
          d="M16.0303 7.46967C15.7374 7.17678 15.2627 7.17678 14.9698 7.46967L12.0303 10.4091C11.1518 11.2878 11.1518 12.7121 12.0303 13.5908L14.9698 16.5302C15.2627 16.8231 15.7374 16.8231 16.0303 16.5302C16.3232 16.2373 16.3232 15.7626 16.0303 15.4697L13.0909 12.5302C12.7981 12.2374 12.7981 11.7625 13.0909 11.4697L16.0303 8.53022C16.3232 8.23732 16.3232 7.76256 16.0303 7.46967Z"
          fill="currentColor"
        />
        <path
          d="M9.25 16L9.25 8C9.25 7.58579 8.91421 7.25 8.5 7.25C8.08579 7.25 7.75 7.58579 7.75 8L7.75 16C7.75 16.4142 8.08579 16.75 8.5 16.75C8.91421 16.75 9.25 16.4142 9.25 16Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
