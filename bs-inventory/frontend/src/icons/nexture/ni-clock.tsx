import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiClock({
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
          d="M12 8L12 12.7169C12 12.8925 11.9079 13.0553 11.7572 13.1457L9.5 14.5"
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
          d="M8.93253 1.58584C10.9706 1.35939 13.0282 1.35942 15.0663 1.58584C18.9318 2.01542 21.9833 5.06703 22.413 8.93252C22.6395 10.9707 22.6394 13.0281 22.413 15.0663C21.9835 18.932 18.932 21.9834 15.0663 22.413C13.0282 22.6394 10.9707 22.6394 8.93253 22.413C5.06707 21.9832 2.01537 18.9318 1.58585 15.0663C1.35942 13.0281 1.35939 10.9707 1.58585 8.93252C2.01551 5.0671 5.06714 2.01556 8.93253 1.58584ZM11.9999 7.2499C11.5857 7.2499 11.2499 7.58569 11.2499 7.9999V12.5751L9.11417 13.8563C8.75908 14.0694 8.64348 14.5305 8.85636 14.8856C9.05618 15.2186 9.47425 15.3412 9.81828 15.1796L9.88566 15.1435L12.1435 13.789L12.2773 13.6962C12.5737 13.461 12.7499 13.1009 12.7499 12.7167V7.9999C12.7499 7.58571 12.4141 7.24995 11.9999 7.2499Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M12.75 12.7168C12.75 13.1011 12.5738 13.4611 12.2773 13.6963L12.1436 13.7891L9.88574 15.1436L9.81836 15.1797C9.4743 15.3413 9.05624 15.2187 8.85644 14.8857C8.64357 14.5306 8.75917 14.0695 9.11426 13.8564L11.25 12.5752L11.25 8C11.25 7.58579 11.5858 7.25 12 7.25C12.4142 7.25 12.75 7.58579 12.75 8L12.75 12.7168Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
