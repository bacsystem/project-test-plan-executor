import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiButtonGroup({
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
          d="M16.1898 4.46553C19.0214 4.78016 21.2815 6.97074 21.6845 9.79121V9.79121C21.8938 11.2563 21.8938 12.7437 21.6845 14.2088V14.2088C21.2815 17.0293 19.0214 19.2198 16.1898 19.5345L15.3666 19.6259C13.1291 19.8745 10.8709 19.8745 8.63343 19.6259L7.81025 19.5345C4.97857 19.2198 2.71846 17.0293 2.31554 14.2088V14.2088C2.10624 12.7437 2.10624 11.2563 2.31554 9.79121V9.79121C2.71847 6.97074 4.97857 4.78016 7.81025 4.46553L8.63343 4.37406C10.8709 4.12545 13.1291 4.12545 15.3666 4.37406L16.1898 4.46553Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M10 5L10 19"
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
          d="M8.5502 3.62852C10.8426 3.37384 13.1572 3.37381 15.4496 3.62852L16.2729 3.71934C19.444 4.07192 21.9756 6.52569 22.4272 9.68419C22.6465 11.2194 22.6464 12.7789 22.4272 14.3141C21.9759 17.4729 19.4442 19.9262 16.2729 20.2789L15.4496 20.3707C13.1572 20.6254 10.8426 20.6254 8.5502 20.3707L7.72794 20.2789C4.55632 19.9265 2.02396 17.4731 1.57266 14.3141C1.35342 12.7789 1.35335 11.2194 1.57266 9.68419C2.0243 6.52555 4.55661 4.07171 7.72794 3.71934L8.5502 3.62852ZM9.99942 4.25059C9.58538 4.2508 9.24942 4.58651 9.24942 5.00059V19.0006L9.25333 19.0777C9.2921 19.4554 9.61154 19.7504 9.99942 19.7506C10.3874 19.7506 10.7067 19.4555 10.7455 19.0777L10.7494 19.0006V5.00059C10.7494 4.58638 10.4136 4.25059 9.99942 4.25059Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M10.75 19L10.7461 19.0771C10.7075 19.4551 10.3882 19.75 10 19.75C9.61183 19.75 9.29253 19.4551 9.25391 19.0771L9.25 19L9.25 5C9.25 4.58579 9.58579 4.25 10 4.25C10.4142 4.25 10.75 4.58579 10.75 5L10.75 19Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
