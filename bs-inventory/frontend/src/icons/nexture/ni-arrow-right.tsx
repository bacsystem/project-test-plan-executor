import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiArrowRight({
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
          d="M15.5 8.5L18.2929 11.2929C18.6834 11.6834 18.6834 12.3166 18.2929 12.7071L15.5 15.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M5 12L18 12"
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
          d="M14.9697 7.96967C15.2626 7.67678 15.7373 7.67678 16.0302 7.96967L18.8232 10.7626C19.5065 11.446 19.5065 12.5539 18.8232 13.2372L16.0302 16.0302C15.7373 16.3231 15.2626 16.3231 14.9697 16.0302C14.6768 15.7373 14.6768 15.2626 14.9697 14.9697L17.7626 12.1767C17.8602 12.0791 17.8602 11.9208 17.7626 11.8232L14.9697 9.03022C14.6768 8.73732 14.6768 8.26256 14.9697 7.96967Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M5 11.25L4.92285 11.2539C4.54488 11.2925 4.25 11.6118 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75L18 12.75C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25L5 11.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
