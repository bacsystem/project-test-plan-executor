import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiMinusFull({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
        <path d="M4 12H19.9999" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
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
          d="M20 11.25L20.0762 11.2539C20.4545 11.2921 20.75 11.6115 20.75 12C20.75 12.3885 20.4546 12.7079 20.0762 12.7461L20 12.75H4.00001C3.58579 12.75 3.25001 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H20Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
