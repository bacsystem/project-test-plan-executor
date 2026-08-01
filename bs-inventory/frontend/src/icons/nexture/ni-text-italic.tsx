import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiTextItalic({
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
        <path d="M9 20.5L15 3.5" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M13 2.5C13.2553 2.75987 13.5633 2.94585 13.9033 3.0309C14.627 3.21192 15.373 3.21192 16.0967 3.0309C16.4367 2.94585 16.7447 2.75987 17 2.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M7 21.5C7.25528 21.2401 7.56326 21.0542 7.90332 20.9691C8.62701 20.7881 9.37299 20.7881 10.0967 20.9691C10.4367 21.0542 10.7447 21.2401 11 21.5"
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
          d="M8.29298 20.25C8.15517 20.6405 8.35968 21.069 8.75002 21.207C9.14048 21.3449 9.56903 21.1404 9.70705 20.75L15.707 3.75001C15.8449 3.35955 15.6403 2.931 15.25 2.79298C14.8596 2.65517 14.431 2.85968 14.293 3.25001L8.29298 20.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M16.4646 1.97449C16.7548 1.67906 17.2297 1.67462 17.5252 1.96473C17.8206 2.25495 17.825 2.72978 17.5349 3.02527C17.1938 3.37253 16.7666 3.63648 16.2781 3.75867C15.4352 3.96944 14.5644 3.96944 13.7215 3.75867C13.2939 3.65172 12.9134 3.43612 12.5965 3.15125L12.4646 3.02527L12.4138 2.96766C12.1764 2.67096 12.1974 2.2368 12.4744 1.96473C12.7515 1.69269 13.1859 1.67973 13.4783 1.92274L13.5349 1.97449L13.6658 2.09168C13.7993 2.19703 13.9412 2.26766 14.0847 2.30359C14.6889 2.45472 15.3106 2.45472 15.9148 2.30359C16.1063 2.25565 16.2953 2.1468 16.4646 1.97449Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M10.4646 22.0255C10.7548 22.3209 11.2297 22.3254 11.5252 22.0353C11.8206 21.7451 11.825 21.2702 11.5349 20.9747C11.1938 20.6275 10.7666 20.3635 10.2781 20.2413C9.43518 20.0306 8.56438 20.0306 7.72146 20.2413C7.29387 20.3483 6.91341 20.5639 6.59646 20.8487L6.46462 20.9747L6.41384 21.0323C6.17639 21.329 6.19744 21.7632 6.47439 22.0353C6.75148 22.3073 7.18592 22.3203 7.4783 22.0773L7.53494 22.0255L7.6658 21.9083C7.79933 21.803 7.94122 21.7323 8.08474 21.6964C8.68894 21.5453 9.31062 21.5453 9.91482 21.6964C10.1063 21.7443 10.2953 21.8532 10.4646 22.0255Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
