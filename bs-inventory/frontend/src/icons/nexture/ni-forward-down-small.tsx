import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiForwardDownSmall({
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
          d="M8 8L10.9393 10.9393C11.5251 11.5251 12.4749 11.5251 13.0607 10.9393L16 8"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M8 13L10.9393 15.9393C11.5251 16.5251 12.4749 16.5251 13.0607 15.9393L16 13"
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
          d="M7.46967 7.46967C7.17678 7.76256 7.17678 8.23732 7.46967 8.53022L10.4091 11.4697C11.2878 12.3482 12.7121 12.3482 13.5908 11.4697L16.5302 8.53022C16.8231 8.23732 16.8231 7.76256 16.5302 7.46967C16.2373 7.17678 15.7626 7.17678 15.4697 7.46967L12.5302 10.4091C12.2374 10.7019 11.7625 10.7019 11.4697 10.4091L8.53022 7.46967C8.23732 7.17678 7.76256 7.17678 7.46967 7.46967Z"
          fill="currentColor"
        />
        <path
          d="M7.46967 12.4697C7.17678 12.7626 7.17678 13.2373 7.46967 13.5302L10.4091 16.4697C11.2878 17.3482 12.7121 17.3482 13.5908 16.4697L16.5302 13.5302C16.8231 13.2373 16.8231 12.7626 16.5302 12.4697C16.2373 12.1768 15.7626 12.1768 15.4697 12.4697L12.5302 15.4091C12.2374 15.7019 11.7625 15.7019 11.4697 15.4091L8.53022 12.4697C8.23732 12.1768 7.76256 12.1768 7.46967 12.4697Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
