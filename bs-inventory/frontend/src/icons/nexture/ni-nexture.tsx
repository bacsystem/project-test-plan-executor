import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiNexture({
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
          opacity={oneTone ? 1 : 0.6}
          d="M14 21L10 15M10 3L14 9"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          d="M3 5.03693C3 3.35968 4.35968 2 6.03693 2L9.24077 2C9.66008 2 10 2.33992 10 2.75923V15.9261C10 19.2806 7.28064 22 3.92614 22L3.75923 22C3.33992 22 3 21.6601 3 21.2408V5.03693Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          d="M21 19.0003C21 20.6629 19.663 22.0165 18.0005 22.037L14.7686 22.0768C14.3456 22.082 14 21.7406 14 21.3176L14 8.08922C14 4.76392 16.6739 2.05681 19.999 2.01583L20.2314 2.01297C20.6543 2.00775 21 2.34917 21 2.77214L21 19.0003Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
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
          opacity={oneTone ? 1 : 0.4}
          d="M9.25 3.3301C9.25016 2.54187 10.2087 2.2023 10.7129 2.73928L10.8076 2.85842L14.6074 8.55862C14.7005 8.69823 14.75 8.86251 14.75 9.0303V20.6699C14.7497 21.5107 13.6589 21.8411 13.1924 21.1416L9.39258 15.4414C9.2995 15.3018 9.25002 15.1375 9.25 14.9697V3.3301Z"
          fill="currentColor"
        />
        <path
          d="M9.24121 1.25C10.0744 1.25024 10.7498 1.92561 10.75 2.75879V15.9258C10.75 19.6945 7.69449 22.75 3.92578 22.75H3.75879C2.92561 22.7498 2.25024 22.0744 2.25 21.2412V5.03711C2.25 2.94565 3.94565 1.25 6.03711 1.25H9.24121Z"
          fill="currentColor"
        />
        <path
          d="M20.2227 1.26256C21.0629 1.25247 21.7496 1.93108 21.75 2.77135V18.9999C21.75 21.0731 20.0829 22.7614 18.0098 22.787L14.7783 22.826C13.9376 22.8364 13.25 22.1581 13.25 21.3172V8.08873C13.2503 4.35305 16.2548 1.31153 19.9902 1.26549L20.2227 1.26256Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
