import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSendDown({
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
          d="M15.0556 20.4054C18.5808 16.2581 20.5982 10.9582 20.7737 5.51804C20.8628 2.75443 17.6924 1.07276 15.5098 2.77033L13.2279 4.54508C12.5057 5.10681 11.4944 5.10681 10.7722 4.54508L8.49037 2.77033C6.30777 1.07276 3.1373 2.75443 3.22645 5.51805C3.40194 10.9582 5.41937 16.2581 8.94454 20.4054C10.5459 22.2894 13.4542 22.2894 15.0556 20.4054Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 5.5L12 10"
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.0486 2.1791C17.756 0.0733849 21.6317 2.17353 21.5232 5.54238C21.3422 11.1493 19.2632 16.6127 15.6267 20.891C13.7259 23.1269 10.2737 23.127 8.37283 20.891C4.73639 16.6127 2.65734 11.1492 2.47635 5.54238C2.36787 2.17354 6.24361 0.0733856 8.95096 2.1791L11.2322 3.95352C11.6835 4.30435 12.3161 4.30428 12.7674 3.95352L15.0486 2.1791ZM11.9998 4.74942C11.5858 4.74956 11.2499 5.08542 11.2498 5.49942V9.99942L11.2537 10.0766C11.2923 10.4544 11.6117 10.7493 11.9998 10.7494C12.388 10.7494 12.7073 10.4545 12.7459 10.0766L12.7498 9.99942V5.49942C12.7496 5.08533 12.4139 4.74942 11.9998 4.74942Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M11.25 10L11.2539 10.0771C11.2925 10.4551 11.6118 10.75 12 10.75C12.3882 10.75 12.7075 10.4551 12.7461 10.0771L12.75 10L12.75 5.5C12.75 5.08579 12.4142 4.75 12 4.75C11.5858 4.75 11.25 5.08579 11.25 5.5L11.25 10Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
