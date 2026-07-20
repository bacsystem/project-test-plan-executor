import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiArrowUpRight({
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
          d="M12 7H16C16.5523 7 17 7.44772 17 8L17 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M7.05029 16.9502L16.2427 7.75781"
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
          d="M11.2501 7C11.2501 6.58579 11.5858 6.25008 12 6.25008L15.9996 6.25008C16.9661 6.25008 17.7501 7.03408 17.7501 8.00058L17.7501 12.0002C17.75 12.4142 17.4143 12.75 17.0002 12.7501C16.586 12.7501 16.2504 12.4143 16.2503 12.0002L16.2496 7.99989C16.2495 7.86187 16.1376 7.74992 15.9996 7.74992L12 7.74992C11.5858 7.74992 11.2501 7.41421 11.2501 7Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M6.51996 16.42L6.46817 16.4773C6.22821 16.7719 6.24548 17.2062 6.51996 17.4806C6.81285 17.7735 7.28773 17.7735 7.58062 17.4806L16.773 8.28826C17.0659 7.99536 17.0659 7.52049 16.773 7.2276C16.4801 6.9347 16.0052 6.9347 15.7123 7.2276L6.51996 16.42Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
