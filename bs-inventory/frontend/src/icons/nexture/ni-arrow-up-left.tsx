import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiArrowUpLeft({
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
          d="M12 7H8C7.44772 7 7.00001 7.44771 7 8L7 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M17 16.9502L7.80762 7.75781"
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
          d="M12.7499 7C12.7499 6.58579 12.4142 6.25008 12 6.25008L8.00039 6.25008C7.0339 6.25008 6.24989 7.03409 6.24989 8.00058L6.24989 12.0002C6.24997 12.4142 6.58572 12.75 6.99981 12.7501C7.41397 12.7501 7.74965 12.4143 7.74973 12.0002L7.75042 7.99989C7.75048 7.86187 7.86236 7.74992 8.00039 7.74992L12 7.74992C12.4142 7.74992 12.7499 7.41421 12.7499 7Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M17.5303 16.42L17.5821 16.4773C17.8221 16.7719 17.8048 17.2062 17.5303 17.4806C17.2374 17.7735 16.7626 17.7735 16.4697 17.4806L7.27729 8.28826C6.98439 7.99536 6.98439 7.52049 7.27729 7.2276C7.57018 6.9347 8.04505 6.9347 8.33795 7.2276L17.5303 16.42Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
