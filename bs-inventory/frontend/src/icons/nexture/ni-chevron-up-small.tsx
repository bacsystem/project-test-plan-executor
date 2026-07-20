import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChevronUpSmall({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M16 14L12.8485 10.8485C12.3799 10.3799 11.6201 10.3799 11.1515 10.8485L8 14"
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
          d="M16.5303 14.5303C16.8232 14.2374 16.8232 13.7627 16.5303 13.4698L13.379 10.3184C12.6174 9.55689 11.3827 9.55689 10.6212 10.3184L7.46978 13.4698C7.17689 13.7627 7.17689 14.2374 7.46978 14.5303C7.76268 14.8232 8.23744 14.8232 8.53033 14.5303L11.6817 11.379C11.8574 11.2032 12.1427 11.2032 12.3184 11.379L15.4698 14.5303C15.7627 14.8232 16.2374 14.8232 16.5303 14.5303Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
