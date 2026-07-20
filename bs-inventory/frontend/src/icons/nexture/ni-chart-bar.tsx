import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChartBar({
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
          d="M21 21L16.8283 21.4635C13.6193 21.8201 10.3807 21.8201 7.17167 21.4635V21.4635C4.73277 21.1925 2.80747 19.2672 2.53648 16.8283V16.8283C2.17992 13.6193 2.17992 10.3807 2.53648 7.17167L3 3"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M13.2501 9.00016C13.9404 9.00025 14.5 9.55988 14.5 10.2502L14.5 16.7501C14.5 17.4406 13.9402 18.0002 13.2498 18.0002V18.0002C12.5595 18.0001 11.9999 17.4404 11.9999 16.7501L11.9999 10.2502C11.9999 9.55975 12.5597 9.00007 13.2501 9.00016V9.00016Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M7.25 14C7.94035 14 8.5 14.5596 8.49999 15.25L8.49999 16.75C8.49998 17.4404 7.94034 18 7.24999 18V18C6.55964 18 6 17.4404 6 16.75L6 15.25C6 14.5596 6.55964 14 7.25 14V14Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M19.25 4C19.9404 4 20.5 4.55964 20.5 5.25L20.5 16.75C20.5 17.4404 19.9403 18 19.25 18V18C18.5596 18 18 17.4404 18 16.75L18 5.25C18 4.55964 18.5596 4 19.25 4V4Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
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
          d="M3.08255 2.25463C3.49423 2.30037 3.79138 2.67108 3.74564 3.08276L3.28177 7.25463C2.93139 10.4083 2.93139 13.5912 3.28177 16.7449C3.51402 18.8351 5.16421 20.4852 7.25443 20.7175C10.4084 21.068 13.5917 21.068 16.7456 20.7175L20.9175 20.2546C21.329 20.2091 21.6998 20.5052 21.7456 20.9167C21.7914 21.3284 21.4942 21.6991 21.0826 21.7449L16.9107 22.2087C13.6468 22.5714 10.3523 22.5714 7.08841 22.2087C4.30109 21.8988 2.10126 19.6983 1.79154 16.9109C1.42886 13.6468 1.42886 10.3527 1.79154 7.08861L2.25443 2.91674C2.30024 2.50523 2.67102 2.20904 3.08255 2.25463Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M7.25 13.25C8.35457 13.25 9.25 14.1454 9.25 15.25V16.75C9.24999 17.8546 8.35456 18.75 7.25 18.75C6.14543 18.75 5.25 17.8546 5.25 16.75V15.25C5.25 14.1454 6.14543 13.25 7.25 13.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M13.25 8.25C14.3544 8.25014 15.2499 9.14561 15.25 10.25V16.75C15.25 17.8546 14.3545 18.75 13.25 18.75C12.1455 18.7499 11.25 17.8545 11.25 16.75V10.25C11.2501 9.14548 12.1455 8.24998 13.25 8.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M19.25 3.25C20.3546 3.25 21.25 4.14543 21.25 5.25V16.75C21.25 17.8546 20.3546 18.75 19.25 18.75C18.1454 18.75 17.25 17.8546 17.25 16.75V5.25C17.25 4.14543 18.1454 3.25 19.25 3.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
