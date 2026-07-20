import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiTrendUp({
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
          d="M16 6H20C20.5523 6 21 6.44772 21 7L21 11"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M2.99999 18L8.12132 12.8787C8.68393 12.3161 9.44699 12 10.2426 12L13.7574 12C14.553 12 15.3161 11.6839 15.8787 11.1213L20 7"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
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
          d="M15.2501 6C15.2501 5.58579 15.5858 5.25008 16 5.25008L19.9996 5.25008C20.9661 5.25008 21.7501 6.03408 21.7501 7.00058L21.7501 11.0002C21.75 11.4142 21.4143 11.75 21.0002 11.7501C20.586 11.7501 20.2504 11.4143 20.2503 11.0002L20.2496 6.99989C20.2495 6.86187 20.1376 6.74992 19.9996 6.74992L16 6.74992C15.5858 6.74992 15.2501 6.41421 15.2501 6Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M3.53033 18.5303C3.23744 18.8232 2.76268 18.8232 2.46978 18.5303C2.17689 18.2374 2.17689 17.7627 2.46978 17.4698L7.59088 12.3487C8.29403 11.6455 9.24785 11.2502 10.2422 11.2501L13.7579 11.2501C14.3544 11.2499 14.9268 11.0127 15.3487 10.5909L19.4698 6.46978C19.7627 6.17689 20.2374 6.17689 20.5303 6.46978C20.8232 6.76268 20.8232 7.23744 20.5303 7.53033L16.4092 11.6514C15.7061 12.3546 14.7523 12.7499 13.7579 12.7501L10.2422 12.7501C9.64567 12.7502 9.07327 12.9874 8.65142 13.4092L3.53033 18.5303Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
