import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiBadge({
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
          d="M9.69863 15.6164C7.4861 15.2477 5.75232 13.5139 5.38356 11.3014V11.3014C5.12961 9.77763 5.12961 8.22237 5.38356 6.69863V6.69863C5.75232 4.4861 7.4861 2.75232 9.69863 2.38356V2.38356C11.2224 2.1296 12.7776 2.12961 14.3014 2.38356V2.38356C16.5139 2.75232 18.2477 4.4861 18.6164 6.69863V6.69863C18.8704 8.22237 18.8704 9.77763 18.6164 11.3014V11.3014C18.2477 13.5139 16.5139 15.2477 14.3014 15.6164V15.6164C12.7776 15.8704 11.2224 15.8704 9.69863 15.6164V15.6164Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16 15L16.7452 20.9615C16.8486 21.789 15.9535 22.3721 15.2384 21.9431L13.029 20.6174C12.3956 20.2374 11.6044 20.2374 10.971 20.6174L8.76158 21.943C8.04654 22.3721 7.15138 21.789 7.25481 20.9615L8 15"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
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
          d="M9.57464 1.643C11.1798 1.37547 12.8191 1.37555 14.4242 1.643C16.9526 2.06439 18.9341 4.04643 19.3559 6.57464C19.6234 8.17986 19.6234 9.81902 19.3559 11.4242C18.9344 13.9529 16.9529 15.9345 14.4242 16.3559C12.819 16.6234 11.1799 16.6234 9.57464 16.3559C7.04643 15.9341 5.06439 13.9526 4.643 11.4242C4.37555 9.81909 4.37547 8.17978 4.643 6.57464C5.06463 4.04654 7.04654 2.06463 9.57464 1.643Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M6.98847 17.0303C7.70511 17.4189 8.49193 17.6965 9.32734 17.8359C11.0956 18.1306 12.9019 18.1305 14.6701 17.8359C15.5054 17.6967 16.2925 17.4195 17.009 17.0312L17.4885 20.8682C17.6695 22.3161 16.1031 23.3366 14.8518 22.5859L12.6428 21.2607C12.247 21.0235 11.7514 21.0234 11.3557 21.2607L9.14668 22.5859C7.89543 23.3363 6.32902 22.316 6.50996 20.8682L6.98847 17.0303Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
