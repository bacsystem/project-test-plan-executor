import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiReverseLeft({
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
          d="M6.5 11L3.70711 8.20711C3.31658 7.81658 3.31658 7.18342 3.70711 6.79289L6.5 4"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M4 7.49999L16.5 7.49999C18.9853 7.49999 21 9.51471 21 12V12C21 14.4853 18.9853 16.5 16.5 16.5L7 16.5"
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
          d="M7.03033 11.5303C6.73744 11.8232 6.26268 11.8232 5.96978 11.5303L3.17681 8.73736C2.4935 8.05396 2.4935 6.94615 3.17681 6.26275L5.96978 3.46978C6.26268 3.17689 6.73744 3.17689 7.03033 3.46978C7.32322 3.76268 7.32322 4.23744 7.03033 4.53033L4.23736 7.3233C4.13983 7.42091 4.13983 7.5792 4.23736 7.67681L7.03033 10.4698C7.32322 10.7627 7.32322 11.2374 7.03033 11.5303Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M20.25 12C20.25 14.0711 18.5711 15.75 16.5 15.75L7 15.75C6.58579 15.75 6.25 16.0858 6.25 16.5C6.25 16.9142 6.58579 17.25 7 17.25L16.5 17.25C19.3995 17.25 21.75 14.8995 21.75 12C21.75 9.1005 19.3995 6.75 16.5 6.75L4 6.75C3.58579 6.75 3.25 7.08579 3.25 7.5C3.25001 7.91421 3.58579 8.25 4 8.25L16.5 8.25C18.5711 8.25 20.25 9.92893 20.25 12Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
