import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiExclamationSquare({
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
          d="M12 8V13"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 15.5V16"
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
          d="M8.93252 1.58584C10.9706 1.35939 13.0282 1.35942 15.0663 1.58584C18.9319 2.01544 21.9834 5.06695 22.413 8.93252C22.6394 10.9707 22.6394 13.0281 22.413 15.0663C21.9833 18.9318 18.9319 21.9834 15.0663 22.413C13.0282 22.6394 10.9706 22.6394 8.93252 22.413C5.06715 21.9832 2.01549 18.9317 1.58584 15.0663C1.3594 13.0282 1.35941 10.9707 1.58584 8.93252C2.01544 5.06705 5.0671 2.01559 8.93252 1.58584ZM11.9999 14.7499C11.5857 14.7499 11.2499 15.0857 11.2499 15.4999V15.9999C11.25 16.4141 11.5857 16.7499 11.9999 16.7499C12.414 16.7499 12.7499 16.414 12.7499 15.9999V15.4999C12.7499 15.0857 12.4141 14.7499 11.9999 14.7499ZM11.9999 7.2499C11.5857 7.2499 11.2499 7.58569 11.2499 7.9999V12.9999C11.25 13.4141 11.5857 13.7499 11.9999 13.7499C12.414 13.7499 12.7499 13.414 12.7499 12.9999V7.9999C12.7499 7.58572 12.4141 7.24995 11.9999 7.2499Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M12 14.75C12.4142 14.75 12.75 15.0858 12.75 15.5V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V15.5C11.25 15.0858 11.5858 14.75 12 14.75Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V8C11.25 7.58579 11.5858 7.25 12 7.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
