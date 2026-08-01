import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiFaceSmileMore({
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
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={iconStrokeWidth} />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9 10L9 9"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M15 10L15 9"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M17.1318 14C15.3256 18.6556 8.67434 18.6556 6.86816 14"
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
          d="M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25ZM17.4033 13.3008C17.0173 13.1512 16.5825 13.3427 16.4326 13.7285C14.8984 17.683 9.30463 17.7449 7.64355 13.9141L7.56738 13.7285L7.53613 13.6582C7.36339 13.32 6.95847 13.1605 6.59668 13.3008C6.23504 13.4413 6.04388 13.832 6.14453 14.1982L6.16895 14.2715L6.26953 14.5156C8.45792 19.5636 15.8093 19.4824 17.8311 14.2715C17.9807 13.8855 17.7892 13.4507 17.4033 13.3008ZM9 8.25C8.58596 8.2502 8.25 8.58591 8.25 9V10C8.25 10.4141 8.58596 10.7498 9 10.75C9.41414 10.7499 9.75 10.4142 9.75 10V9C9.75 8.58584 9.41414 8.25009 9 8.25ZM15 8.25C14.586 8.2502 14.25 8.58591 14.25 9V10C14.25 10.4141 14.586 10.7498 15 10.75C15.4141 10.7499 15.75 10.4142 15.75 10V9C15.75 8.58584 15.4141 8.25009 15 8.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M16.4325 13.7285C16.5823 13.3426 17.0172 13.1512 17.4032 13.3008C17.7892 13.4507 17.9806 13.8854 17.8309 14.2715C15.8091 19.4824 8.45773 19.5637 6.26937 14.5156L6.16879 14.2715L6.14437 14.1982C6.04372 13.832 6.23488 13.4413 6.59652 13.3008C6.95834 13.1604 7.3632 13.3199 7.53597 13.6582L7.56722 13.7285L7.6434 13.9141C9.30444 17.745 14.8983 17.683 16.4325 13.7285Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M8.99984 8.25C9.41405 8.25 9.74984 8.58579 9.74984 9V10C9.74984 10.4142 9.41405 10.75 8.99984 10.75C8.5858 10.7498 8.24984 10.4141 8.24984 10V9C8.24984 8.58591 8.5858 8.2502 8.99984 8.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M14.9998 8.25C15.4141 8.25 15.7498 8.58579 15.7498 9V10C15.7498 10.4142 15.4141 10.75 14.9998 10.75C14.5858 10.7498 14.2498 10.4141 14.2498 10V9C14.2498 8.58591 14.5858 8.2502 14.9998 8.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
