import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSendUpRight({
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
          d="M22.0174 6.36488C21.5776 11.7901 19.2565 16.9642 15.5338 20.9351C13.6427 22.9523 10.2117 21.8996 9.86873 19.1559L9.51018 16.2874C9.3967 15.3796 8.68158 14.6645 7.7737 14.551L4.90527 14.1924C2.16158 13.8494 1.10884 10.4185 3.12605 8.52733C7.09694 4.80462 12.271 2.48359 17.6963 2.04371C20.1608 1.84388 22.2173 3.90033 22.0174 6.36488Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9.31738 14.7441L12.4994 11.5622"
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
          d="M17.6353 1.2962C20.5607 1.05917 23.0024 3.5007 22.7652 6.42608C22.3112 12.0226 19.9174 17.356 16.0806 21.4485C13.7753 23.9065 9.55054 22.6518 9.12458 19.2493L8.76618 16.3812C8.69528 15.814 8.24828 15.3665 7.68122 15.2952L4.81207 14.9368C1.40938 14.511 0.154836 10.2862 2.61286 7.98077C6.70544 4.14397 12.0387 1.75016 17.6353 1.2962ZM13.0289 11.0316C12.7544 10.7572 12.3205 10.7399 12.0259 10.9798L11.9683 11.0316L8.78668 14.2132C8.49385 14.506 8.49396 14.9808 8.78668 15.2737C9.07958 15.5666 9.55434 15.5666 9.84723 15.2737L13.0289 12.0921L13.0806 12.0345C13.3206 11.7399 13.3033 11.306 13.0289 11.0316Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M11.9687 11.0318L12.026 10.98C12.3205 10.7401 12.7548 10.7574 13.0293 11.0318C13.3038 11.3063 13.3211 11.7406 13.0811 12.0352L13.0293 12.0925L9.84734 15.2745C9.55444 15.5674 9.07957 15.5674 8.78668 15.2745C8.49378 14.9816 8.49378 14.5067 8.78668 14.2138L11.9687 11.0318Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
