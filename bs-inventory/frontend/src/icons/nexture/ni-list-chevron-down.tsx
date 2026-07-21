import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiListChevronDown({
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
          opacity={oneTone ? 1 : 0.6}
          d="M22 5L11 5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M22 12L11 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M22 19L11 19"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M7.50019 3.5L5.35356 5.64647C5.15829 5.84172 4.84172 5.84171 4.64646 5.64645L2.50019 3.50008"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M7.5 10.5L5.35337 12.6465C5.15811 12.8417 4.84153 12.8417 4.64627 12.6464L2.5 10.5001"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M7.50019 17.5L5.35356 19.6465C5.15829 19.8417 4.84172 19.8417 4.64646 19.6464L2.50019 17.5001"
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
          d="M22 4.25C22.4142 4.25 22.75 4.58579 22.75 5C22.75 5.41421 22.4142 5.75 22 5.75L11 5.75C10.5858 5.75 10.25 5.41421 10.25 5C10.25 4.58579 10.5858 4.25 11 4.25L22 4.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75L11 12.75C10.5858 12.75 10.25 12.4142 10.25 12C10.25 11.5858 10.5858 11.25 11 11.25L22 11.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M22 18.25C22.4142 18.25 22.75 18.5858 22.75 19C22.75 19.4142 22.4142 19.75 22 19.75L11 19.75C10.5858 19.75 10.25 19.4142 10.25 19C10.25 18.5858 10.5858 18.25 11 18.25L22 18.25Z"
          fill="currentColor"
        />
        <path
          d="M8.03033 2.96985C8.32321 3.26276 8.32323 3.73752 8.03033 4.0304L5.88385 6.17688C5.39569 6.66499 4.60441 6.665 4.11627 6.17688L1.96978 4.0304C1.67704 3.73751 1.67699 3.2627 1.96978 2.96985C2.26263 2.67701 2.73743 2.6771 3.03033 2.96985L5.00006 4.93958L6.96978 2.96985L7.02642 2.91809C7.32098 2.67772 7.75569 2.6953 8.03033 2.96985Z"
          fill="currentColor"
        />
        <path
          d="M8.03034 9.96966C8.32322 10.2626 8.32322 10.7373 8.03034 11.0302L5.88386 13.1767C5.39573 13.6648 4.60443 13.6647 4.11628 13.1767L1.96979 11.0302C1.67694 10.7373 1.6769 10.2625 1.96979 9.96966C2.26268 9.67682 2.73746 9.67682 3.03034 9.96966L5.00007 11.9394L6.96979 9.96966C7.26269 9.67678 7.73746 9.67678 8.03034 9.96966Z"
          fill="currentColor"
        />
        <path
          d="M8.03033 16.9699C8.32321 17.2628 8.32323 17.7375 8.03033 18.0304L5.88385 20.1769C5.39569 20.665 4.60441 20.665 4.11627 20.1769L1.96978 18.0304C1.67704 17.7375 1.67699 17.2627 1.96978 16.9699C2.26263 16.677 2.73743 16.6771 3.03033 16.9699L5.00006 18.9396L6.96978 16.9699L7.02642 16.9181C7.32098 16.6777 7.75569 16.6953 8.03033 16.9699Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
