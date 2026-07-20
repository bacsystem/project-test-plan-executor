import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiMoon({
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
          d="M4.74986 16.7432C7.32279 21.292 13.0213 22.8505 17.4777 20.2242C18.7341 19.4838 19.7577 18.4898 20.5222 17.3421C20.7792 16.9563 20.3537 16.4958 19.9155 16.6286C16.5806 17.6392 12.8806 16.2318 11.0648 13.0216C9.2491 9.81153 9.90502 5.83713 12.4299 3.39441C12.7616 3.07348 12.5837 2.46713 12.1279 2.50139C10.7719 2.60332 9.41671 3.01112 8.16028 3.75155C3.70381 6.3778 2.17692 12.1943 4.74986 16.7432Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 18.5L11.5 18.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9.5 16.5L8.5 16.5"
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
          d="M12.0713 1.75417C12.7106 1.70616 13.1437 2.13537 13.2881 2.5862C13.4259 3.0172 13.3423 3.55542 12.9512 3.93386C10.6686 6.14255 10.0728 9.74432 11.7178 12.6526C13.3602 15.556 16.6984 16.8203 19.6982 15.9114L19.7969 15.885C20.2904 15.7763 20.7594 15.9736 21.043 16.2962C21.3582 16.6551 21.4926 17.2382 21.1465 17.7581C20.3213 18.9968 19.2151 20.0708 17.8584 20.8704C13.0343 23.7131 6.87247 22.0196 4.09668 17.1126C1.32613 12.2141 2.96481 5.94331 7.7793 3.10573C9.13612 2.30616 10.6028 1.86463 12.0713 1.75417ZM11.5 17.7503L11.4229 17.7542C11.0449 17.7928 10.75 18.1121 10.75 18.5003C10.7501 18.8883 11.045 19.2077 11.4229 19.2464L11.5 19.2503H12C12.4141 19.2502 12.7499 18.9144 12.75 18.5003C12.75 18.0861 12.4142 17.7503 12 17.7503H11.5ZM8.5 15.7503C8.08579 15.7503 7.75 16.0861 7.75 16.5003C7.75012 16.9144 8.08586 17.2503 8.5 17.2503H9.5C9.91411 17.2502 10.2499 16.9144 10.25 16.5003C10.25 16.0861 9.91418 15.7503 9.5 15.7503H8.5Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M12 17.75C12.4142 17.75 12.75 18.0858 12.75 18.5C12.75 18.9142 12.4142 19.25 12 19.25H11.5L11.4229 19.2461C11.0449 19.2075 10.75 18.8882 10.75 18.5C10.75 18.1118 11.0449 17.7925 11.4229 17.7539L11.5 17.75H12Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M9.5 15.75C9.91421 15.75 10.25 16.0858 10.25 16.5C10.25 16.9142 9.91421 17.25 9.5 17.25H8.5C8.08579 17.25 7.75 16.9142 7.75 16.5C7.75 16.0858 8.08579 15.75 8.5 15.75H9.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
