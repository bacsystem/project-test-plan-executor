import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChevronRightSmall({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M10 16L13.1515 12.8485C13.6201 12.3799 13.6201 11.6201 13.1515 11.1515L10 8"
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
          d="M9.46967 16.5303C9.76256 16.8232 10.2373 16.8232 10.5302 16.5303L13.6816 13.379C14.4431 12.6174 14.4431 11.3827 13.6816 10.6212L10.5302 7.46978C10.2373 7.17689 9.76256 7.17689 9.46967 7.46978C9.17678 7.76268 9.17678 8.23744 9.46967 8.53033L12.621 11.6817C12.7968 11.8574 12.7968 12.1427 12.621 12.3184L9.46967 15.4698C9.17678 15.7627 9.17678 16.2374 9.46967 16.5303Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
