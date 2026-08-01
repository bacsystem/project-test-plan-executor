import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCamera({
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
          d="M13.1499 5.44998C15.4347 5.77639 17.2578 7.54689 17.6373 9.82355V9.82355C17.8774 11.2646 17.8774 12.7354 17.6373 14.1765V14.1765C17.2578 16.4531 15.4347 18.2236 13.1499 18.55V18.55C11.0675 18.8475 8.93249 18.8475 6.85015 18.55V18.55C4.56529 18.2236 2.74218 16.4531 2.36274 14.1765V14.1765C2.12257 12.7354 2.12257 11.2646 2.36274 9.82355V9.82355C2.74218 7.54689 4.56528 5.77639 6.85014 5.44998V5.44998C8.93249 5.1525 11.0675 5.1525 13.1499 5.44998V5.44998Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M18 9L20.3778 8.32064C20.9676 8.15212 21.5687 8.54946 21.6448 9.15813L21.7829 10.2635C21.9271 11.4167 21.9271 12.5833 21.7829 13.7365L21.6448 14.8419C21.5687 15.4505 20.9676 15.8479 20.3778 15.6794L18 15"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M13 10L12 10"
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
          d="M6.74447 4.70716C8.89694 4.3997 11.1037 4.39969 13.2562 4.70716C15.8622 5.07954 17.9436 7.09944 18.3773 9.70032C18.631 11.2227 18.6309 12.7775 18.3773 14.2999C17.9436 16.9009 15.8623 18.9197 13.2562 19.2921C11.1036 19.5996 8.89703 19.5996 6.74447 19.2921C4.13837 18.9197 2.05703 16.9009 1.62337 14.2999C1.3697 12.7775 1.36966 11.2227 1.62337 9.70032C2.05711 7.09944 4.1384 5.07952 6.74447 4.70716ZM12.0003 9.25013L11.9232 9.25403C11.5452 9.29265 11.2504 9.61202 11.2503 10.0001C11.2503 10.3883 11.5452 10.7076 11.9232 10.7462L12.0003 10.7501H13.0003C13.4145 10.75 13.7503 10.4143 13.7503 10.0001C13.7503 9.58602 13.4144 9.25021 13.0003 9.25013H12.0003Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M20.1719 7.59917C21.2037 7.30461 22.2553 8.00026 22.3887 9.06499L22.5273 10.1705C22.6791 11.3849 22.6791 12.6142 22.5273 13.8287L22.3887 14.9341C22.2555 15.9992 21.204 16.6947 20.1719 16.4L19.3887 16.1763C19.6017 15.6599 19.7617 15.1148 19.8564 14.5464C20.1373 12.861 20.1373 11.1382 19.8564 9.45269C19.7616 8.88401 19.6019 8.33855 19.3887 7.82183L20.1719 7.59917Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M12 10.75L11.9229 10.7461C11.5449 10.7075 11.25 10.3882 11.25 10C11.25 9.61183 11.5449 9.29253 11.9229 9.25391L12 9.25L13 9.25C13.4142 9.25 13.75 9.58579 13.75 10C13.75 10.4142 13.4142 10.75 13 10.75L12 10.75Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
