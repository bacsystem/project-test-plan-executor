import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChartFunnel({
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
          d="M8.09965 19.3683C10.1371 21.7878 13.8629 21.7878 15.9003 19.3683L16.3261 18.8628C18.7185 16.0218 20.1886 12.5194 20.5408 8.82203L20.6129 8.06496C20.834 5.74307 19.2907 3.62016 17.0139 3.1142V3.1142C13.7116 2.38035 10.2884 2.38035 6.98611 3.1142V3.1142C4.70926 3.62016 3.16601 5.74307 3.38714 8.06496L3.45924 8.82203C3.81137 12.5194 5.28153 16.0218 7.67394 18.8628L8.09965 19.3683Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20 9L4 9"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M18.5 15L5.5 15"
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
          d="M19.2872 15.7499C18.6336 17.0285 17.8344 18.2364 16.8995 19.3466L16.4747 19.8524C14.1376 22.6271 9.86351 22.627 7.52641 19.8524L7.10063 19.3466C6.1657 18.2363 5.36651 17.0286 4.71293 15.7499H19.2872Z"
          fill="currentColor"
        />
        <path
          d="M6.82329 2.38269C10.2327 1.62504 13.7674 1.62505 17.1768 2.38269C19.823 2.97078 21.6164 5.43801 21.3594 8.1366L21.3487 8.24988H2.65141L2.64067 8.1366C2.38368 5.43818 4.17734 2.97098 6.82329 2.38269Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M21.1855 9.75C20.9665 11.3004 20.5573 12.8111 19.9727 14.25H4.02734C3.44273 12.8111 3.03347 11.3004 2.81445 9.75H21.1855Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
