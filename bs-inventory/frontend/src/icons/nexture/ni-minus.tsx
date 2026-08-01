import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiMinus({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
        <path d="M7 12.0005H16.9998" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
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
          d="M17 11.2505L17.0762 11.2544C17.4545 11.2927 17.75 11.6121 17.75 12.0005C17.75 12.3889 17.4545 12.7083 17.0762 12.7466L17 12.7505H7.00001C6.58579 12.7505 6.25001 12.4147 6.25 12.0005C6.25 11.5863 6.58579 11.2505 7 11.2505H17Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
