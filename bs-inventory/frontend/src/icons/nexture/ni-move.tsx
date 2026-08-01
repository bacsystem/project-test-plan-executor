import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiMove({
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
          d="M12 3L12 8M12 21L12 16M3 12L8 12M21 12L16 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M9.5 4.5L11.8114 2.1886C11.9156 2.08445 12.0844 2.08445 12.1886 2.18859L14.5 4.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 19.5L11.8114 21.8114C11.9156 21.9155 12.0844 21.9155 12.1886 21.8114L14.5 19.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 14.5L2.18857 12.1886C2.08443 12.0844 2.08443 11.9156 2.18857 11.8114L4.5 9.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.5 14.5L21.8114 12.1886C21.9155 12.0844 21.9155 11.9156 21.8114 11.8114L19.5 9.49997"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
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
          d="M21 12.75L16 12.75C15.5858 12.75 15.25 12.4142 15.25 12C15.25 11.5858 15.5858 11.25 16 11.25L21 11.25C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75ZM11.25 16L11.2539 15.9229C11.2925 15.5449 11.6118 15.25 12 15.25C12.3882 15.25 12.7075 15.5449 12.7461 15.9229L12.75 16L12.75 21C12.75 21.4142 12.4142 21.75 12 21.75C11.5858 21.75 11.25 21.4142 11.25 21L11.25 16ZM11.25 3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3L12.75 8C12.75 8.41421 12.4142 8.75 12 8.75C11.5858 8.75 11.25 8.41421 11.25 8L11.25 3ZM8 12.75L3 12.75C2.58579 12.75 2.25 12.4142 2.25 12C2.25 11.5858 2.58579 11.25 3 11.25L8 11.25C8.41421 11.25 8.75 11.5858 8.75 12C8.75 12.4142 8.41421 12.75 8 12.75Z"
          fill="currentColor"
        />
        <path
          d="M15.0299 3.96967C15.3228 4.26256 15.3228 4.73743 15.0299 5.03033C14.737 5.32295 14.2621 5.32313 13.9692 5.03033L11.9998 3.06093L10.0304 5.03033C9.73755 5.32322 9.26268 5.32322 8.96978 5.03033C8.67689 4.73744 8.67689 4.26256 8.96978 3.96967L11.281 1.65845C11.678 1.26144 12.3216 1.26148 12.7187 1.65845L15.0299 3.96967Z"
          fill="currentColor"
        />
        <path
          d="M15.0299 20.0303C15.3228 19.7374 15.3228 19.2626 15.0299 18.9697C14.737 18.677 14.2621 18.6769 13.9692 18.9697L11.9998 20.9391L10.0304 18.9697C9.73755 18.6768 9.26268 18.6768 8.96978 18.9697C8.67689 19.2626 8.67689 19.7374 8.96978 20.0303L11.281 22.3415C11.678 22.7386 12.3216 22.7385 12.7187 22.3415L15.0299 20.0303Z"
          fill="currentColor"
        />
        <path
          d="M3.96967 8.97009C4.26256 8.6772 4.73744 8.6772 5.03033 8.97009C5.32296 9.26301 5.32313 9.73795 5.03033 10.0308L3.06093 12.0002L5.03033 13.9696C5.32322 14.2624 5.32322 14.7373 5.03033 15.0302C4.73744 15.3231 4.26256 15.3231 3.96967 15.0302L1.65845 12.719C1.26143 12.322 1.26147 11.6784 1.65845 11.2813L3.96967 8.97009Z"
          fill="currentColor"
        />
        <path
          d="M20.0303 8.97009C19.7374 8.6772 19.2626 8.6772 18.9697 8.97009C18.677 9.263 18.6769 9.73795 18.9697 10.0308L20.9391 12.0002L18.9697 13.9696C18.6768 14.2625 18.6768 14.7373 18.9697 15.0302C19.2626 15.3231 19.7374 15.3231 20.0303 15.0302L22.3415 12.719C22.7386 12.322 22.7385 11.6784 22.3415 11.2813L20.0303 8.97009Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
