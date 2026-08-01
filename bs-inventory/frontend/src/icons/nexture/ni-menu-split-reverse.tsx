import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiMenuSplitReverse({
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
        <path d="M20 5L17 5" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M20 12L17 12" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M20 19L17 19" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M4 5L13 5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M4 12L13 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M3.99981 19L13 19"
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
          d="M17 4.25C16.5858 4.25 16.25 4.58579 16.25 5C16.25 5.38817 16.5449 5.70747 16.9229 5.74609L17 5.75L20 5.75C20.4142 5.75 20.75 5.41421 20.75 5C20.75 4.58579 20.4142 4.25 20 4.25L17 4.25Z"
          fill="currentColor"
        />
        <path
          d="M17 11.25C16.5858 11.25 16.25 11.5858 16.25 12C16.25 12.3882 16.5449 12.7075 16.9229 12.7461L17 12.75L20 12.75C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25L17 11.25Z"
          fill="currentColor"
        />
        <path
          d="M17 18.25C16.5858 18.25 16.25 18.5858 16.25 19C16.25 19.3882 16.5449 19.7075 16.9229 19.7461L17 19.75L20 19.75C20.4142 19.75 20.75 19.4142 20.75 19C20.75 18.5858 20.4142 18.25 20 18.25L17 18.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M4 4.25C3.58579 4.25 3.25 4.58579 3.25 5C3.25 5.41421 3.58579 5.75 4 5.75L13 5.75C13.4142 5.75 13.75 5.41421 13.75 5C13.75 4.58579 13.4142 4.25 13 4.25L4 4.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75L13 12.75C13.4142 12.75 13.75 12.4142 13.75 12C13.75 11.5858 13.4142 11.25 13 11.25L4 11.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M4 18.25C3.58579 18.25 3.25 18.5858 3.25 19C3.25 19.4142 3.58579 19.75 4 19.75L13 19.75C13.4142 19.75 13.75 19.4142 13.75 19C13.75 18.5858 13.4142 18.25 13 18.25L4 18.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
