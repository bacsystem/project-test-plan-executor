import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiForwardLeftSmall({
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
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16 8L13.0607 10.9393C12.4749 11.5251 12.4749 12.4749 13.0607 13.0607L16 16"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M11 8L8.06066 10.9393C7.47487 11.5251 7.47487 12.4749 8.06066 13.0607L11 16"
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
          d="M16.5303 7.46967C16.2374 7.17678 15.7627 7.17678 15.4698 7.46967L12.5303 10.4091C11.6518 11.2878 11.6518 12.7121 12.5303 13.5908L15.4698 16.5302C15.7627 16.8231 16.2374 16.8231 16.5303 16.5302C16.8232 16.2373 16.8232 15.7626 16.5303 15.4697L13.5909 12.5302C13.2981 12.2374 13.2981 11.7625 13.5909 11.4697L16.5303 8.53022C16.8232 8.23732 16.8232 7.76256 16.5303 7.46967Z"
          fill="currentColor"
        />
        <path
          d="M11.5303 7.46967C11.2374 7.17678 10.7627 7.17678 10.4698 7.46967L7.53033 10.4091C6.6518 11.2878 6.6518 12.7121 7.53033 13.5908L10.4698 16.5302C10.7627 16.8231 11.2374 16.8231 11.5303 16.5302C11.8232 16.2373 11.8232 15.7626 11.5303 15.4697L8.59088 12.5302C8.29813 12.2374 8.29813 11.7625 8.59088 11.4697L11.5303 8.53022C11.8232 8.23732 11.8232 7.76256 11.5303 7.46967Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
