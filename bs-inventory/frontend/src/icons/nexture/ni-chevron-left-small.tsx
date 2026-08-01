import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChevronLeftSmall({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M14 8L10.8485 11.1515C10.3799 11.6201 10.3799 12.3799 10.8485 12.8485L14 16"
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
          d="M14.5303 7.46967C14.2374 7.17678 13.7627 7.17678 13.4698 7.46967L10.3184 10.621C9.55689 11.3826 9.55689 12.6173 10.3184 13.3788L13.4698 16.5302C13.7627 16.8231 14.2374 16.8231 14.5303 16.5302C14.8232 16.2373 14.8232 15.7626 14.5303 15.4697L11.379 12.3183C11.2032 12.1426 11.2032 11.8573 11.379 11.6816L14.5303 8.53022C14.8232 8.23732 14.8232 7.76256 14.5303 7.46967Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
