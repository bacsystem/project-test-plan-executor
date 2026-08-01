import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChevronUpDownReverseSmall({
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
          d="M16 19.5L12.8485 16.3485C12.3799 15.8799 11.6201 15.8799 11.1515 16.3485L8 19.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M16 4.5L12.8485 7.65147C12.3799 8.1201 11.6201 8.1201 11.1515 7.65147L8 4.5"
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
          d="M16.5303 20.0303C16.8232 19.7374 16.8232 19.2627 16.5303 18.9698L13.379 15.8184C12.6174 15.0569 11.3827 15.0569 10.6212 15.8184L7.46978 18.9698C7.17689 19.2627 7.17689 19.7374 7.46978 20.0303C7.76268 20.3232 8.23744 20.3232 8.53033 20.0303L11.6817 16.879C11.8574 16.7032 12.1427 16.7032 12.3184 16.879L15.4698 20.0303C15.7627 20.3232 16.2374 20.3232 16.5303 20.0303Z"
          fill="currentColor"
        />
        <path
          d="M16.5303 3.96967C16.8232 4.26256 16.8232 4.73732 16.5303 5.03022L13.379 8.18158C12.6174 8.94311 11.3827 8.94311 10.6212 8.18158L7.46978 5.03022C7.17689 4.73732 7.17689 4.26256 7.46978 3.96967C7.76268 3.67678 8.23744 3.67678 8.53033 3.96967L11.6817 7.12104C11.8574 7.29677 12.1427 7.29677 12.3184 7.12104L15.4698 3.96967C15.7627 3.67678 16.2374 3.67678 16.5303 3.96967Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
