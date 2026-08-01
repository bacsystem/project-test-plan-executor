import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiTextRight({
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
        <path d="M20 6L4 6" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20 12L12 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path d="M20 18L8 18" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
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
          d="M4 5.25C3.58579 5.25 3.25 5.58579 3.25 6C3.25 6.41421 3.58579 6.75 4 6.75L20 6.75C20.4142 6.75 20.75 6.41421 20.75 6C20.75 5.58579 20.4142 5.25 20 5.25L4 5.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M12 11.25C11.5858 11.25 11.25 11.5858 11.25 12C11.25 12.4142 11.5858 12.75 12 12.75L20 12.75C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25L12 11.25Z"
          fill="currentColor"
        />
        <path
          d="M8 17.25C7.58579 17.25 7.25 17.5858 7.25 18C7.25 18.4142 7.58579 18.75 8 18.75L20 18.75C20.4142 18.75 20.75 18.4142 20.75 18C20.75 17.5858 20.4142 17.25 20 17.25L8 17.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
