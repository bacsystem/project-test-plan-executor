import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiResearch({
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
        <path d="M22 22L18.5 18.5" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth={iconStrokeWidth} />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M6.49998 14.2109L9.16587 11.5453C9.35348 11.3577 9.65495 11.3493 9.85271 11.5261L11.1477 12.6843C11.3455 12.8612 11.647 12.8527 11.8346 12.6651L14.5 9.99951"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12.5 8.99994L15.0001 8.99999C15.2762 9 15.5001 9.22385 15.5001 9.49999L15.5001 12.0001"
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
          d="M11.5 1.25C17.1609 1.25 21.75 5.83908 21.75 11.5C21.75 14.0604 20.808 16.3989 19.2559 18.1953L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8231 21.7626 22.8231 21.4697 22.5303L18.1953 19.2559C16.3989 20.808 14.0604 21.75 11.5 21.75C5.83908 21.75 1.25 17.1609 1.25 11.5C1.25 5.83908 5.83908 1.25 11.5 1.25ZM12.5 8.25C12.0859 8.25009 11.75 8.58585 11.75 9C11.75 9.41413 12.0859 9.74991 12.5 9.75H13.6895L11.4717 11.9688L10.3525 10.9678C9.8582 10.526 9.10469 10.547 8.63574 11.0156L5.96973 13.6816C5.677 13.9745 5.67697 14.4493 5.96973 14.7422C6.2626 15.0346 6.7375 15.0348 7.03027 14.7422L9.5293 12.2441L10.6475 13.2441L10.7432 13.3223C11.2021 13.6581 11.8339 13.6402 12.2734 13.2793L12.3652 13.1963L14.749 10.8115L14.75 12C14.7502 12.414 15.086 12.7499 15.5 12.75C15.914 12.7498 16.2498 12.414 16.25 12L16.249 9.5C16.249 8.80967 15.6894 8.25001 14.999 8.25H12.5Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M14.9989 8.25C15.6893 8.25001 16.2489 8.80967 16.2489 9.5L16.2499 12C16.2497 12.414 15.9139 12.7498 15.4999 12.75C15.0858 12.75 14.7501 12.4141 14.7499 12L14.7489 10.8115L12.3651 13.1963L12.2733 13.2793C11.8338 13.6403 11.202 13.6581 10.7431 13.3223L10.6474 13.2441L9.5292 12.2441L7.03018 14.7422C6.73741 15.0349 6.26253 15.0347 5.96963 14.7422C5.67678 14.4493 5.6768 13.9745 5.96963 13.6816L8.63565 11.0156C9.10462 10.5469 9.85811 10.5259 10.3524 10.9678L11.4716 11.9688L13.6894 9.75H12.4999C12.0857 9.74999 11.7499 9.41418 11.7499 9C11.7499 8.5858 12.0857 8.25001 12.4999 8.25H14.9989Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
