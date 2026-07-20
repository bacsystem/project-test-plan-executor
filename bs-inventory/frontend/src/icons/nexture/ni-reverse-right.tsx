import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiReverseRight({
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
          d="M17.5 11L20.2929 8.20711C20.6834 7.81658 20.6834 7.18342 20.2929 6.79289L17.5 4"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20 7.49999L7.5 7.49999C5.01472 7.49999 3 9.51471 3 12V12C3 14.4853 5.01472 16.5 7.5 16.5L17 16.5"
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
          d="M16.9697 11.5303C17.2626 11.8232 17.7373 11.8232 18.0302 11.5303L20.8232 8.73736C21.5065 8.05396 21.5065 6.94615 20.8232 6.26275L18.0302 3.46978C17.7373 3.17689 17.2626 3.17689 16.9697 3.46978C16.6768 3.76268 16.6768 4.23744 16.9697 4.53033L19.7626 7.3233C19.8602 7.42091 19.8602 7.5792 19.7626 7.67681L16.9697 10.4698C16.6768 10.7627 16.6768 11.2374 16.9697 11.5303Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M3.75 12C3.75 14.0711 5.42893 15.75 7.5 15.75L17 15.75C17.4142 15.75 17.75 16.0858 17.75 16.5C17.75 16.9142 17.4142 17.25 17 17.25L7.5 17.25C4.60051 17.25 2.25 14.8995 2.25 12C2.25 9.1005 4.60051 6.75 7.5 6.75L20 6.75C20.4142 6.75 20.75 7.08579 20.75 7.5C20.75 7.91421 20.4142 8.25 20 8.25L7.5 8.25C5.42893 8.25 3.75 9.92893 3.75 12Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
