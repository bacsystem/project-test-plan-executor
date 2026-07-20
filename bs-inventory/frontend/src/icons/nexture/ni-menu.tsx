import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiMenu({
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
          d="M20 5L4 5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          opacity={oneTone ? 1 : 0.6}
        />
        <path
          d="M20 12L4 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          opacity={oneTone ? 1 : 0.6}
        />
        <path
          d="M20 19L4 19"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          opacity={oneTone ? 1 : 0.6}
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
          d="M20 4.25C20.4142 4.25 20.75 4.58579 20.75 5C20.75 5.41421 20.4142 5.75 20 5.75L4 5.75C3.58579 5.75 3.25 5.41421 3.25 5C3.25 4.58579 3.58579 4.25 4 4.25L20 4.25Z"
          fill="currentColor"
        />
        <path
          d="M20 11.25C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75L4 12.75C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25L20 11.25Z"
          fill="currentColor"
        />
        <path
          d="M20 18.25C20.4142 18.25 20.75 18.5858 20.75 19C20.75 19.4142 20.4142 19.75 20 19.75L4 19.75C3.58579 19.75 3.25 19.4142 3.25 19C3.25 18.5858 3.58579 18.25 4 18.25L20 18.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
