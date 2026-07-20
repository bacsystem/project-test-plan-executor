import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSquare({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
        <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth={iconStrokeWidth} />
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
          d="M20 1.25C21.5188 1.25 22.75 2.48122 22.75 4V20C22.75 21.5188 21.5188 22.75 20 22.75H4C2.48122 22.75 1.25 21.5188 1.25 20V4C1.25 2.48122 2.48122 1.25 4 1.25H20Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
