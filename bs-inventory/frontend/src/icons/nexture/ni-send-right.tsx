import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSendRight({
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
          d="M20.4054 15.0556C16.2581 18.5808 10.9582 20.5982 5.51804 20.7737C2.75443 20.8628 1.07276 17.6924 2.77033 15.5098L4.54508 13.2279C5.10681 12.5057 5.10681 11.4944 4.54508 10.7722L2.77033 8.49037C1.07276 6.30777 2.75443 3.1373 5.51805 3.22645C10.9582 3.40194 16.2581 5.41937 20.4054 8.94454C22.2894 10.5459 22.2894 13.4542 20.4054 15.0556Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M5.5 12L10 12"
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
          d="M5.54181 2.47682C11.1489 2.6577 16.612 4.73675 20.8904 8.37331C23.1266 10.2742 23.1267 13.7264 20.8904 15.6272C16.6121 19.2634 11.1486 21.3428 5.54181 21.5237C2.17358 21.6318 0.0739249 17.7563 2.17853 15.0491L3.95294 12.7678C4.30394 12.3166 4.30378 11.6841 3.95294 11.2327L2.17853 8.95143C0.0729057 6.2442 2.17323 2.3687 5.54181 2.47682ZM5.49982 11.2493C5.08582 11.2494 4.74996 11.5853 4.74982 11.9993C4.74982 12.4134 5.08573 12.7491 5.49982 12.7493H9.99982L10.077 12.7454C10.4549 12.7068 10.7498 12.3875 10.7498 11.9993C10.7497 11.6112 10.4549 11.2918 10.077 11.2532L9.99982 11.2493H5.49982Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M10 11.25L10.0771 11.2539C10.4551 11.2925 10.75 11.6118 10.75 12C10.75 12.3882 10.4551 12.7075 10.0771 12.7461L10 12.75H5.5C5.08579 12.75 4.75 12.4142 4.75 12C4.75 11.5858 5.08579 11.25 5.5 11.25H10Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
