import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEyeOpen({
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
          d="M2.75079 14.8441C1.67682 13.0989 1.67682 10.8978 2.75079 9.15255C6.99136 2.26165 17.0078 2.26165 21.2484 9.15255C22.3224 10.8978 22.3224 13.0989 21.2484 14.8441C17.0078 21.735 6.99136 21.735 2.75079 14.8441Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M11.0137 14.8356C10.0655 14.6776 9.32242 13.9345 9.16438 12.9863V12.9863C9.05555 12.3333 9.05555 11.6667 9.16438 11.0137V11.0137C9.32242 10.0655 10.0655 9.32242 11.0137 9.16438V9.16438C11.6667 9.05555 12.3333 9.05555 12.9863 9.16438V9.16438C13.9345 9.32242 14.6776 10.0655 14.8356 11.0137V11.0137C14.9445 11.6667 14.9445 12.3333 14.8356 12.9863V12.9863C14.6776 13.9345 13.9345 14.6776 12.9863 14.8356V14.8356C12.3333 14.9445 11.6667 14.9445 11.0137 14.8356V14.8356Z"
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
          d="M2.11294 8.76021C6.64637 1.39341 17.3539 1.39341 21.8874 8.76021C23.1093 10.7464 23.1096 13.2517 21.8874 15.2378C17.3539 22.6039 6.64654 22.6037 2.11294 15.2378C0.890682 13.2516 0.890797 10.7464 2.11294 8.76021ZM13.109 8.42427C12.3748 8.302 11.6245 8.30197 10.8903 8.42427C9.62638 8.63515 8.63536 9.6262 8.42446 10.8901C8.30212 11.6244 8.30218 12.3746 8.42446 13.1088C8.63523 14.3729 9.62626 15.3638 10.8903 15.5747C11.6245 15.697 12.3748 15.6969 13.109 15.5747C14.373 15.3638 15.364 14.3728 15.5749 13.1088C15.6971 12.3745 15.6972 11.6244 15.5749 10.8901C15.364 9.62613 14.373 8.6351 13.109 8.42427Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M10.8896 8.42477C11.624 8.30237 12.374 8.30247 13.1084 8.42477C14.3727 8.63548 15.3634 9.62631 15.5742 10.8906C15.6966 11.6251 15.6966 12.3749 15.5742 13.1093C15.3633 14.3735 14.3726 15.3645 13.1084 15.5752C12.374 15.6975 11.624 15.6976 10.8896 15.5752C9.62559 15.3643 8.63456 14.3734 8.4238 13.1093C8.30145 12.3749 8.30144 11.625 8.4238 10.8906C8.6345 9.62644 9.62554 8.63567 10.8896 8.42477Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
