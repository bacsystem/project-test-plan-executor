import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiArrowLeft({
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
          d="M8.5 8.5L5.70711 11.2929C5.31658 11.6834 5.31658 12.3166 5.70711 12.7071L8.5 15.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M19 12L6 12"
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
          d="M9.03033 7.96967C8.73744 7.67678 8.26268 7.67678 7.96978 7.96967L5.17681 10.7626C4.4935 11.446 4.4935 12.5539 5.17681 13.2372L7.96978 16.0302C8.26268 16.3231 8.73744 16.3231 9.03033 16.0302C9.32322 15.7373 9.32322 15.2626 9.03033 14.9697L6.23736 12.1767C6.13983 12.0791 6.13983 11.9208 6.23736 11.8232L9.03033 9.03022C9.32322 8.73732 9.32322 8.26256 9.03033 7.96967Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M19 11.25L19.0771 11.2539C19.4551 11.2925 19.75 11.6118 19.75 12C19.75 12.4142 19.4142 12.75 19 12.75L6 12.75C5.58579 12.75 5.25 12.4142 5.25 12C5.25 11.5858 5.58579 11.25 6 11.25L19 11.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
