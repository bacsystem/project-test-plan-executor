import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiMinusSquare({
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
          d="M9.5 12H14.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
      </svg>
    );
  } else {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.93252 1.58584C10.9706 1.35939 13.0282 1.35942 15.0663 1.58584C18.9319 2.01544 21.9834 5.06695 22.413 8.93252C22.6394 10.9707 22.6394 13.0281 22.413 15.0663C21.9833 18.9318 18.9319 21.9834 15.0663 22.413C13.0282 22.6394 10.9706 22.6394 8.93252 22.413C5.06715 21.9832 2.01549 18.9317 1.58584 15.0663C1.3594 13.0282 1.35941 10.9707 1.58584 8.93252C2.01544 5.06705 5.0671 2.01559 8.93252 1.58584ZM9.49991 11.2499C9.08569 11.2499 8.74991 11.5857 8.74991 11.9999C8.74996 12.4141 9.08572 12.7499 9.49991 12.7499H14.4999C14.9141 12.7499 15.2499 12.414 15.2499 11.9999C15.2499 11.5857 14.9141 11.2499 14.4999 11.2499H9.49991Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M14.5 11.25C14.9142 11.25 15.25 11.5858 15.25 12C15.25 12.4142 14.9142 12.75 14.5 12.75H9.50001C9.08579 12.75 8.75001 12.4142 8.75 12C8.75 11.5858 9.08579 11.25 9.5 11.25H14.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
