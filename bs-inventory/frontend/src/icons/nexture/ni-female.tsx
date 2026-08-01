import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiFemale({
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
          d="M22 2L16 8M17.5 2.5L21.5 6.5"
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
          d="M15.4697 7.46967C15.1768 7.76256 15.1768 8.23732 15.4697 8.53022C15.7626 8.82311 16.2373 8.82311 16.5302 8.53022L19.4999 5.56049L20.9697 7.03022L21.0263 7.08197C21.3209 7.32228 21.7556 7.30482 22.0302 7.03022C22.3048 6.75561 22.3223 6.32089 22.082 6.02631L22.0302 5.96967L20.5605 4.49994L22.5302 2.53022C22.8231 2.23732 22.8231 1.76256 22.5302 1.46967C22.2373 1.17678 21.7626 1.17678 21.4697 1.46967L19.4999 3.4394L18.0302 1.96967C17.7373 1.67678 17.2626 1.67678 16.9697 1.96967C16.6951 2.24427 16.6776 2.67899 16.9179 2.97358L16.9697 3.03022L18.4394 4.49994L15.4697 7.46967Z"
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
