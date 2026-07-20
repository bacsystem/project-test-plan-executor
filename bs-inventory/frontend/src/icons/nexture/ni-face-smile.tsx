import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiFaceSmile({
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
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={iconStrokeWidth} />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9 15V15C10.6569 16.6569 13.3431 16.6569 15 15V15"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9 10L9 9"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M15 10L15 9"
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25ZM9.53027 14.4697C9.23738 14.1768 8.76262 14.1768 8.46973 14.4697C8.17692 14.7626 8.17686 15.2374 8.46973 15.5303C10.3585 17.4189 13.3839 17.4777 15.3438 15.707L15.5303 15.5303L15.582 15.4736C15.8223 15.1791 15.8047 14.7443 15.5303 14.4697C15.2557 14.1951 14.8209 14.1777 14.5264 14.418L14.4697 14.4697L14.3398 14.5938C12.9689 15.8325 10.8516 15.7909 9.53027 14.4697ZM9 8.25C8.58579 8.25 8.25 8.58579 8.25 9V10C8.25 10.4142 8.58579 10.75 9 10.75C9.41421 10.75 9.75 10.4142 9.75 10V9C9.75 8.58579 9.41421 8.25 9 8.25ZM15 8.25C14.5858 8.25 14.25 8.58579 14.25 9V10C14.25 10.4142 14.5858 10.75 15 10.75C15.4142 10.75 15.75 10.4142 15.75 10V9C15.75 8.58579 15.4142 8.25 15 8.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M8.46973 14.4697C8.76262 14.1768 9.23738 14.1768 9.53027 14.4697C10.8516 15.7909 12.9689 15.8325 14.3398 14.5938L14.4697 14.4697L14.5264 14.418C14.8209 14.1777 15.2557 14.1951 15.5303 14.4697C15.8047 14.7443 15.8223 15.1791 15.582 15.4736L15.5303 15.5303L15.3438 15.707C13.3839 17.4777 10.3585 17.4189 8.46973 15.5303C8.17686 15.2374 8.17692 14.7626 8.46973 14.4697Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M9 8.25C9.41421 8.25 9.75 8.58579 9.75 9V10C9.75 10.4142 9.41421 10.75 9 10.75C8.58579 10.75 8.25 10.4142 8.25 10V9C8.25 8.58579 8.58579 8.25 9 8.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M15 8.25C15.4142 8.25 15.75 8.58579 15.75 9V10C15.75 10.4142 15.4142 10.75 15 10.75C14.5858 10.75 14.25 10.4142 14.25 10V9C14.25 8.58579 14.5858 8.25 15 8.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
