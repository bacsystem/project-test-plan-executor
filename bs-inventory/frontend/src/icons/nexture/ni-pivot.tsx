import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPivot({
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
          d="M6.5 14L3.70711 16.7929C3.31658 17.1834 3.31658 17.8166 3.70711 18.2071L6.5 21"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M4 17.5L14 17.5C15.933 17.5 17.5 15.933 17.5 14L17.5 4"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M14 6.5L16.7929 3.70711C17.1834 3.31658 17.8166 3.31658 18.2071 3.70711L21 6.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M3.33105 10.0159C3.72185 6.49878 6.49829 3.72233 10.0154 3.33154"
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
          d="M7.03033 13.4697C6.73744 13.1768 6.26268 13.1768 5.96978 13.4697L3.17681 16.2626C2.4935 16.946 2.4935 18.0539 3.17681 18.7372L5.96978 21.5302C6.26268 21.8231 6.73744 21.8231 7.03033 21.5302C7.32322 21.2373 7.32322 20.7626 7.03033 20.4697L4.23736 17.6767C4.13983 17.5791 4.13983 17.4208 4.23736 17.3232L7.03033 14.5302C7.32322 14.2373 7.32322 13.7626 7.03033 13.4697Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M16.75 14L16.75 4C16.75 3.58579 17.0858 3.25001 17.5 3.25C17.9142 3.25 18.25 3.58579 18.25 4L18.25 14C18.25 16.3472 16.3472 18.25 14 18.25L4 18.25C3.58579 18.25 3.25 17.9142 3.25 17.5C3.25001 17.0858 3.58579 16.75 4 16.75L14 16.75C15.5188 16.75 16.75 15.5188 16.75 14Z"
          fill="currentColor"
        />
        <path
          d="M13.4697 7.03033C13.1768 6.73744 13.1768 6.26268 13.4697 5.96978L16.2626 3.17681C16.946 2.4935 18.0538 2.4935 18.7372 3.17681L21.5302 5.96978C21.8231 6.26268 21.8231 6.73744 21.5302 7.03033C21.2373 7.32322 20.7626 7.32322 20.4697 7.03033L17.6767 4.23736C17.5791 4.13983 17.4208 4.13983 17.3232 4.23736L14.5302 7.03033C14.2373 7.32322 13.7626 7.32322 13.4697 7.03033Z"
          fill="currentColor"
        />
        <path
          d="M9.93239 2.58669C10.344 2.54095 10.7147 2.83722 10.7605 3.2488C10.8062 3.66033 10.5099 4.03097 10.0984 4.07692C6.92993 4.42898 4.428 6.9309 4.07595 10.0994C4.02999 10.5108 3.65936 10.8072 3.24782 10.7615C2.83624 10.7157 2.53998 10.345 2.58571 9.93337C3.01524 6.06762 6.06664 3.01622 9.93239 2.58669Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
