import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCursor({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M4.83907 2.22168C3.39713 2.22168 2.22168 3.39713 2.22168 4.83907C2.22168 10.4698 4.04798 15.9705 7.42645 20.4751C8.74122 22.2281 11.5016 21.6707 12.033 19.5448L13.2443 14.6996C13.4235 13.983 13.983 13.4235 14.6996 13.2443L19.5448 12.033C21.6707 11.5016 22.2281 8.74122 20.4751 7.42644C15.9704 4.04797 10.4699 2.22168 4.83907 2.22168Z"
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
          d="M4.83887 1.47168C10.6311 1.47168 16.2899 3.35017 20.9248 6.82617C23.1831 8.51987 22.4651 12.0761 19.7266 12.7607L14.8818 13.9717C14.4341 14.0837 14.0836 14.4341 13.9717 14.8818L12.7607 19.7266C12.0761 22.4651 8.51985 23.183 6.82617 20.9248C3.35015 16.2899 1.47168 10.6311 1.47168 4.83887C1.47179 2.98296 2.98299 1.47192 4.83887 1.47168Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
