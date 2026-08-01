import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChartPie({
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
          opacity={oneTone ? 1 : 0.6}
          d="M21.8487 8.26892C21.4911 5.04998 18.95 2.50892 15.7311 2.15126C15.4869 2.12413 15.2425 2.10066 14.9978 2.08083C13.8969 1.9916 13 2.89543 13 4L13 9C13 10.1046 13.8954 11 15 11L20 11C21.1046 11 22.0084 10.1031 21.9192 9.00218C21.8993 8.75751 21.8759 8.51306 21.8487 8.26892Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M21.8 14.0002C20.8734 18.5647 16.8379 22.0002 12 22.0002C6.47715 22.0002 2 17.523 2 12.0002C2 7.16224 5.43552 3.12674 10 2.2002"
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
          opacity={oneTone ? 1 : 0.4}
          d="M15.0586 1.33297C15.3105 1.35338 15.5621 1.37731 15.8135 1.40523C19.381 1.80163 22.1973 4.61797 22.5938 8.1855C22.6217 8.43702 22.6466 8.6893 22.667 8.94136C22.7946 10.5193 21.5009 11.749 20 11.749H15C13.4812 11.749 12.25 10.5177 12.25 8.99898V3.99898C12.2502 2.49818 13.4806 1.20508 15.0586 1.33297Z"
          fill="currentColor"
        />
        <path
          d="M11.7617 1.25586C11.1239 2.00806 10.7503 2.98326 10.75 3.99902V8.99902L10.7559 9.21777C10.8699 11.4631 12.7262 13.249 15 13.249H20C21.016 13.249 21.9905 12.8743 22.7432 12.2363C22.6174 18.0642 17.8581 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.14259 5.93473 1.38262 11.7617 1.25586Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
