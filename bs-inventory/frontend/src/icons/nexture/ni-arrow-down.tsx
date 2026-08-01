import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiArrowDown({
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
          d="M8.5 15.5L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L15.5 15.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 5L12 18"
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
          d="M7.96967 14.9697C7.67678 15.2626 7.67678 15.7373 7.96967 16.0302L10.7626 18.8232C11.446 19.5065 12.5539 19.5065 13.2372 18.8232L16.0302 16.0302C16.3231 15.7373 16.3231 15.2626 16.0302 14.9697C15.7373 14.6768 15.2626 14.6768 14.9697 14.9697L12.1767 17.7626C12.0791 17.8602 11.9208 17.8602 11.8232 17.7626L9.03022 14.9697C8.73732 14.6768 8.26256 14.6768 7.96967 14.9697Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11.25 5L11.2539 4.92285C11.2925 4.54488 11.6118 4.25 12 4.25C12.4142 4.25 12.75 4.58579 12.75 5L12.75 18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18L11.25 5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
