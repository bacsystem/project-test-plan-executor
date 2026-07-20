import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCheckSquare({
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
          d="M15 10L11.8423 13.5979C11.6514 13.8154 11.3162 13.8259 11.112 13.6206L9.5 12"
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
          d="M8.93252 1.58584C10.9706 1.35939 13.0282 1.35942 15.0663 1.58584C18.9319 2.01544 21.9834 5.06695 22.413 8.93252C22.6394 10.9707 22.6394 13.0281 22.413 15.0663C21.9833 18.9318 18.9319 21.9834 15.0663 22.413C13.0282 22.6394 10.9706 22.6394 8.93252 22.413C5.06715 21.9832 2.01549 18.9317 1.58584 15.0663C1.3594 13.0282 1.35941 10.9707 1.58584 8.93252C2.01544 5.06705 5.0671 2.01559 8.93252 1.58584ZM15.495 9.43643C15.2032 9.18034 14.7685 9.1914 14.4901 9.4501L14.4364 9.50478L11.455 12.9013L10.0321 11.4706C9.74004 11.1769 9.26429 11.1756 8.97061 11.4677C8.67704 11.7598 8.67565 12.2356 8.96768 12.5292L10.58 14.1493C11.0903 14.6621 11.9289 14.6364 12.4062 14.0927L15.5634 10.495L15.6112 10.4345C15.8317 10.1251 15.7864 9.69265 15.495 9.43643Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M15.4951 9.43632C15.7867 9.69252 15.8318 10.1249 15.6113 10.4344L15.5634 10.4949L12.4062 14.0926C11.9289 14.6365 11.0904 14.6623 10.58 14.1492L8.96774 12.5291C8.67568 12.2354 8.67702 11.7597 8.97067 11.4676C9.26435 11.1755 9.7401 11.1768 10.0322 11.4705L11.455 12.9012L14.4365 9.50468L14.4902 9.44999C14.7685 9.19129 15.2033 9.18024 15.4951 9.43632Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
