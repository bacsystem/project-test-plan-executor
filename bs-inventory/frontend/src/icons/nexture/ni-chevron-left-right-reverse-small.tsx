import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChevronLeftRightReverseSmall({
  className,
  variant = "outlined",
  size = "medium",
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
          d="M4.5 16L7.65147 12.8485C8.1201 12.3799 8.1201 11.6201 7.65147 11.1515L4.5 8"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M19.5 16L16.3485 12.8485C15.8799 12.3799 15.8799 11.6201 16.3485 11.1515L19.5 8"
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
          d="M3.96967 16.5303C4.26256 16.8232 4.73732 16.8232 5.03022 16.5303L8.18158 13.379C8.94311 12.6174 8.94311 11.3827 8.18158 10.6212L5.03022 7.46978C4.73732 7.17689 4.26256 7.17689 3.96967 7.46978C3.67678 7.76268 3.67678 8.23744 3.96967 8.53033L7.12104 11.6817C7.29677 11.8574 7.29677 12.1427 7.12104 12.3184L3.96967 15.4698C3.67678 15.7627 3.67678 16.2374 3.96967 16.5303Z"
          fill="currentColor"
        />
        <path
          d="M20.0303 16.5303C19.7374 16.8232 19.2627 16.8232 18.9698 16.5303L15.8184 13.379C15.0569 12.6174 15.0569 11.3827 15.8184 10.6212L18.9698 7.46978C19.2627 7.17689 19.7374 7.17689 20.0303 7.46978C20.3232 7.76268 20.3232 8.23744 20.0303 8.53033L16.879 11.6817C16.7032 11.8574 16.7032 12.1427 16.879 12.3184L20.0303 15.4698C20.3232 15.7627 20.3232 16.2374 20.0303 16.5303Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
