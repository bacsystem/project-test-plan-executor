import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSendLeft({
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
          d="M3.59464 15.0556C7.74189 18.5808 13.0418 20.5982 18.482 20.7737C21.2456 20.8628 22.9272 17.6924 21.2297 15.5098L19.4549 13.2279C18.8932 12.5057 18.8932 11.4944 19.4549 10.7722L21.2297 8.49037C22.9272 6.30777 21.2456 3.1373 18.482 3.22645C13.0418 3.40194 7.74189 5.41937 3.59464 8.94454C1.71064 10.5459 1.71064 13.4542 3.59464 15.0556Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M18.5 12L14 12"
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
          d="M18.4582 2.47682C12.8511 2.6577 7.388 4.73675 3.10956 8.37331C0.873369 10.2742 0.87326 13.7264 3.10956 15.6272C7.38791 19.2634 12.8514 21.3428 18.4582 21.5237C21.8264 21.6318 23.9261 17.7563 21.8215 15.0491L20.0471 12.7678C19.6961 12.3166 19.6962 11.6841 20.0471 11.2327L21.8215 8.95143C23.9271 6.2442 21.8268 2.3687 18.4582 2.47682ZM18.5002 11.2493C18.9142 11.2494 19.25 11.5853 19.2502 11.9993C19.2502 12.4134 18.9143 12.7491 18.5002 12.7493H14.0002L13.923 12.7454C13.5451 12.7068 13.2502 12.3875 13.2502 11.9993C13.2503 11.6112 13.5451 11.2918 13.923 11.2532L14.0002 11.2493H18.5002Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M14 11.25L13.9229 11.2539C13.5449 11.2925 13.25 11.6118 13.25 12C13.25 12.3882 13.5449 12.7075 13.9229 12.7461L14 12.75H18.5C18.9142 12.75 19.25 12.4142 19.25 12C19.25 11.5858 18.9142 11.25 18.5 11.25H14Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
