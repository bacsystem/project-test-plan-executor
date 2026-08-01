import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSun({
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
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth={iconStrokeWidth} />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M2 12L1.5 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M22.5 12L22 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 2L12 1.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 22.5L12 22"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M4.92871 19.071L4.57516 19.4246"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M19.4248 4.57544L19.0713 4.92899"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M4.92871 4.92895L4.57516 4.5754"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M19.4248 19.4246L19.0713 19.071"
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
          d="M12 3.25C16.8325 3.25 20.75 7.16751 20.75 12C20.75 16.8325 16.8325 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12C3.25 7.16751 7.16751 3.25 12 3.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M1.5 12.75L1.42285 12.7461C1.04488 12.7075 0.75 12.3882 0.75 12C0.75 11.6118 1.04488 11.2925 1.42285 11.2539L1.5 11.25L2 11.25C2.41421 11.25 2.75 11.5858 2.75 12C2.75 12.4142 2.41421 12.75 2 12.75L1.5 12.75Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M22 12.75C21.5858 12.75 21.25 12.4142 21.25 12C21.25 11.5858 21.5858 11.25 22 11.25L22.5 11.25C22.9142 11.25 23.25 11.5858 23.25 12C23.25 12.4142 22.9142 12.75 22.5 12.75L22 12.75Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11.25 1.5L11.2539 1.42285C11.2925 1.04488 11.6118 0.75 12 0.75C12.3882 0.75 12.7075 1.04488 12.7461 1.42285L12.75 1.5L12.75 2C12.75 2.41421 12.4142 2.75 12 2.75C11.5858 2.75 11.25 2.41421 11.25 2L11.25 1.5Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11.25 22L11.2539 21.9229C11.2925 21.5449 11.6118 21.25 12 21.25C12.3882 21.25 12.7075 21.5449 12.7461 21.9229L12.75 22L12.75 22.5C12.75 22.9142 12.4142 23.25 12 23.25C11.5858 23.25 11.25 22.9142 11.25 22.5L11.25 22Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M5.10537 19.9552L5.04806 20.007C4.75349 20.2469 4.31919 20.2296 4.04471 19.9552C3.77024 19.6807 3.75297 19.2464 3.99292 18.9518L4.04471 18.8945L4.39827 18.541C4.69116 18.2481 5.16603 18.2481 5.45893 18.541C5.75182 18.8339 5.75182 19.3087 5.45893 19.6016L5.10537 19.9552Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M19.6015 5.45908C19.3086 5.75197 18.8337 5.75197 18.5408 5.45908C18.2479 5.16619 18.2479 4.69131 18.5408 4.39842L18.8944 4.04486C19.1873 3.75197 19.6621 3.75197 19.955 4.04487C20.2479 4.33776 20.2479 4.81263 19.955 5.10553L19.6015 5.45908Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M4.04483 5.10537L3.99304 5.04806C3.75308 4.75349 3.77035 4.31919 4.04483 4.04471C4.3193 3.77024 4.7536 3.75297 5.04817 3.99292L5.10549 4.04471L5.45904 4.39827C5.75193 4.69116 5.75193 5.16603 5.45904 5.45893C5.16615 5.75182 4.69127 5.75182 4.39838 5.45893L4.04483 5.10537Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M18.5409 19.6015L18.4891 19.5442C18.2492 19.2496 18.2664 18.8153 18.5409 18.5408C18.8154 18.2663 19.2497 18.2491 19.5443 18.489L19.6016 18.5408L19.9551 18.8944C20.248 19.1873 20.248 19.6621 19.9551 19.955C19.6622 20.2479 19.1874 20.2479 18.8945 19.955L18.5409 19.6015Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
