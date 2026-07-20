import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChartScatter({
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
          d="M21 21L16.8283 21.4635C13.6193 21.8201 10.3807 21.8201 7.17167 21.4635V21.4635C4.73277 21.1925 2.80747 19.2672 2.53648 16.8283V16.8283C2.17992 13.6193 2.17992 10.3807 2.53648 7.17167L3 3"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M11 17L10 17"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9 12L8 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M14 13L13 13"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 8L11 8"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M18 9L17 9"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16 4L15 4"
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
          d="M21.7453 20.9168C21.7882 21.3029 21.5303 21.6534 21.1584 21.7332L21.0832 21.7449L16.9114 22.2088C13.6473 22.5714 10.3531 22.5714 7.08909 22.2088C4.30155 21.899 2.10097 19.6985 1.79124 16.9109C1.42857 13.6469 1.42857 10.3527 1.79124 7.08864L2.25511 2.91677L2.26683 2.84157C2.34658 2.46969 2.69713 2.21176 3.08323 2.25466C3.46897 2.29763 3.75365 2.62572 3.75023 3.00563L3.74534 3.08278L3.28245 7.25466C2.93206 10.4084 2.93206 13.5912 3.28245 16.7449C3.5147 18.8352 5.16483 20.4853 7.25511 20.7175C10.4088 21.0679 13.5916 21.0679 16.7453 20.7175L20.9172 20.2547L20.9944 20.2498C21.3743 20.2463 21.7024 20.531 21.7453 20.9168Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M10 17.75L9.92285 17.7461C9.54488 17.7075 9.25 17.3882 9.25 17C9.25 16.6118 9.54488 16.2925 9.92285 16.2539L10 16.25L11 16.25C11.4142 16.25 11.75 16.5858 11.75 17C11.75 17.4142 11.4142 17.75 11 17.75L10 17.75Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M8 12.75L7.92285 12.7461C7.54488 12.7075 7.25 12.3882 7.25 12C7.25 11.6118 7.54488 11.2925 7.92285 11.2539L8 11.25L9 11.25C9.41421 11.25 9.75 11.5858 9.75 12C9.75 12.4142 9.41421 12.75 9 12.75L8 12.75Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M13 13.75L12.9229 13.7461C12.5449 13.7075 12.25 13.3882 12.25 13C12.25 12.6118 12.5449 12.2925 12.9229 12.2539L13 12.25L14 12.25C14.4142 12.25 14.75 12.5858 14.75 13C14.75 13.4142 14.4142 13.75 14 13.75L13 13.75Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11 8.75L10.9229 8.74609C10.5449 8.70747 10.25 8.38817 10.25 8C10.25 7.61183 10.5449 7.29253 10.9229 7.25391L11 7.25L12 7.25C12.4142 7.25 12.75 7.58579 12.75 8C12.75 8.41421 12.4142 8.75 12 8.75L11 8.75Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M17 9.75L16.9229 9.74609C16.5449 9.70747 16.25 9.38817 16.25 9C16.25 8.61183 16.5449 8.29253 16.9229 8.25391L17 8.25L18 8.25C18.4142 8.25 18.75 8.58579 18.75 9C18.75 9.41421 18.4142 9.75 18 9.75L17 9.75Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M15 4.75L14.9229 4.74609C14.5449 4.70747 14.25 4.38817 14.25 4C14.25 3.61183 14.5449 3.29253 14.9229 3.25391L15 3.25L16 3.25C16.4142 3.25 16.75 3.58579 16.75 4C16.75 4.41421 16.4142 4.75 16 4.75L15 4.75Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
