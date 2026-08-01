import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiMenuSplit({
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
        <path d="M4 5L7 5" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M4 12L7 12" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M4 19L7 19" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20 5L11 5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20 12L11 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20 19L11 19"
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
          d="M7 4.25C7.41421 4.25 7.75 4.58579 7.75 5C7.75 5.38817 7.45512 5.70747 7.07715 5.74609L7 5.75L4 5.75C3.58579 5.75 3.25 5.41421 3.25 5C3.25 4.58579 3.58579 4.25 4 4.25L7 4.25Z"
          fill="currentColor"
        />
        <path
          d="M7 11.25C7.41421 11.25 7.75 11.5858 7.75 12C7.75 12.3882 7.45512 12.7075 7.07715 12.7461L7 12.75L4 12.75C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25L7 11.25Z"
          fill="currentColor"
        />
        <path
          d="M7 18.25C7.41421 18.25 7.75 18.5858 7.75 19C7.75 19.3882 7.45512 19.7075 7.07715 19.7461L7 19.75L4 19.75C3.58579 19.75 3.25 19.4142 3.25 19C3.25 18.5858 3.58579 18.25 4 18.25L7 18.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M20 4.25C20.4142 4.25 20.75 4.58579 20.75 5C20.75 5.41421 20.4142 5.75 20 5.75L11 5.75C10.5858 5.75 10.25 5.41421 10.25 5C10.25 4.58579 10.5858 4.25 11 4.25L20 4.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M20 11.25C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75L11 12.75C10.5858 12.75 10.25 12.4142 10.25 12C10.25 11.5858 10.5858 11.25 11 11.25L20 11.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M20 18.25C20.4142 18.25 20.75 18.5858 20.75 19C20.75 19.4142 20.4142 19.75 20 19.75L11 19.75C10.5858 19.75 10.25 19.4142 10.25 19C10.25 18.5858 10.5858 18.25 11 18.25L20 18.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
