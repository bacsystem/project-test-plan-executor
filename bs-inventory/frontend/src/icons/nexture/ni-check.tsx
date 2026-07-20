import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCheck({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M18 7.81836L11.0125 15.7798C10.8216 15.9974 10.4864 16.0079 10.2822 15.8026L6.5 12.0002"
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
          d="M18.4951 7.25492C18.7867 7.51112 18.8318 7.9435 18.6113 8.25297L18.5634 8.31352L11.5761 16.2745C11.0989 16.8182 10.2613 16.8446 9.75095 16.3321L5.96774 12.5293L5.91696 12.4717C5.67772 12.1766 5.69574 11.7426 5.97067 11.4688C6.26435 11.1767 6.74009 11.178 7.0322 11.4717L10.6259 15.083L17.4365 7.32328L17.4902 7.26859C17.7685 7.00989 18.2033 6.99884 18.4951 7.25492Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
