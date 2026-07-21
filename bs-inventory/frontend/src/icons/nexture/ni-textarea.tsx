import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiTextarea({
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
          opacity={oneTone ? 1 : 0.6}
          d="M8 15L8 9M8 15L7 15M8 15L9 15M8 9L7 9M8 9L9 9"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.93252 1.58584C10.9706 1.35939 13.0282 1.35942 15.0663 1.58584C18.9319 2.01544 21.9834 5.06695 22.413 8.93252C22.6394 10.9707 22.6394 13.0281 22.413 15.0663C21.9833 18.9318 18.9319 21.9834 15.0663 22.413C13.0282 22.6394 10.9706 22.6394 8.93252 22.413C5.06715 21.9832 2.01549 18.9317 1.58584 15.0663C1.3594 13.0282 1.35941 10.9707 1.58584 8.93252C2.01544 5.06705 5.0671 2.01559 8.93252 1.58584ZM6.99991 8.2499C6.58569 8.2499 6.24991 8.58569 6.24991 8.9999C6.24996 9.41407 6.58572 9.7499 6.99991 9.7499H7.24991V14.2499H6.99991C6.58569 14.2499 6.24991 14.5857 6.24991 14.9999C6.24996 15.4141 6.58572 15.7499 6.99991 15.7499H8.99991C9.41405 15.7499 9.74986 15.414 9.74991 14.9999C9.74991 14.5857 9.41408 14.2499 8.99991 14.2499H8.74991V9.7499H8.99991C9.41405 9.74985 9.74986 9.41404 9.74991 8.9999C9.74991 8.58572 9.41408 8.24995 8.99991 8.2499H6.99991Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M9 9.75H8.75L8.75 14.25H9C9.41421 14.25 9.75 14.5858 9.75 15C9.75 15.4142 9.41421 15.75 9 15.75H7C6.58579 15.75 6.25 15.4142 6.25 15C6.25 14.5858 6.58579 14.25 7 14.25H7.25L7.25 9.75H7C6.58579 9.75 6.25 9.41421 6.25 9C6.25 8.58579 6.58579 8.25 7 8.25L9 8.25C9.41421 8.25 9.75 8.58579 9.75 9C9.75 9.41421 9.41421 9.75 9 9.75Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
