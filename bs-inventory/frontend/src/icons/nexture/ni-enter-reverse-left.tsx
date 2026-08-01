import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEnterReverseLeft({
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
          d="M8 12.5L5.20711 15.2929C4.81658 15.6834 4.81658 16.3166 5.20711 16.7071L8 19.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M5.5 16L15 16C17.2091 16 19 14.2091 19 12L19 5"
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
          d="M8.53033 11.9697C8.23744 11.6768 7.76268 11.6768 7.46978 11.9697L4.67681 14.7626C3.9935 15.446 3.9935 16.5539 4.67681 17.2372L7.46978 20.0302C7.76268 20.3231 8.23744 20.3231 8.53033 20.0302C8.82322 19.7373 8.82322 19.2626 8.53033 18.9697L5.73736 16.1767C5.63983 16.0791 5.63983 15.9208 5.73736 15.8232L8.53033 13.0302C8.82322 12.7373 8.82322 12.2626 8.53033 11.9697Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M18.25 12L18.25 5C18.25 4.58579 18.5858 4.25 19 4.25C19.4142 4.25 19.75 4.58579 19.75 5L19.75 12C19.75 14.6234 17.6234 16.75 15 16.75L5.5 16.75C5.08579 16.75 4.75 16.4142 4.75 16C4.75 15.5858 5.08579 15.25 5.5 15.25L15 15.25C16.7949 15.25 18.25 13.7949 18.25 12Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
