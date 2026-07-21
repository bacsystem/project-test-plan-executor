import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEnterUp({
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
          d="M12.5 8L15.2929 5.20711C15.6834 4.81658 16.3166 4.81658 16.7071 5.20711L19.5 8"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16 5.5L16 15C16 17.2091 14.2091 19 12 19L5 19"
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
          d="M11.9697 8.53033C11.6768 8.23744 11.6768 7.76268 11.9697 7.46978L14.7626 4.67681C15.446 3.9935 16.5538 3.9935 17.2372 4.67681L20.0302 7.46978C20.3231 7.76268 20.3231 8.23744 20.0302 8.53033C19.7373 8.82322 19.2626 8.82322 18.9697 8.53033L16.1767 5.73736C16.0791 5.63983 15.9208 5.63983 15.8232 5.73736L13.0302 8.53033C12.7373 8.82322 12.2626 8.82322 11.9697 8.53033Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M12 18.25L5 18.25C4.58579 18.25 4.25 18.5858 4.25 19C4.25 19.4142 4.58579 19.75 5 19.75L12 19.75C14.6234 19.75 16.75 17.6234 16.75 15L16.75 5.5C16.75 5.08579 16.4142 4.75 16 4.75C15.5858 4.75 15.25 5.08579 15.25 5.5L15.25 15C15.25 16.7949 13.7949 18.25 12 18.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
