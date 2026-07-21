import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiFaceFrownMore({
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
          d="M17.5 16L16.7087 15.2806C14.0388 12.8534 9.96124 12.8534 7.29129 15.2806L6.5 16"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
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
          d="M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25ZM17.2129 14.7256C14.2569 12.0384 9.74309 12.0384 6.78711 14.7256L5.99512 15.4443C5.68865 15.7229 5.66674 16.1974 5.94531 16.5039C6.20654 16.7913 6.63964 16.8295 6.94531 16.6035L7.00488 16.5547L7.7959 15.835C10.1797 13.6681 13.8203 13.6681 16.2041 15.835L16.9951 16.5547C17.3016 16.8333 17.7761 16.8104 18.0547 16.5039C18.3159 16.2165 18.3127 15.7818 18.0586 15.499L18.0049 15.4443L17.2129 14.7256ZM9 8.25C8.58579 8.25001 8.25 8.58579 8.25 9V10C8.25 10.4142 8.58579 10.75 9 10.75C9.41421 10.75 9.75 10.4142 9.75 10V9C9.75 8.58579 9.41421 8.25 9 8.25ZM15 8.25C14.5858 8.25001 14.25 8.58579 14.25 9V10C14.25 10.4142 14.5858 10.75 15 10.75C15.4142 10.75 15.75 10.4142 15.75 10V9C15.75 8.58579 15.4142 8.25 15 8.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M6.78711 14.7256C9.74309 12.0384 14.2569 12.0384 17.2129 14.7256L18.0049 15.4443L18.0586 15.499C18.3127 15.7818 18.3159 16.2165 18.0547 16.5039C17.7761 16.8104 17.3016 16.8333 16.9951 16.5547L16.2041 15.835C13.8203 13.6681 10.1797 13.6681 7.7959 15.835L7.00488 16.5547L6.94531 16.6035C6.63964 16.8295 6.20654 16.7913 5.94531 16.5039C5.66674 16.1974 5.68865 15.723 5.99512 15.4443L6.78711 14.7256Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M9 8.25C9.41422 8.25 9.75 8.58579 9.75 9V10C9.75 10.4142 9.41422 10.75 9 10.75C8.58579 10.75 8.25 10.4142 8.25 10V9C8.25 8.58579 8.58579 8.25001 9 8.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M15 8.25C15.4142 8.25 15.75 8.58579 15.75 9V10C15.75 10.4142 15.4142 10.75 15 10.75C14.5858 10.75 14.25 10.4142 14.25 10V9C14.25 8.58579 14.5858 8.25001 15 8.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
