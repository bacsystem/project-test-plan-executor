import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSignalRight({
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
          opacity={oneTone ? 1 : 0.6}
          d="M4.12109 9.82812C4.97747 11.1127 4.97747 12.7862 4.12109 14.0708"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M8.12109 7.77832C9.80519 10.3045 9.80519 13.5954 8.12109 16.1216"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M12.1719 5.07129C14.9488 9.23667 14.9488 14.6632 12.1719 18.8286"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M15.8789 1.77832C19.9852 7.93777 19.9852 15.9621 15.8789 22.1216"
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
          opacity={oneTone ? 1 : 0.4}
          d="M3.70515 9.20417C4.04979 8.9744 4.51542 9.06753 4.74518 9.41218C5.76944 10.9486 5.7693 12.9499 4.74518 14.4864C4.51542 14.831 4.04979 14.9242 3.70515 14.6944C3.36067 14.4646 3.26742 13.9989 3.49714 13.6544C4.18536 12.6218 4.1855 11.2767 3.49714 10.2442C3.26737 9.89956 3.3605 9.43393 3.70515 9.20417Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M7.70515 7.15339C8.04979 6.92362 8.51542 7.01675 8.74518 7.3614C10.5972 10.1395 10.5972 13.7591 8.74518 16.5372L8.69929 16.5987C8.45756 16.8918 8.02812 16.9603 7.70515 16.7452C7.3605 16.5154 7.26737 16.0488 7.49714 15.7042C9.01305 13.43 9.0132 10.4675 7.49714 8.19343C7.26737 7.84878 7.3605 7.38315 7.70515 7.15339Z"
          fill="currentColor"
        />
        <path
          d="M12.796 19.2442C12.5662 19.5885 12.1004 19.6817 11.7559 19.4522C11.4113 19.2225 11.3182 18.7558 11.5479 18.4112L12.796 19.2442ZM11.7559 4.44636C12.1006 4.21659 12.5662 4.30972 12.796 4.65436C15.7408 9.07167 15.7408 14.8269 12.796 19.2442L12.1719 18.8272L11.5479 18.4112C14.1567 14.4978 14.1568 9.39974 11.5479 5.4864C11.3182 5.14175 11.4113 4.67612 11.7559 4.44636Z"
          fill="currentColor"
        />
        <path
          d="M15.463 1.15339C15.8076 0.923623 16.2732 1.01675 16.503 1.3614C20.7772 7.77277 20.7772 16.1258 16.503 22.5372L16.4571 22.5987C16.2154 22.8918 15.7859 22.9603 15.463 22.7452C15.1183 22.5154 15.0252 22.0488 15.2549 21.7042C19.1931 15.7967 19.1932 8.10083 15.2549 2.19343C15.0252 1.84878 15.1183 1.38315 15.463 1.15339Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
