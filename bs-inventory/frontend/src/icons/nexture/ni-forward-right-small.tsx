import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiForwardRightSmall({
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
          d="M8 16L10.9393 13.0607C11.5251 12.4749 11.5251 11.5251 10.9393 10.9393L8 8"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M13 16L15.9393 13.0607C16.5251 12.4749 16.5251 11.5251 15.9393 10.9393L13 8"
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
          d="M7.46967 16.5303C7.76256 16.8232 8.23732 16.8232 8.53022 16.5303L11.4697 13.5909C12.3482 12.7122 12.3482 11.2879 11.4697 10.4092L8.53022 7.46978C8.23732 7.17689 7.76256 7.17689 7.46967 7.46978C7.17678 7.76268 7.17678 8.23744 7.46967 8.53033L10.4091 11.4698C10.7019 11.7626 10.7019 12.2375 10.4091 12.5303L7.46967 15.4698C7.17678 15.7627 7.17678 16.2374 7.46967 16.5303Z"
          fill="currentColor"
        />
        <path
          d="M12.4697 16.5303C12.7626 16.8232 13.2373 16.8232 13.5302 16.5303L16.4697 13.5909C17.3482 12.7122 17.3482 11.2879 16.4697 10.4092L13.5302 7.46978C13.2373 7.17689 12.7626 7.17689 12.4697 7.46978C12.1768 7.76268 12.1768 8.23744 12.4697 8.53033L15.4091 11.4698C15.7019 11.7626 15.7019 12.2375 15.4091 12.5303L12.4697 15.4698C12.1768 15.7627 12.1768 16.2374 12.4697 16.5303Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
