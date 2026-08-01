import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCross({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M8.00016 8L12.0001 12M12.0001 12L16 16.0002M12.0001 12L16 8.00015M12.0001 12L8 16.0002"
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
          d="M15.4698 7.46963C15.7626 7.17684 16.2374 7.17684 16.5303 7.46963C16.8232 7.7625 16.8231 8.23728 16.5303 8.53018L13.0606 11.9999L16.5303 15.4696C16.8232 15.7625 16.8231 16.2373 16.5303 16.5302C16.2557 16.8048 15.821 16.8223 15.5264 16.5819L15.4698 16.5302L12 13.0604L8.53032 16.5302C8.23743 16.8231 7.76267 16.8231 7.46977 16.5302C7.17697 16.2373 7.17691 15.7625 7.46977 15.4696L10.9395 11.9999L7.46977 8.53018L7.41801 8.47354C7.1778 8.17898 7.19527 7.74421 7.46977 7.46963C7.76264 7.17676 8.23742 7.17682 8.53032 7.46963L12 10.9394L15.4698 7.46963Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
