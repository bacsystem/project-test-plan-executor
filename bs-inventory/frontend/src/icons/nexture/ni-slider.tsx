import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSlider({
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
          d="M2.16438 11.0137C2.32242 10.0655 3.06547 9.32242 4.0137 9.16438V9.16438C4.66673 9.05555 5.33327 9.05555 5.9863 9.16438V9.16438C6.93453 9.32242 7.67758 10.0655 7.83562 11.0137V11.0137C7.94445 11.6667 7.94445 12.3333 7.83562 12.9863V12.9863C7.67758 13.9345 6.93453 14.6776 5.9863 14.8356V14.8356C5.33327 14.9445 4.66673 14.9445 4.0137 14.8356V14.8356C3.06547 14.6776 2.32242 13.9345 2.16438 12.9863V12.9863C2.05554 12.3333 2.05554 11.6667 2.16438 11.0137V11.0137Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M22 12L8 12"
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
          d="M3.88963 8.42476C4.62399 8.30237 5.37401 8.30247 6.10838 8.42476C7.37267 8.63548 8.36343 9.62632 8.5742 10.8906C8.69663 11.6251 8.69658 12.3748 8.5742 13.1093C8.36344 14.3736 7.37267 15.3644 6.10838 15.5752C5.37399 15.6975 4.62401 15.6976 3.88963 15.5752C2.62557 15.3642 1.6345 14.3735 1.42381 13.1093C1.30146 12.3749 1.30142 11.625 1.42381 10.8906C1.63451 9.62643 2.62554 8.63566 3.88963 8.42476Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M22 12.75L8 12.75C7.58579 12.75 7.25 12.4142 7.25 12C7.25 11.5858 7.58579 11.25 8 11.25L22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
