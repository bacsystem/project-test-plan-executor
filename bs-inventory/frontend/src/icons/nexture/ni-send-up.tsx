import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSendUp({
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
          d="M15.0556 3.59464C18.5808 7.74189 20.5982 13.0418 20.7737 18.482C20.8628 21.2456 17.6924 22.9272 15.5098 21.2297L13.2279 19.4549C12.5057 18.8932 11.4944 18.8932 10.7722 19.4549L8.49037 21.2297C6.30777 22.9272 3.1373 21.2456 3.22645 18.482C3.40194 13.0418 5.41937 7.74189 8.94454 3.59464C10.5459 1.71064 13.4542 1.71064 15.0556 3.59464Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 18.5L12 14"
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
          d="M8.37282 3.10888C10.2737 0.872547 13.7258 0.872574 15.6267 3.10888C19.2632 7.38731 21.3423 12.8505 21.5232 18.4575C21.6315 21.8262 17.7559 23.9263 15.0486 21.8208L12.7674 20.0464C12.316 19.6953 11.6836 19.6953 11.2322 20.0464L8.95095 21.8208C6.24369 23.9262 2.36809 21.8261 2.47634 18.4575C2.65722 12.8506 4.73638 7.38729 8.37282 3.10888ZM11.9998 13.2495C11.6118 13.2496 11.2924 13.5446 11.2537 13.9224L11.2498 13.9995V18.4995C11.2498 18.9136 11.5857 19.2494 11.9998 19.2495C12.414 19.2495 12.7498 18.9137 12.7498 18.4995V13.9995L12.7459 13.9224C12.7071 13.5445 12.3879 13.2495 11.9998 13.2495Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M11.25 14L11.2539 13.9229C11.2925 13.5449 11.6118 13.25 12 13.25C12.3882 13.25 12.7075 13.5449 12.7461 13.9229L12.75 14L12.75 18.5C12.75 18.9142 12.4142 19.25 12 19.25C11.5858 19.25 11.25 18.9142 11.25 18.5L11.25 14Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
