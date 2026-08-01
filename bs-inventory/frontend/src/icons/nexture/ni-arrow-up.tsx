import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiArrowUp({
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
          d="M8.5 8.5L11.2929 5.70711C11.6834 5.31658 12.3166 5.31658 12.7071 5.70711L15.5 8.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 19L12 6"
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
          d="M7.96967 9.03033C7.67678 8.73744 7.67678 8.26268 7.96967 7.96978L10.7626 5.17681C11.446 4.4935 12.5539 4.4935 13.2372 5.17681L16.0302 7.96978C16.3231 8.26268 16.3231 8.73744 16.0302 9.03033C15.7373 9.32322 15.2626 9.32322 14.9697 9.03033L12.1767 6.23736C12.0791 6.13983 11.9208 6.13983 11.8232 6.23736L9.03022 9.03033C8.73732 9.32322 8.26256 9.32322 7.96967 9.03033Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11.25 19L11.2539 19.0771C11.2925 19.4551 11.6118 19.75 12 19.75C12.4142 19.75 12.75 19.4142 12.75 19L12.75 6C12.75 5.58579 12.4142 5.25 12 5.25C11.5858 5.25 11.25 5.58579 11.25 6L11.25 19Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
