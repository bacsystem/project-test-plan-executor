import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPlus({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M7.00002 12.0005H16.9998M12.0006 7L12.0006 16.9998"
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
          d="M11.251 17L11.251 12.751H7.00003C6.58598 12.751 6.25028 12.415 6.25003 12.001C6.25003 11.5868 6.58581 11.251 7.00002 11.251H11.251L11.251 7C11.251 6.58579 11.5868 6.25 12.001 6.25C12.415 6.25019 12.751 6.58591 12.751 7L12.751 11.251H17L17.0762 11.2539C17.4546 11.2921 17.75 11.6125 17.75 12.001C17.7498 12.3892 17.4544 12.7088 17.0762 12.7471L17 12.751H12.751L12.751 17C12.7509 17.414 12.415 17.7498 12.001 17.75C11.5869 17.75 11.2512 17.4141 11.251 17Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
