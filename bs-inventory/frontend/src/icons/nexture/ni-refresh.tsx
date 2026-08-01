import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiRefresh({
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
          opacity={oneTone ? 1 : 0.6}
          d="M4.24658 5.68421C6.08028 3.4358 8.87252 2 12.0001 2C17.5229 2 22.0001 6.47715 22.0001 12C22.0001 12.6849 21.9312 13.3538 21.8001 14"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M4 2L4 4.99995C4 5.55223 4.44771 5.99995 4.99998 5.99995L8 6"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M19.7534 18.3158C17.9197 20.5642 15.1275 22 11.9999 22C6.47705 22 1.9999 17.5228 1.9999 12C1.9999 11.3151 2.06876 10.6462 2.19994 10"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M20 22L20 19C20 18.4478 19.5523 18.0001 19 18L16 18"
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
          d="M21.2503 12C21.2503 6.8915 17.1087 2.75021 12.0003 2.75C9.10755 2.75 6.5248 4.07694 4.82741 6.1582C4.5657 6.47903 4.09369 6.5271 3.77272 6.26562C3.45173 6.00383 3.40351 5.53096 3.6653 5.20996C5.63532 2.79453 8.63792 1.25 12.0003 1.25C17.9371 1.25021 22.7503 6.06307 22.7503 12C22.7503 12.7353 22.6755 13.4544 22.5344 14.1494C22.4519 14.5552 22.0565 14.8177 21.6507 14.7354C21.2447 14.653 20.9823 14.2565 21.0647 13.8506C21.186 13.2533 21.2503 12.6345 21.2503 12Z"
          fill="currentColor"
        />
        <path
          d="M4 1.25011C3.58579 1.25011 3.25008 1.58582 3.25008 2.00003L3.25008 4.99971C3.25008 5.96617 4.03344 6.74947 4.99989 6.74953L8.00026 6.75022C8.41427 6.75008 8.75004 6.4143 8.75018 6.0003C8.75019 5.58617 8.41436 5.25052 8.00026 5.25038L4.99989 5.24969C4.86187 5.24963 4.74992 5.13775 4.74992 4.99971L4.74992 2.00003C4.74992 1.58582 4.41421 1.25011 4 1.25011Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M2.74974 12C2.74974 17.1085 6.89128 21.2498 11.9997 21.25C14.8925 21.25 17.4752 19.9231 19.1726 17.8418C19.4343 17.521 19.9063 17.4729 20.2273 17.7344C20.5483 17.9962 20.5965 18.469 20.3347 18.79C18.3647 21.2055 15.3621 22.75 11.9997 22.75C6.06285 22.7498 1.24974 17.9369 1.24974 12C1.24974 11.2647 1.32447 10.5456 1.46556 9.85059C1.54808 9.44484 1.94354 9.18232 2.34935 9.26465C2.75528 9.34705 3.01768 9.74348 2.93528 10.1494C2.81404 10.7467 2.74974 11.3655 2.74974 12Z"
          fill="currentColor"
        />
        <path
          d="M20 22.7499C20.4142 22.7499 20.7499 22.4142 20.7499 22L20.7499 19.0003C20.7499 18.0338 19.9666 17.2505 19.0001 17.2505L15.9997 17.2498C15.5857 17.2499 15.25 17.5857 15.2498 17.9997C15.2498 18.4138 15.5856 18.7495 15.9997 18.7496L19.0001 18.7503C19.1381 18.7504 19.2501 18.8623 19.2501 19.0003L19.2501 22C19.2501 22.4142 19.5858 22.7499 20 22.7499Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
