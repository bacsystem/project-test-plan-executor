import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChevronDown({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M5 8L10.8711 14.7099C11.4688 15.3929 12.5312 15.3929 13.1289 14.7099L19 8"
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
          d="M4.50603 7.43562C4.21396 7.69131 4.16789 8.12382 4.38786 8.43367L4.43572 8.49422L10.3068 15.2042C11.2032 16.2284 12.7971 16.2284 13.6935 15.2042L19.5646 8.49422C19.8373 8.18253 19.8059 7.7084 19.4943 7.43562C19.1826 7.1629 18.7085 7.19434 18.4357 7.50593L12.5646 14.2159C12.2658 14.5574 11.7345 14.5574 11.4357 14.2159L5.56462 7.50593L5.51091 7.45125C5.23296 7.19196 4.79826 7.17992 4.50603 7.43562Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
