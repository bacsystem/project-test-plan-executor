import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSendUpLeft({
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
          d="M1.98256 6.36488C2.42245 11.7901 4.74348 16.9642 8.46619 20.9351C10.3573 22.9523 13.7883 21.8996 14.1313 19.1559L14.4898 16.2874C14.6033 15.3796 15.3184 14.6645 16.2263 14.551L19.0947 14.1924C21.8384 13.8494 22.8912 10.4185 20.874 8.52733C16.9031 4.80462 11.729 2.48359 6.30373 2.04371C3.83918 1.84388 1.78274 3.90033 1.98256 6.36488Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M14.6831 14.7441L11.5011 11.5622"
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
          d="M6.36468 1.2962C3.43933 1.05917 0.997608 3.5007 1.2348 6.42608C1.6888 12.0226 4.08262 17.356 7.91937 21.4485C10.2247 23.9065 14.4495 22.6518 14.8754 19.2493L15.2338 16.3812C15.3047 15.814 15.7517 15.3665 16.3188 15.2952L19.1879 14.9368C22.5906 14.511 23.8452 10.2862 21.3871 7.98077C17.2946 4.14397 11.9613 1.75016 6.36468 1.2962ZM10.9711 11.0316C11.2456 10.7572 11.6795 10.7399 11.9741 10.9798L12.0317 11.0316L15.2133 14.2132C15.5062 14.506 15.506 14.9808 15.2133 15.2737C14.9204 15.5666 14.4457 15.5666 14.1528 15.2737L10.9711 12.0921L10.9194 12.0345C10.6794 11.7399 10.6967 11.306 10.9711 11.0316Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M12.0313 11.0318L11.974 10.98C11.6795 10.7401 11.2452 10.7574 10.9707 11.0318C10.6962 11.3063 10.6789 11.7406 10.9189 12.0352L10.9707 12.0925L14.1527 15.2745C14.4456 15.5674 14.9204 15.5674 15.2133 15.2745C15.5062 14.9816 15.5062 14.5067 15.2133 14.2138L12.0313 11.0318Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
