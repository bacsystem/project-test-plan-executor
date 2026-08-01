import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEnterRight({
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
          d="M16 12.5L18.7929 15.2929C19.1834 15.6834 19.1834 16.3166 18.7929 16.7071L16 19.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M18.5 16L9 16C6.79086 16 5 14.2091 5 12L5 5"
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
          d="M15.4697 11.9697C15.7626 11.6768 16.2373 11.6768 16.5302 11.9697L19.3232 14.7626C20.0065 15.446 20.0065 16.5539 19.3232 17.2372L16.5302 20.0302C16.2373 20.3231 15.7626 20.3231 15.4697 20.0302C15.1768 19.7373 15.1768 19.2626 15.4697 18.9697L18.2626 16.1767C18.3602 16.0791 18.3602 15.9208 18.2626 15.8232L15.4697 13.0302C15.1768 12.7373 15.1768 12.2626 15.4697 11.9697Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M5.75 12L5.75 5C5.75 4.58579 5.41421 4.25 5 4.25C4.58579 4.25 4.25 4.58579 4.25 5L4.25 12C4.25 14.6234 6.37665 16.75 9 16.75L18.5 16.75C18.9142 16.75 19.25 16.4142 19.25 16C19.25 15.5858 18.9142 15.25 18.5 15.25L9 15.25C7.20508 15.25 5.75 13.7949 5.75 12Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
