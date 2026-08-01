import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiTrendDown({
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
        <path
          d="M8 18H3.99998C3.44769 18 2.99998 17.5523 2.99998 17L3 13"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M21 6L15.8787 11.1213C15.3161 11.6839 14.553 12 13.7574 12L10.2426 12C9.44699 12 8.68393 12.3161 8.12132 12.8787L4 17"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
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
          d="M8.74989 18C8.74989 18.4142 8.41418 18.7499 7.99997 18.7499L4.00039 18.7499C3.03389 18.7499 2.24989 17.9659 2.24989 16.9994L2.24989 12.9998C2.24997 12.5858 2.58572 12.25 2.99981 12.2499C3.41397 12.2499 3.74965 12.5857 3.74973 12.9998L3.75042 17.0001C3.75048 17.1381 3.86236 17.2501 4.00039 17.2501L7.99997 17.2501C8.41418 17.2501 8.74989 17.5858 8.74989 18Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M20.4697 5.46967C20.7626 5.17677 21.2373 5.17678 21.5302 5.46967C21.8231 5.76256 21.8231 6.23732 21.5302 6.53021L16.4091 11.6513C15.706 12.3545 14.7522 12.7498 13.7578 12.7499L10.2421 12.7499C9.64556 12.7501 9.07316 12.9873 8.65131 13.4091L4.53022 17.5302C4.23732 17.8231 3.76256 17.8231 3.46967 17.5302C3.17678 17.2373 3.17678 16.7626 3.46967 16.4697L7.59076 12.3486C8.29392 11.6454 9.24773 11.2501 10.2421 11.2499L13.7578 11.2499C14.3543 11.2498 14.9267 11.0126 15.3486 10.5908L20.4697 5.46967Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
