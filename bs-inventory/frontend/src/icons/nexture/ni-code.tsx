import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCode({
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
          d="M17 6L21.5858 10.5858C22.3668 11.3668 22.3668 12.6332 21.5858 13.4142L17 18"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M7 6L2.41421 10.5858C1.63317 11.3668 1.63316 12.6332 2.41421 13.4142L7 18"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9.81053 20.2205L14.2104 3.7998"
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
          d="M16.4697 5.46967C16.7626 5.17678 17.2373 5.17678 17.5302 5.46967L22.1162 10.0556C23.1899 11.1295 23.1899 12.8704 22.1162 13.9443L17.5302 18.5302C17.2373 18.8231 16.7626 18.8231 16.4697 18.5302C16.1768 18.2373 16.1768 17.7626 16.4697 17.4697L21.0556 12.8837C21.5436 12.3956 21.5436 11.6043 21.0556 11.1162L16.4697 6.53022C16.1768 6.23732 16.1768 5.76256 16.4697 5.46967Z"
          fill="currentColor"
        />
        <path
          d="M7.53033 5.46967C7.23744 5.17678 6.76268 5.17678 6.46978 5.46967L1.88385 10.0556C0.810106 11.1295 0.810105 12.8704 1.88385 13.9443L6.46978 18.5302C6.76268 18.8231 7.23744 18.8231 7.53033 18.5302C7.82322 18.2373 7.82322 17.7626 7.53033 17.4697L2.94439 12.8837C2.45644 12.3956 2.45644 11.6043 2.94439 11.1162L7.53033 6.53022C7.82322 6.23732 7.82322 5.76256 7.53033 5.46967Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M10.5349 20.4147C10.4277 20.8148 10.0164 21.0523 9.61631 20.945C9.21621 20.8378 8.97877 20.4266 9.08598 20.0265L13.4859 3.60575C13.5931 3.20565 14.0044 2.96821 14.4045 3.07542C14.8046 3.18262 15.042 3.59388 14.9348 3.99398L10.5349 20.4147Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
