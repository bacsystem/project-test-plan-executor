import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiDownloadCloud({
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
          d="M6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8V8C6.04757 8 6.0886 7.96585 6.09711 7.91905C6.60612 5.12127 9.05534 3 12 3C14.9447 3 17.3939 5.12127 17.9029 7.91905C17.9114 7.96585 17.9524 8 18 8V8C20.2091 8 22 9.79086 22 12C22 14.2091 20.2091 16 18 16"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12.0002 10.0002L12.0002 20.0002M14.5003 18.5L12.7073 20.293C12.3167 20.6836 11.6836 20.6836 11.293 20.293L9.49997 18.5"
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
          d="M8.96967 19.0304C8.67677 18.7376 8.67678 18.2628 8.96967 17.9699C9.26256 17.677 9.73733 17.677 10.0302 17.9699L11.2499 19.1896L11.2499 10.0002L11.2539 9.924C11.2921 9.54568 11.6116 9.25025 11.9999 9.25017C12.3884 9.25017 12.7078 9.54564 12.746 9.924L12.7499 10.0002L12.7499 19.1896L13.9697 17.9699C14.2625 17.6771 14.7373 17.6772 15.0302 17.9699C15.3049 18.2445 15.3224 18.6792 15.082 18.9738L15.0302 19.0304L13.2372 20.8234C12.5538 21.5068 11.446 21.5068 10.7626 20.8234L8.96967 19.0304Z"
          fill="currentColor"
        />
        <path
          d="M12 2.25C15.1335 2.25 17.7651 4.38507 18.5264 7.2793C20.902 7.54122 22.75 9.55457 22.75 12C22.75 14.6234 20.6234 16.75 18 16.75H16.25C15.1454 16.75 14.25 15.8546 14.25 14.75V10C14.2499 8.83531 13.3647 7.87717 12.2305 7.76172L12 7.75C10.7582 7.75036 9.75013 8.75722 9.75 10V14.75C9.75 15.8546 8.85457 16.75 7.75 16.75H6C3.37665 16.75 1.25 14.6234 1.25 12C1.25 9.55491 3.09749 7.54166 5.47266 7.2793C6.23383 4.38495 8.86638 2.25 12 2.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
