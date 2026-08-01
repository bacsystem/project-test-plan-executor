import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiBarcode({
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
          d="M2.33154 14.9844C2.72233 18.5015 5.49878 21.2779 9.01589 21.6687"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M21.6687 9.01638C21.2779 5.49927 18.5015 2.72282 14.9844 2.33203"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M2.33154 9.01638C2.72233 5.49927 5.49878 2.72282 9.01589 2.33203"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M21.6687 14.9844C21.2779 18.5015 18.5015 21.2779 14.9844 21.6687"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9 9V15"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M6 9V15"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M15 9V9.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M15 12.5V15"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 9V11.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M18 9V9.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 14.5V15"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M18 12.5V15"
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
          d="M8.93252 1.58584C10.9706 1.35939 13.0282 1.35942 15.0663 1.58584C18.9318 2.01543 21.9832 5.06712 22.413 8.93252C22.6394 10.9706 22.6394 13.0282 22.413 15.0663C21.9834 18.9319 18.9319 21.9834 15.0663 22.413C13.0282 22.6394 10.9706 22.6394 8.93252 22.413C5.06712 21.9832 2.01543 18.9318 1.58584 15.0663C1.35942 13.0282 1.35939 10.9706 1.58584 8.93252C2.01555 5.06715 5.06715 2.01555 8.93252 1.58584ZM5.9999 8.2499C5.58568 8.2499 5.2499 8.58568 5.2499 8.9999V14.9999C5.24995 15.4141 5.58572 15.7499 5.9999 15.7499C6.41404 15.7498 6.74985 15.414 6.7499 14.9999V8.9999C6.7499 8.58572 6.41407 8.24995 5.9999 8.2499ZM8.9999 8.2499C8.58568 8.2499 8.2499 8.58568 8.2499 8.9999V14.9999C8.24995 15.4141 8.58572 15.7499 8.9999 15.7499C9.41404 15.7498 9.74985 15.414 9.7499 14.9999V8.9999C9.7499 8.58572 9.41407 8.24995 8.9999 8.2499ZM11.9999 13.7499C11.5857 13.7499 11.2499 14.0857 11.2499 14.4999V14.9999C11.25 15.4141 11.5857 15.7499 11.9999 15.7499C12.414 15.7498 12.7498 15.414 12.7499 14.9999V14.4999C12.7499 14.0857 12.4141 13.75 11.9999 13.7499ZM14.9999 11.7499C14.5857 11.7499 14.2499 12.0857 14.2499 12.4999V14.9999C14.25 15.4141 14.5857 15.7499 14.9999 15.7499C15.414 15.7498 15.7498 15.414 15.7499 14.9999V12.4999C15.7499 12.0857 15.4141 11.75 14.9999 11.7499ZM17.9999 11.7499C17.5857 11.7499 17.2499 12.0857 17.2499 12.4999V14.9999C17.25 15.4141 17.5857 15.7499 17.9999 15.7499C18.414 15.7498 18.7498 15.414 18.7499 14.9999V12.4999C18.7499 12.0857 18.4141 11.75 17.9999 11.7499ZM11.9999 8.2499C11.5857 8.2499 11.2499 8.58568 11.2499 8.9999V11.4999C11.25 11.9141 11.5857 12.2499 11.9999 12.2499C12.414 12.2498 12.7498 11.914 12.7499 11.4999V8.9999C12.7499 8.58572 12.4141 8.24995 11.9999 8.2499ZM14.9999 8.2499C14.5857 8.2499 14.2499 8.58568 14.2499 8.9999V9.4999C14.25 9.91407 14.5857 10.2499 14.9999 10.2499C15.414 10.2498 15.7498 9.91404 15.7499 9.4999V8.9999C15.7499 8.58572 15.4141 8.24995 14.9999 8.2499ZM17.9999 8.2499C17.5857 8.2499 17.2499 8.58568 17.2499 8.9999V9.4999C17.25 9.91407 17.5857 10.2499 17.9999 10.2499C18.414 10.2498 18.7498 9.91404 18.7499 9.4999V8.9999C18.7499 8.58572 18.4141 8.24995 17.9999 8.2499Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M6 8.25C6.41421 8.25 6.75 8.58579 6.75 9V15C6.75 15.4142 6.41421 15.75 6 15.75C5.58579 15.75 5.25 15.4142 5.25 15V9C5.25 8.58579 5.58579 8.25 6 8.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M9 8.25C9.41421 8.25 9.75 8.58579 9.75 9V15C9.75 15.4142 9.41421 15.75 9 15.75C8.58579 15.75 8.25 15.4142 8.25 15V9C8.25 8.58579 8.58579 8.25 9 8.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M12 13.75C12.4142 13.75 12.75 14.0858 12.75 14.5V15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V14.5C11.25 14.0858 11.5858 13.75 12 13.75Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M15 11.75C15.4142 11.75 15.75 12.0858 15.75 12.5V15C15.75 15.4142 15.4142 15.75 15 15.75C14.5858 15.75 14.25 15.4142 14.25 15V12.5C14.25 12.0858 14.5858 11.75 15 11.75Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M18 11.75C18.4142 11.75 18.75 12.0858 18.75 12.5V15C18.75 15.4142 18.4142 15.75 18 15.75C17.5858 15.75 17.25 15.4142 17.25 15V12.5C17.25 12.0858 17.5858 11.75 18 11.75Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.5C12.75 11.9142 12.4142 12.25 12 12.25C11.5858 12.25 11.25 11.9142 11.25 11.5V9C11.25 8.58579 11.5858 8.25 12 8.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M15 8.25C15.4142 8.25 15.75 8.58579 15.75 9V9.5C15.75 9.91421 15.4142 10.25 15 10.25C14.5858 10.25 14.25 9.91421 14.25 9.5V9C14.25 8.58579 14.5858 8.25 15 8.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M18 8.25C18.4142 8.25 18.75 8.58579 18.75 9V9.5C18.75 9.91421 18.4142 10.25 18 10.25C17.5858 10.25 17.25 9.91421 17.25 9.5V9C17.25 8.58579 17.5858 8.25 18 8.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
