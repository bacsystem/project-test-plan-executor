import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiBell({
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
          d="M7.14588 18.6797C5.25361 17.9701 4 16.1611 4 14.1402L4 13.6473C4 11.3056 4.46369 8.98715 5.36433 6.82563L5.65281 6.13327C6.49264 4.11769 8.29828 2.66633 10.4473 2.27951V2.27951C11.4742 2.09467 12.5258 2.09467 13.5527 2.27951V2.27951C15.7017 2.66633 17.5074 4.1177 18.3472 6.13327L18.6357 6.82564C19.5363 8.98716 20 11.3056 20 13.6473L20 14.1402C20 16.1611 18.7464 17.9701 16.8541 18.6797L16.5998 18.7751C13.6341 19.8872 10.3659 19.8872 7.40018 18.7751L7.14588 18.6797Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M15 19.5C13.8696 22.9376 10.1304 22.9376 9 19.5"
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
          d="M10.3145 1.54085C11.4291 1.34022 12.5709 1.34022 13.6855 1.54085C16.0852 1.97279 18.1012 3.59395 19.0391 5.84457L19.3281 6.53695C20.2668 8.78985 20.75 11.2067 20.75 13.6473V14.1405C20.7498 16.4739 19.302 18.5623 17.1172 19.3817L16.8633 19.4774C13.7278 20.6532 10.2722 20.6532 7.13672 19.4774L6.88281 19.3817C4.69796 18.5623 3.25018 16.4739 3.25 14.1405V13.6473C3.25001 11.2067 3.73316 8.78985 4.67188 6.53695L4.96094 5.84457C5.8988 3.59395 7.91479 1.97279 10.3145 1.54085Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M16.0361 18.75L15.7129 19.7344C15.0695 21.691 13.6093 22.8281 12 22.8281C10.3907 22.8281 8.93053 21.691 8.28711 19.7344L7.96387 18.75H16.0361ZM10.1855 20.25C10.7013 21.0109 11.3909 21.3281 12 21.3281C12.6091 21.3281 13.2987 21.0109 13.8145 20.25H10.1855Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
