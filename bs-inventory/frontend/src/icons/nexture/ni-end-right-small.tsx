import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEndRightSmall({
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
          d="M8.5 16L11.4393 13.0607C12.0251 12.4749 12.0251 11.5251 11.4393 10.9393L8.5 8"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path d="M15.5 16V12V8" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
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
          d="M7.96967 16.5303C8.26256 16.8232 8.73732 16.8232 9.03022 16.5303L11.9697 13.5909C12.8482 12.7122 12.8482 11.2879 11.9697 10.4092L9.03022 7.46978C8.73732 7.17689 8.26256 7.17689 7.96967 7.46978C7.67678 7.76268 7.67678 8.23744 7.96967 8.53033L10.9091 11.4698C11.2019 11.7626 11.2019 12.2375 10.9091 12.5303L7.96967 15.4698C7.67678 15.7627 7.67678 16.2374 7.96967 16.5303Z"
          fill="currentColor"
        />
        <path
          d="M14.75 8V16C14.75 16.4142 15.0858 16.75 15.5 16.75C15.9142 16.75 16.25 16.4142 16.25 16V8C16.25 7.58579 15.9142 7.25 15.5 7.25C15.0858 7.25 14.75 7.58579 14.75 8Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
