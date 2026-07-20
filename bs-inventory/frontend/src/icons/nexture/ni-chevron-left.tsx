import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChevronLeft({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M16 5L9.29013 10.8711C8.60714 11.4688 8.60714 12.5312 9.29013 13.1289L16 19"
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
          d="M16.5644 4.50603C16.3087 4.21396 15.8762 4.16789 15.5663 4.38786L15.5058 4.43572L8.79582 10.3068C7.77156 11.2032 7.77156 12.7971 8.79582 13.6935L15.5058 19.5646C15.8175 19.8373 16.2916 19.8059 16.5644 19.4943C16.8371 19.1826 16.8057 18.7085 16.4941 18.4357L9.7841 12.5646C9.44261 12.2658 9.44261 11.7345 9.7841 11.4357L16.4941 5.56462L16.5488 5.51091C16.808 5.23296 16.8201 4.79826 16.5644 4.50603Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
