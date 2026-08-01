import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEndDownSmall({
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
          d="M8 8.5L10.9393 11.4393C11.5251 12.0251 12.4749 12.0251 13.0607 11.4393L16 8.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path d="M8 15.5L12 15.5L16 15.5" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
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
          d="M7.46967 7.96967C7.17678 8.26256 7.17678 8.73732 7.46967 9.03022L10.4091 11.9697C11.2878 12.8482 12.7121 12.8482 13.5908 11.9697L16.5302 9.03022C16.8231 8.73732 16.8231 8.26256 16.5302 7.96967C16.2373 7.67678 15.7626 7.67678 15.4697 7.96967L12.5302 10.9091C12.2374 11.2019 11.7625 11.2019 11.4697 10.9091L8.53022 7.96967C8.23732 7.67678 7.76256 7.67678 7.46967 7.96967Z"
          fill="currentColor"
        />
        <path
          d="M16 14.75L8 14.75C7.58579 14.75 7.25 15.0858 7.25 15.5C7.25 15.9142 7.58579 16.25 8 16.25L16 16.25C16.4142 16.25 16.75 15.9142 16.75 15.5C16.75 15.0858 16.4142 14.75 16 14.75Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
