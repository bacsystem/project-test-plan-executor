import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPower({
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
          d="M19.5 5C21.0559 6.80373 22 9.17306 22 11.768C22 17.419 17.5228 22 12 22C6.47715 22 2 17.419 2 11.768C2 9.17306 2.94409 6.80373 4.5 5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 2L12 9"
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
          d="M1.25 11.7676C1.25011 8.98816 2.26157 6.4459 3.93164 4.50981C4.20219 4.19617 4.67659 4.16115 4.99023 4.43169C5.30387 4.70223 5.33889 5.17664 5.06836 5.49028C3.6268 7.16145 2.75011 9.35754 2.75 11.7676C2.75 17.0207 6.90749 21.25 12 21.25C17.0925 21.25 21.25 17.0207 21.25 11.7676C21.2499 9.50816 20.4794 7.43675 19.1953 5.80962L18.9316 5.49028L18.8848 5.42973C18.6667 5.11826 18.7157 4.68538 19.0098 4.43169C19.3037 4.17817 19.7385 4.19321 20.0146 4.45415L20.0684 4.50981L20.373 4.87993C21.8604 6.7647 22.7499 9.16175 22.75 11.7676C22.75 17.8165 17.9532 22.75 12 22.75C6.04682 22.75 1.25 17.8165 1.25 11.7676Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M12.75 9L12.7461 9.07715C12.7075 9.45512 12.3882 9.75 12 9.75C11.5858 9.75 11.25 9.41421 11.25 9L11.25 2C11.25 1.58579 11.5858 1.25 12 1.25C12.4142 1.25 12.75 1.58579 12.75 2L12.75 9Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
