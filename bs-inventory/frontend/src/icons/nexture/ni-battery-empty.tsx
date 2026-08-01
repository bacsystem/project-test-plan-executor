import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiBatteryEmpty({
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
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.1499 5.44998C15.4347 5.77639 17.2578 7.54689 17.6373 9.82355V9.82355C17.8774 11.2646 17.8774 12.7354 17.6373 14.1765V14.1765C17.2578 16.4531 15.4347 18.2236 13.1499 18.55V18.55C11.0675 18.8475 8.93249 18.8475 6.85015 18.55V18.55C4.56529 18.2236 2.74218 16.4531 2.36274 14.1765V14.1765C2.12257 12.7354 2.12257 11.2646 2.36274 9.82355V9.82355C2.74218 7.54689 4.56528 5.77639 6.85014 5.44998V5.44998C8.93249 5.1525 11.0675 5.1525 13.1499 5.44998V5.44998Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M17.5 9H19.7924C20.5136 9 21.1538 9.46147 21.3819 10.1456V10.1456C21.7831 11.3493 21.7831 12.6507 21.3819 13.8544V13.8544C21.1538 14.5385 20.5136 15 19.7924 15H17.5"
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
          d="M6.74401 4.70718C8.89656 4.3997 11.1032 4.39968 13.2557 4.70718C15.8619 5.07957 17.9432 7.09932 18.3768 9.70035C18.6306 11.2228 18.6305 12.7775 18.3768 14.3C17.9432 16.9009 15.8618 18.9197 13.2557 19.2922C11.1031 19.5997 8.89662 19.5996 6.74401 19.2922C4.1378 18.9198 2.05658 16.901 1.62291 14.3C1.36919 12.7775 1.36918 11.2228 1.62291 9.70035C2.05657 7.0993 4.13779 5.07949 6.74401 4.70718Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M19.792 8.25C20.8359 8.25 21.7636 8.91785 22.0938 9.9082C22.5463 11.2658 22.5463 12.7342 22.0938 14.0918C21.7636 15.0821 20.8359 15.75 19.792 15.75H19.5518C19.6846 15.3626 19.7874 14.9608 19.8564 14.5469C20.1373 12.8614 20.1372 11.1396 19.8564 9.4541C19.7874 9.04001 19.6846 8.63757 19.5518 8.25H19.792Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
