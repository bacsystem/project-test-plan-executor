import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSquircle({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M14.9841 2.33156C18.5012 2.72235 21.2776 5.4988 21.6684 9.01592V9.01592C21.8888 10.9992 21.8888 13.0008 21.6684 14.9841V14.9841C21.2776 18.5012 18.5012 21.2776 14.9841 21.6684V21.6684C13.0008 21.8888 10.9992 21.8888 9.01591 21.6684V21.6684C5.4988 21.2776 2.72235 18.5012 2.33156 14.9841V14.9841C2.1112 13.0008 2.1112 10.9992 2.33156 9.01591V9.01591C2.72236 5.4988 5.4988 2.72235 9.01592 2.33156V2.33156C10.9992 2.1112 13.0008 2.1112 14.9841 2.33156V2.33156Z"
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
          d="M8.93253 1.58585C10.9707 1.35938 13.0282 1.35943 15.0663 1.58585C18.9319 2.01535 21.9832 5.06706 22.413 8.93253C22.6395 10.9707 22.6394 13.0281 22.413 15.0663C21.9835 18.9321 18.9321 21.9835 15.0663 22.413C13.0281 22.6394 10.9707 22.6395 8.93253 22.413C5.06706 21.9832 2.01535 18.9319 1.58585 15.0663C1.35943 13.0282 1.35938 10.9707 1.58585 8.93253C2.01556 5.06716 5.06716 2.01556 8.93253 1.58585Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
