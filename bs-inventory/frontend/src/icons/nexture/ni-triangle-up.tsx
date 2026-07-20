import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiTriangleUp({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M13.5816 8.27917C12.737 7.32896 11.2548 7.3213 10.4004 8.26273L9.81906 8.90326C8.62909 10.2144 7.81982 11.8257 7.47859 13.5631V13.5631C7.21596 14.9004 8.10402 16.1922 9.44662 16.4259L9.65937 16.4629C11.2083 16.7325 12.7921 16.7325 14.3409 16.4629L14.5581 16.4251C15.8967 16.1921 16.7804 14.9019 16.514 13.5695V13.5695C16.1775 11.8869 15.3993 10.324 14.2593 9.0415L13.5816 8.27917Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
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
          d="M9.84488 7.75827C10.999 6.48703 13.0019 6.49747 14.1427 7.78074L14.8205 8.54245C16.0488 9.92435 16.8866 11.6093 17.2492 13.4223C17.598 15.1679 16.4403 16.8581 14.6867 17.1635L14.4699 17.2016C12.8361 17.486 11.1652 17.486 9.53141 17.2016L9.31851 17.1645C7.56168 16.8587 6.39982 15.1682 6.74332 13.4184C7.11091 11.5472 7.98225 9.81107 9.26383 8.3989L9.84488 7.75827Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
