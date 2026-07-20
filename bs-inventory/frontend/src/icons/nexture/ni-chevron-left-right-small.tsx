import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChevronLeftRightSmall({
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
          d="M7.5 8L4.34853 11.1515C3.8799 11.6201 3.8799 12.3799 4.34853 12.8485L7.5 16"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M16.5 8L19.6515 11.1515C20.1201 11.6201 20.1201 12.3799 19.6515 12.8485L16.5 16"
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
          d="M8.03033 7.46967C7.73744 7.17678 7.26268 7.17678 6.96978 7.46967L3.81842 10.621C3.05689 11.3826 3.0569 12.6173 3.81842 13.3789L6.96978 16.5302C7.26268 16.8231 7.73744 16.8231 8.03033 16.5302C8.32322 16.2373 8.32322 15.7626 8.03033 15.4697L4.87896 12.3183C4.70323 12.1426 4.70323 11.8573 4.87896 11.6816L8.03033 8.53022C8.32322 8.23732 8.32322 7.76256 8.03033 7.46967Z"
          fill="currentColor"
        />
        <path
          d="M15.9697 7.46967C16.2626 7.17678 16.7373 7.17678 17.0302 7.46967L20.1816 10.621C20.9431 11.3826 20.9431 12.6173 20.1816 13.3788L17.0302 16.5302C16.7373 16.8231 16.2626 16.8231 15.9697 16.5302C15.6768 16.2373 15.6768 15.7626 15.9697 15.4697L19.121 12.3183C19.2968 12.1426 19.2968 11.8573 19.121 11.6816L15.9697 8.53022C15.6768 8.23732 15.6768 7.76256 15.9697 7.46967Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
