import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPlug({
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
          d="M6.54403 8.19176C6.73147 6.87971 7.72944 5.83039 9.03045 5.57741V5.57741C10.9918 5.19604 13.0082 5.19604 14.9695 5.57741V5.57741C16.2706 5.83039 17.2685 6.87971 17.456 8.19176L17.6096 9.26699C17.8685 11.0798 17.8685 12.9202 17.6096 14.733L17.5831 14.9186C17.3195 16.7632 15.9165 18.2385 14.0874 18.5941V18.5941C12.7087 18.8622 11.2913 18.8622 9.91257 18.5941V18.5941C8.0835 18.2385 6.68046 16.7632 6.41695 14.9186L6.39043 14.733C6.13146 12.9202 6.13146 11.0798 6.39043 9.26699L6.54403 8.19176Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path d="M9 2.5L9 5.5" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M15 2.5L15 5.5" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M12 19L12 22" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M10.5049 12L13.5049 12"
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
          d="M15.0006 1.75C15.4146 1.75021 15.7506 2.08592 15.7506 2.5V5.02441C17.0461 5.51777 17.9978 6.67905 18.1988 8.08496L18.3531 9.16016C18.6221 11.0432 18.6221 12.9558 18.3531 14.8389L18.3258 15.0244C18.017 17.185 16.3735 18.9134 14.231 19.3301C13.7413 19.4253 13.2465 19.4857 12.7506 19.5176V22C12.7506 22.4141 12.4146 22.7498 12.0006 22.75C11.5864 22.7499 11.2506 22.4142 11.2506 22V19.5176C10.7547 19.4857 10.2598 19.4253 9.77011 19.3301C7.62774 18.9134 5.98418 17.185 5.67538 15.0244L5.64901 14.8389C5.38001 12.9558 5.38003 11.0432 5.64901 9.16016L5.80233 8.08496C6.00331 6.67912 6.95527 5.51781 8.25058 5.02441V2.5C8.25058 2.08585 8.58645 1.7501 9.00058 1.75C9.41461 1.75021 9.75058 2.08592 9.75058 2.5V4.69727C11.2433 4.48932 12.7579 4.48937 14.2506 4.69727V2.5C14.2506 2.08585 14.5864 1.7501 15.0006 1.75ZM10.5055 11.25L10.4283 11.2539C10.0503 11.2925 9.75546 11.6118 9.75546 12C9.75546 12.3882 10.0503 12.7075 10.4283 12.7461L10.5055 12.75H13.5055C13.9195 12.7498 14.2555 12.4141 14.2555 12C14.2555 11.5859 13.9195 11.2502 13.5055 11.25H10.5055Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M10.5049 12.75L10.4277 12.7461C10.0498 12.7075 9.75488 12.3882 9.75488 12C9.75488 11.6118 10.0498 11.2925 10.4277 11.2539L10.5049 11.25L13.5049 11.25C13.9191 11.25 14.2549 11.5858 14.2549 12C14.2549 12.4142 13.9191 12.75 13.5049 12.75L10.5049 12.75Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
