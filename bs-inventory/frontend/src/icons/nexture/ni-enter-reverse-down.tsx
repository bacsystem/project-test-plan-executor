import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEnterReverseDown({
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
          d="M12.5 16L15.2929 18.7929C15.6834 19.1834 16.3166 19.1834 16.7071 18.7929L19.5 16"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16 18.5L16 9C16 6.79086 14.2091 5 12 5L5 5"
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
          d="M11.9697 15.4697C11.6768 15.7626 11.6768 16.2373 11.9697 16.5302L14.7626 19.3232C15.446 20.0065 16.5539 20.0065 17.2372 19.3232L20.0302 16.5302C20.3231 16.2373 20.3231 15.7626 20.0302 15.4697C19.7373 15.1768 19.2626 15.1768 18.9697 15.4697L16.1767 18.2626C16.0791 18.3602 15.9208 18.3602 15.8232 18.2626L13.0302 15.4697C12.7373 15.1768 12.2626 15.1768 11.9697 15.4697Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M12 5.75L5 5.75C4.58579 5.75 4.25 5.41421 4.25 5C4.25 4.58579 4.58579 4.25 5 4.25L12 4.25C14.6234 4.25 16.75 6.37665 16.75 9L16.75 18.5C16.75 18.9142 16.4142 19.25 16 19.25C15.5858 19.25 15.25 18.9142 15.25 18.5L15.25 9C15.25 7.20508 13.7949 5.75 12 5.75Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
