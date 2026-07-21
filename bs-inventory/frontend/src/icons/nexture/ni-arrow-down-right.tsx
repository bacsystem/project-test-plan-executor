import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiArrowDownRight({
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
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.9999 16.9998L15.9747 16.9998C16.527 16.9998 16.9747 16.5521 16.9747 15.9998L16.9748 11.9999"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M6.97461 7.0498L16.167 16.2422"
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
          d="M11.2499 16.9996C11.2499 17.3879 11.545 17.7076 11.9231 17.746L11.9998 17.7495L15.9745 17.7495C16.941 17.7495 17.7243 16.9662 17.7243 15.9997L17.725 11.9994C17.7249 11.5854 17.3891 11.2496 16.9751 11.2495C16.561 11.2495 16.2253 11.5853 16.2252 11.9994L16.2245 15.9997C16.2245 16.1377 16.1126 16.2497 15.9745 16.2497L11.9998 16.2497L11.9231 16.2531C11.545 16.2915 11.2499 16.6113 11.2499 16.9996Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M6.44427 7.58002L6.39248 7.5227C6.15253 7.22813 6.1698 6.79383 6.44428 6.51936C6.73717 6.22646 7.21204 6.22646 7.50494 6.51936L16.6973 15.7117C16.9902 16.0046 16.9902 16.4795 16.6973 16.7724C16.4044 17.0653 15.9296 17.0653 15.6367 16.7724L6.44427 7.58002Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
