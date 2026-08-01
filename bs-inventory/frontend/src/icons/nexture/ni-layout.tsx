import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiLayout({
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
          d="M14.9841 2.33156C18.5012 2.72235 21.2776 5.4988 21.6684 9.01592V9.01592C21.8888 10.9992 21.8888 13.0008 21.6684 14.9841V14.9841C21.2776 18.5012 18.5012 21.2776 14.9841 21.6684V21.6684C13.0008 21.8888 10.9992 21.8888 9.01591 21.6684V21.6684C5.4988 21.2776 2.72235 18.5012 2.33156 14.9841V14.9841C2.1112 13.0008 2.1112 10.9992 2.33156 9.01591V9.01591C2.72236 5.4988 5.4988 2.72235 9.01592 2.33156V2.33156C10.9992 2.1112 13.0008 2.1112 14.9841 2.33156V2.33156Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 3L12 12M12 21L12 12M3 12L12 12"
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
          d="M11.25 12.75V22.5723C10.4762 22.5514 9.70301 22.4987 8.93262 22.4131C5.06721 21.9833 2.01554 18.9319 1.58594 15.0664C1.50038 14.2964 1.44767 13.5235 1.42676 12.75H11.25Z"
          fill="currentColor"
        />
        <path
          d="M12.75 1.42578C13.5235 1.44669 14.2964 1.50039 15.0664 1.58594C18.932 2.01549 21.9835 5.06702 22.4131 8.93262C22.6395 10.9708 22.6395 13.0282 22.4131 15.0664C21.9834 18.932 18.932 21.9835 15.0664 22.4131C14.2964 22.4986 13.5235 22.5514 12.75 22.5723V1.42578Z"
          fill="currentColor"
        />
        <path
          d="M11.25 11.25H1.42676C1.44764 10.4762 1.50034 9.70302 1.58594 8.93262C2.01553 5.06715 5.0672 2.01569 8.93262 1.58594C9.70302 1.50034 10.4762 1.44666 11.25 1.42578V11.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M12.7505 22.5726V1.42614C12.2506 1.41263 11.7504 1.41265 11.2505 1.42614V11.2504H1.42725V12.7504H11.2505V22.5726H12.7505Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
