import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChange({
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
          d="M6.5 10L3.70711 7.20711C3.31658 6.81658 3.31658 6.18342 3.70711 5.79289L6.5 3"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M4 6.49999L17.5 6.5C19.433 6.5 21 8.067 21 10V10"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M17.5 14L20.2929 16.7929C20.6834 17.1834 20.6834 17.8166 20.2929 18.2071L17.5 21"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20 17.5L6.5 17.5C4.567 17.5 3 15.933 3 14V14"
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
          d="M7.03033 10.5303C6.73744 10.8232 6.26268 10.8232 5.96978 10.5303L3.17681 7.73736C2.4935 7.05396 2.4935 5.94615 3.17681 5.26275L5.96978 2.46978C6.26268 2.17689 6.73744 2.17689 7.03033 2.46978C7.32322 2.76268 7.32322 3.23744 7.03033 3.53033L4.23736 6.3233C4.13983 6.42091 4.13983 6.5792 4.23736 6.67681L7.03033 9.46978C7.32322 9.76268 7.32322 10.2374 7.03033 10.5303Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M20.25 10C20.25 10.4142 20.5858 10.75 21 10.75C21.4142 10.75 21.75 10.4142 21.75 10C21.75 7.65279 19.8472 5.75 17.5 5.75L4 5.75C3.58579 5.75 3.25 6.08579 3.25 6.5C3.25001 6.91421 3.58579 7.25 4 7.25L17.5 7.25C19.0188 7.25 20.25 8.48122 20.25 10Z"
          fill="currentColor"
        />
        <path
          d="M16.9697 13.4697C17.2626 13.1768 17.7373 13.1768 18.0302 13.4697L20.8232 16.2626C21.5065 16.946 21.5065 18.0539 20.8232 18.7372L18.0302 21.5302C17.7373 21.8231 17.2626 21.8231 16.9697 21.5302C16.6768 21.2373 16.6768 20.7626 16.9697 20.4697L19.7626 17.6767C19.8602 17.5791 19.8602 17.4208 19.7626 17.3232L16.9697 14.5302C16.6768 14.2373 16.6768 13.7626 16.9697 13.4697Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M3.75 14C3.75 13.5858 3.41421 13.25 3 13.25C2.58579 13.25 2.25 13.5858 2.25 14C2.25 16.3472 4.15279 18.25 6.5 18.25L20 18.25C20.4142 18.25 20.75 17.9142 20.75 17.5C20.75 17.0858 20.4142 16.75 20 16.75L6.5 16.75C4.98122 16.75 3.75 15.5188 3.75 14Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
