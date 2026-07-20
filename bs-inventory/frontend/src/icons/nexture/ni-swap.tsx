import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSwap({
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
          d="M9.05178 4L6.00006 4C4.3432 4 3.00006 5.34315 3.00006 7L3.00006 9M7.43118 1.99999L9.18269 3.7517C9.35775 3.92678 9.35772 4.21063 9.18263 4.38568L7.56815 5.99976"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M15.4481 20L18.4998 20C20.1567 20 21.4998 18.6569 21.4998 17L21.4998 15M17.0004 22L15.3121 20.2542C15.1399 20.0762 15.1447 19.7922 15.3229 19.6201L17.0004 18"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M17.5 11C19.9853 11 22 8.98528 22 6.5C22 4.01472 19.9853 2 17.5 2C15.0147 2 13 4.01472 13 6.5C13 8.98528 15.0147 11 17.5 11Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 22C8.98528 22 11 19.9853 11 17.5C11 15.0147 8.98528 13 6.5 13C4.01472 13 2 15.0147 2 17.5C2 19.9853 4.01472 22 6.5 22Z"
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
          opacity={oneTone ? 1 : 0.4}
          d="M21.499 14.25C21.9132 14.25 22.249 14.5858 22.249 15V17C22.249 19.0711 20.5701 20.75 18.499 20.75H16.835L17.5391 21.4785L17.5898 21.5361C17.8251 21.8346 17.8005 22.2691 17.5215 22.5391C17.2424 22.8089 16.8071 22.8193 16.5166 22.5742L16.4609 22.5215L14.7725 20.7754C14.3125 20.2995 14.3257 19.541 14.8018 19.0811L16.4785 17.4609L16.5371 17.4102C16.8356 17.1754 17.2693 17.1997 17.5391 17.4785C17.8268 17.7765 17.8184 18.2513 17.5205 18.5391L16.7852 19.25H18.499C19.7417 19.25 20.749 18.2426 20.749 17V15C20.749 14.586 21.0851 14.2503 21.499 14.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M6.90039 1.46973C7.17493 1.19522 7.60973 1.17787 7.9043 1.41797L7.96094 1.46973L9.71289 3.22168C10.1804 3.68962 10.1806 4.44818 9.71289 4.91602L8.09766 6.53027C7.80471 6.82273 7.32984 6.82303 7.03711 6.53027C6.74461 6.2375 6.74475 5.76256 7.03711 5.46973L7.75684 4.75H6C4.75753 4.7502 3.75 5.75748 3.75 7V9C3.75 9.41407 3.41401 9.74977 3 9.75C2.58596 9.7498 2.25 9.41409 2.25 9V7C2.25 4.92906 3.9291 3.2502 6 3.25H7.62012L6.90039 2.53027L6.84863 2.47363C6.60854 2.17912 6.62604 1.74428 6.90039 1.46973Z"
          fill="currentColor"
        />
        <path
          d="M6.5 12.25C9.3995 12.25 11.75 14.6005 11.75 17.5C11.75 20.3995 9.3995 22.75 6.5 22.75C3.6005 22.75 1.25 20.3995 1.25 17.5C1.25 14.6005 3.6005 12.25 6.5 12.25Z"
          fill="currentColor"
        />
        <path
          d="M17.5 1.25C20.3995 1.25 22.75 3.6005 22.75 6.5C22.75 9.3995 20.3995 11.75 17.5 11.75C14.6005 11.75 12.25 9.3995 12.25 6.5C12.25 3.6005 14.6005 1.25 17.5 1.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
