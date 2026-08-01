import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiArrowUpDown({
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
          d="M3.5 8.5L6.29289 5.70711C6.68342 5.31658 7.31658 5.31658 7.70711 5.70711L10.5 8.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M13.5 15.5L16.2929 18.2929C16.6834 18.6834 17.3166 18.6834 17.7071 18.2929L20.5 15.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M7 19L7 6"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M17 5L17 18"
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
          d="M2.96967 9.03033C2.67678 8.73744 2.67678 8.26268 2.96967 7.96978L5.76264 5.17681C6.44604 4.4935 7.55385 4.4935 8.23725 5.17681L11.0302 7.96978C11.3231 8.26268 11.3231 8.73744 11.0302 9.03033C10.7373 9.32322 10.2626 9.32322 9.96967 9.03033L7.1767 6.23736C7.07909 6.13983 6.9208 6.13983 6.82319 6.23736L4.03022 9.03033C3.73732 9.32322 3.26256 9.32322 2.96967 9.03033Z"
          fill="currentColor"
        />
        <path
          d="M12.9697 14.9697C12.6768 15.2626 12.6768 15.7373 12.9697 16.0302L15.7626 18.8232C16.446 19.5065 17.5539 19.5065 18.2372 18.8232L21.0302 16.0302C21.3231 15.7373 21.3231 15.2626 21.0302 14.9697C20.7373 14.6768 20.2626 14.6768 19.9697 14.9697L17.1767 17.7626C17.0791 17.8602 16.9208 17.8602 16.8232 17.7626L14.0302 14.9697C13.7373 14.6768 13.2626 14.6768 12.9697 14.9697Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M6.25 19L6.25391 19.0771C6.29253 19.4551 6.61183 19.75 7 19.75C7.38817 19.75 7.70747 19.4551 7.74609 19.0771L7.75 19L7.75 6C7.75 5.58579 7.41421 5.25 7 5.25C6.58579 5.25 6.25 5.58579 6.25 6L6.25 19Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M16.25 5L16.2539 4.92285C16.2925 4.54488 16.6118 4.25 17 4.25C17.3882 4.25 17.7075 4.54488 17.7461 4.92285L17.75 5L17.75 18C17.75 18.4142 17.4142 18.75 17 18.75C16.5858 18.75 16.25 18.4142 16.25 18L16.25 5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
