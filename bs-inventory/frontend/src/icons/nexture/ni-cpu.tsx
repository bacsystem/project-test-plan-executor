import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCpu({
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
          d="M9.19171 20.248C6.30169 19.9886 4.01139 17.6983 3.75203 14.8083L3.65402 13.7162C3.55154 12.5744 3.55154 11.4256 3.65402 10.2838L3.75203 9.1917C4.01139 6.30169 6.30169 4.01139 9.1917 3.75203L10.2838 3.65402C11.4256 3.55154 12.5744 3.55154 13.7162 3.65402L14.8083 3.75203C17.6983 4.01139 19.9886 6.30169 20.248 9.1917L20.346 10.2838C20.4485 11.4256 20.4485 12.5744 20.346 13.7162L20.248 14.8083C19.9886 17.6983 17.6983 19.9886 14.8083 20.248L13.7162 20.346C12.5744 20.4485 11.4256 20.4485 10.2838 20.346L9.19171 20.248Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M2 8L3.5 8"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M2 12L3 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M2 16L3.5 16"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20.5 8L22 8"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M21 12L22 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20.5 16L22 16"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M8 22L8 20.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 22L12 21"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16 22L16 20.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M8 3.5L8 2"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 3L12 2"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16 3.5L16 2"
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
          d="M10.2171 2.90602C11.4034 2.79956 12.5971 2.79955 13.7835 2.90602L14.8753 3.00367C18.1264 3.29555 20.7036 5.87259 20.9954 9.12379L21.093 10.2156C21.1995 11.402 21.1995 12.5956 21.093 13.782L20.9954 14.8738C20.7036 18.125 18.1264 20.702 14.8753 20.9939L13.7835 21.0916C12.5971 21.198 11.4034 21.198 10.2171 21.0916L9.12527 20.9939C5.874 20.7021 3.29694 18.1251 3.00515 14.8738L2.90749 13.782C2.80102 12.5956 2.80102 11.402 2.90749 10.2156L3.00515 9.12379C3.29694 5.87253 5.874 3.29546 9.12527 3.00367L10.2171 2.90602Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M3.5 7.25C3.91421 7.25 4.25 7.58579 4.25 8C4.25 8.41421 3.91421 8.75 3.5 8.75L2 8.75C1.58579 8.75 1.25 8.41421 1.25 8C1.25 7.58579 1.58579 7.25 2 7.25L3.5 7.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M3 11.25C3.41421 11.25 3.75 11.5858 3.75 12C3.75 12.4142 3.41421 12.75 3 12.75L2 12.75C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25L3 11.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M3.5 15.25C3.91421 15.25 4.25 15.5858 4.25 16C4.25 16.4142 3.91421 16.75 3.5 16.75L2 16.75C1.58579 16.75 1.25 16.4142 1.25 16C1.25 15.5858 1.58579 15.25 2 15.25L3.5 15.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M22 7.25C22.4142 7.25 22.75 7.58579 22.75 8C22.75 8.41421 22.4142 8.75 22 8.75L20.5 8.75C20.0858 8.75 19.75 8.41421 19.75 8C19.75 7.58579 20.0858 7.25 20.5 7.25L22 7.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75L21 12.75C20.5858 12.75 20.25 12.4142 20.25 12C20.25 11.5858 20.5858 11.25 21 11.25L22 11.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M22 15.25C22.4142 15.25 22.75 15.5858 22.75 16C22.75 16.4142 22.4142 16.75 22 16.75L20.5 16.75C20.0858 16.75 19.75 16.4142 19.75 16C19.75 15.5858 20.0858 15.25 20.5 15.25L22 15.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M7.25 20.5C7.25 20.0858 7.58579 19.75 8 19.75C8.41421 19.75 8.75 20.0858 8.75 20.5L8.75 22C8.75 22.4142 8.41421 22.75 8 22.75C7.58579 22.75 7.25 22.4142 7.25 22L7.25 20.5Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11.25 21C11.25 20.5858 11.5858 20.25 12 20.25C12.4142 20.25 12.75 20.5858 12.75 21L12.75 22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22L11.25 21Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M15.25 20.5C15.25 20.0858 15.5858 19.75 16 19.75C16.4142 19.75 16.75 20.0858 16.75 20.5L16.75 22C16.75 22.4142 16.4142 22.75 16 22.75C15.5858 22.75 15.25 22.4142 15.25 22L15.25 20.5Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M7.25 2C7.25 1.58579 7.58579 1.25 8 1.25C8.41421 1.25 8.75 1.58579 8.75 2L8.75 3.5C8.75 3.91421 8.41421 4.25 8 4.25C7.58579 4.25 7.25 3.91421 7.25 3.5L7.25 2Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11.25 2C11.25 1.58579 11.5858 1.25 12 1.25C12.4142 1.25 12.75 1.58579 12.75 2L12.75 3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3L11.25 2Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M15.25 2C15.25 1.58579 15.5858 1.25 16 1.25C16.4142 1.25 16.75 1.58579 16.75 2L16.75 3.5C16.75 3.91421 16.4142 4.25 16 4.25C15.5858 4.25 15.25 3.91421 15.25 3.5L15.25 2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
