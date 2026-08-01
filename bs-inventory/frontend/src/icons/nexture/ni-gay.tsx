import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiGay({
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
          d="M22 2L18 2M22 2L22 6M22 2L18 6M16 8L18 6M18 6L19.5 7.5M18 6L16.5 4.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="14" r="8" stroke="currentColor" strokeWidth={iconStrokeWidth} />
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
          opacity={oneTone ? 1 : 0.4}
          d="M15.4697 7.46973C15.1768 7.76262 15.1768 8.23738 15.4697 8.53027C15.7626 8.82317 16.2373 8.82317 16.5302 8.53027L17.9999 7.06055L18.9697 8.03027L19.0263 8.08203C19.3209 8.32234 19.7556 8.30488 20.0302 8.03027C20.3048 7.75567 20.3223 7.32095 20.082 7.02637L20.0302 6.96973L19.0605 6L21.2499 3.81055L21.2499 6L21.2538 6.07715C21.2925 6.45512 21.6118 6.75 21.9999 6.75C22.3881 6.75 22.7074 6.45512 22.746 6.07715L22.7499 6L22.7499 2C22.7499 1.80109 22.6709 1.61038 22.5302 1.46973C22.3896 1.32907 22.1989 1.25 21.9999 1.25L17.9999 1.25C17.5857 1.25 17.2499 1.58579 17.2499 2C17.2499 2.41421 17.5857 2.75 17.9999 2.75L20.1894 2.75L17.9999 4.93945L17.0302 3.96973L16.9736 3.91797C16.679 3.67766 16.2443 3.69512 15.9697 3.96973C15.6768 4.26262 15.6768 4.73738 15.9697 5.03027L16.9394 6L15.4697 7.46973Z"
          fill="currentColor"
        />
        <path
          d="M10 5.25C14.8325 5.25 18.75 9.16751 18.75 14C18.75 18.8325 14.8325 22.75 10 22.75C5.16751 22.75 1.25 18.8325 1.25 14C1.25 9.16751 5.16751 5.25 10 5.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
