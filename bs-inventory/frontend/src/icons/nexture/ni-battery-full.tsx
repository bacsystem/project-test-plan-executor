import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiBatteryFull({
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
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M7 10L7 14"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M10 10L10 14"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M13 10L13 14"
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
          d="M19.792 8.25C20.8359 8.25 21.7636 8.91785 22.0938 9.9082C22.5463 11.2658 22.5463 12.7342 22.0938 14.0918C21.7636 15.0821 20.8359 15.75 19.792 15.75H19.5518C19.6846 15.3626 19.7874 14.9608 19.8564 14.5469C20.1373 12.8614 20.1372 11.1396 19.8564 9.4541C19.7874 9.04001 19.6846 8.63757 19.5518 8.25H19.792Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.74447 4.70715C8.89693 4.39973 11.1037 4.39967 13.2562 4.70715C15.8622 5.07962 17.9436 7.09948 18.3773 9.70032C18.631 11.2227 18.6309 12.7776 18.3773 14.2999C17.9436 16.9008 15.8621 18.9196 13.2562 19.2921C11.1037 19.5996 8.89701 19.5996 6.74447 19.2921C4.13826 18.9198 2.05705 16.901 1.62338 14.2999C1.3697 12.7775 1.36967 11.2227 1.62338 9.70032C2.05716 7.09943 4.13836 5.07946 6.74447 4.70715ZM7.00033 9.25012C6.58616 9.25012 6.2504 9.58597 6.25033 10.0001V14.0001C6.25033 14.4143 6.58612 14.7501 7.00033 14.7501C7.41448 14.75 7.75033 14.4143 7.75033 14.0001V10.0001C7.75026 9.58602 7.41443 9.2502 7.00033 9.25012ZM10.0003 9.25012C9.58616 9.25012 9.2504 9.58597 9.25033 10.0001V14.0001C9.25033 14.4143 9.58612 14.7501 10.0003 14.7501C10.4145 14.75 10.7503 14.4143 10.7503 14.0001V10.0001C10.7503 9.58602 10.4144 9.2502 10.0003 9.25012ZM13.0003 9.25012C12.5862 9.25012 12.2504 9.58597 12.2503 10.0001V14.0001C12.2503 14.4143 12.5861 14.7501 13.0003 14.7501C13.4145 14.75 13.7503 14.4143 13.7503 14.0001V10.0001C13.7503 9.58602 13.4144 9.2502 13.0003 9.25012Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M7 9.25C7.41421 9.25 7.75 9.58579 7.75 10V14C7.75 14.4142 7.41421 14.75 7 14.75C6.58579 14.75 6.25 14.4142 6.25 14V10C6.25 9.58579 6.58579 9.25 7 9.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M10 9.25C10.4142 9.25 10.75 9.58579 10.75 10V14C10.75 14.4142 10.4142 14.75 10 14.75C9.58579 14.75 9.25 14.4142 9.25 14V10C9.25 9.58579 9.58579 9.25 10 9.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M13 9.25C13.4142 9.25 13.75 9.58579 13.75 10V14C13.75 14.4142 13.4142 14.75 13 14.75C12.5858 14.75 12.25 14.4142 12.25 14V10C12.25 9.58579 12.5858 9.25 13 9.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
