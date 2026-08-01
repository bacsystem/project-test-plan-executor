import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCheckFull({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M20 6L9.86221 17.5978C9.67192 17.8155 9.33719 17.8269 9.13254 17.6226L4 12.5"
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
          d="M20.493 5.43566C20.8049 5.70823 20.8368 6.18142 20.5643 6.49328L10.4266 18.0919C9.95087 18.6359 9.11396 18.664 8.60242 18.1534L3.46961 13.0314C3.17646 12.7388 3.17603 12.263 3.46863 11.9698C3.76124 11.6767 4.23699 11.6763 4.53015 11.9689L9.47351 16.9034L19.4354 5.50695C19.708 5.19513 20.1812 5.16318 20.493 5.43566Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
