import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiButtonLarge({
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
          d="M7.5 12L8.5 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M11.5 12L12.5 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M15.5 12H16.5"
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
          d="M8.93252 1.58584C10.9706 1.35939 13.0282 1.35942 15.0663 1.58584C18.9319 2.01544 21.9834 5.06695 22.413 8.93252C22.6394 10.9707 22.6394 13.0281 22.413 15.0663C21.9833 18.9318 18.9319 21.9834 15.0663 22.413C13.0282 22.6394 10.9706 22.6394 8.93252 22.413C5.06715 21.9832 2.01549 18.9317 1.58584 15.0663C1.3594 13.0282 1.35941 10.9707 1.58584 8.93252C2.01544 5.06705 5.0671 2.01559 8.93252 1.58584ZM7.49991 11.2499C7.08569 11.2499 6.74991 11.5857 6.74991 11.9999C6.74996 12.4141 7.08573 12.7499 7.49991 12.7499H8.49991L8.57706 12.746C8.95496 12.7073 9.24986 12.388 9.24991 11.9999C9.24991 11.6118 8.95498 11.2925 8.57706 11.2538L8.49991 11.2499H7.49991ZM11.4999 11.2499C11.0857 11.2499 10.7499 11.5857 10.7499 11.9999C10.75 12.4141 11.0857 12.7499 11.4999 12.7499H12.4999L12.5771 12.746C12.955 12.7073 13.2499 12.388 13.2499 11.9999C13.2499 11.6118 12.955 11.2925 12.5771 11.2538L12.4999 11.2499H11.4999ZM15.4999 11.2499C15.0857 11.2499 14.7499 11.5857 14.7499 11.9999C14.75 12.4141 15.0857 12.7499 15.4999 12.7499H16.4999L16.5771 12.746C16.955 12.7073 17.2499 12.388 17.2499 11.9999C17.2499 11.6118 16.955 11.2925 16.5771 11.2538L16.4999 11.2499H15.4999Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M8.57715 11.2539C8.95512 11.2925 9.25 11.6118 9.25 12C9.25 12.3882 8.95512 12.7075 8.57715 12.7461L8.5 12.75H7.5C7.08579 12.75 6.75 12.4142 6.75 12C6.75 11.5858 7.08579 11.25 7.5 11.25H8.5L8.57715 11.2539Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M12.5771 11.2539C12.9551 11.2925 13.25 11.6118 13.25 12C13.25 12.3882 12.9551 12.7075 12.5771 12.7461L12.5 12.75H11.5C11.0858 12.75 10.75 12.4142 10.75 12C10.75 11.5858 11.0858 11.25 11.5 11.25H12.5L12.5771 11.2539Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M16.5771 11.2539C16.9551 11.2925 17.25 11.6118 17.25 12C17.25 12.3882 16.9551 12.7075 16.5771 12.7461L16.5 12.75H15.5C15.0858 12.75 14.75 12.4142 14.75 12C14.75 11.5858 15.0858 11.25 15.5 11.25H16.5L16.5771 11.2539Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
