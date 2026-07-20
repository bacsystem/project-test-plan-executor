import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiAnchor({
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
          d="M11.0137 7.83562C10.0655 7.67758 9.32242 6.93453 9.16438 5.9863V5.9863C9.05555 5.33327 9.05555 4.66673 9.16438 4.0137V4.0137C9.32242 3.06547 10.0655 2.32242 11.0137 2.16438V2.16438C11.6667 2.05555 12.3333 2.05555 12.9863 2.16438V2.16438C13.9345 2.32242 14.6776 3.06547 14.8356 4.0137V4.0137C14.9445 4.66673 14.9445 5.33327 14.8356 5.9863V5.9863C14.6776 6.93453 13.9345 7.67758 12.9863 7.83562V7.83562C12.3333 7.94445 11.6667 7.94445 11.0137 7.83562V7.83562Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          d="M12 21.5V8.06641"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9 12H15"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M3.50049 16C3.8339 19.0007 6.18192 21.3811 9.1778 21.7556C11.0978 21.9956 13.0403 21.9956 14.9603 21.7556C17.9562 21.3811 20.3042 19.0007 20.6376 16"
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
          opacity={oneTone ? 1 : 0.4}
          d="M10.8896 1.42476C11.624 1.30237 12.374 1.30247 13.1084 1.42476C14.3727 1.63548 15.3634 2.62632 15.5742 3.89058C15.6966 4.62512 15.6966 5.37479 15.5742 6.10933C15.3634 7.37361 14.3727 8.36444 13.1084 8.57516C12.374 8.69746 11.624 8.69755 10.8896 8.57516C9.62557 8.36424 8.6345 7.37348 8.42381 6.10933C8.30146 5.37487 8.30142 4.62505 8.42381 3.89058C8.63451 2.62643 9.62554 1.63566 10.8896 1.42476Z"
          fill="currentColor"
        />
        <path
          d="M11.25 21.5V8.06641C11.25 7.65219 11.5858 7.31641 12 7.31641C12.4142 7.31641 12.75 7.65219 12.75 8.06641V21.5C12.75 21.9142 12.4142 22.25 12 22.25C11.5858 22.25 11.25 21.9142 11.25 21.5Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M15 11.25C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15Z"
          fill="currentColor"
        />
        <path
          d="M20.7202 15.2547C21.1319 15.3004 21.4291 15.6711 21.3833 16.0828C21.0115 19.4283 18.3933 22.0823 15.0533 22.4998C13.0715 22.7475 11.0663 22.7475 9.0845 22.4998C5.84891 22.0952 3.29111 19.5918 2.79642 16.3943L2.7554 16.0828L2.75052 16.0056C2.74709 15.6257 3.03178 15.2976 3.41751 15.2547C3.80362 15.2118 4.15417 15.4697 4.23392 15.8416L4.24564 15.9168L4.27884 16.1638C4.67137 18.7026 6.70211 20.6904 9.27103 21.0115C11.1292 21.2438 13.0095 21.2438 14.8677 21.0115C17.5192 20.6799 19.597 18.5726 19.8921 15.9168C19.9379 15.5052 20.3087 15.209 20.7202 15.2547Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
