import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiTablet({
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
          d="M3.36984 8.67144C3.73938 5.34558 6.39015 2.70123 9.71063 2.28617V2.28617C11.2181 2.09774 12.7819 2.09774 14.2894 2.28617V2.28617C17.6099 2.70123 20.2606 5.34558 20.6302 8.67144V8.67144C20.876 10.8837 20.876 13.1163 20.6302 15.3286V15.3286C20.2606 18.6544 17.6099 21.2988 14.2894 21.7138V21.7138C12.7819 21.9023 11.2181 21.9023 9.71063 21.7138V21.7138C6.39015 21.2988 3.73938 18.6544 3.36984 15.3286V15.3286C3.12404 13.1163 3.12404 10.8837 3.36984 8.67144V8.67144Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M11.5 19H12.5"
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
          d="M9.61665 1.54161C11.1857 1.34549 12.8132 1.34552 14.3823 1.54161C18.0405 1.99911 20.9666 4.91143 21.3754 8.58751C21.6273 10.8546 21.6273 13.1436 21.3754 15.4108C20.9669 19.0872 18.0408 22.0001 14.3823 22.4576C12.8132 22.6537 11.1857 22.6538 9.61665 22.4576C5.95832 21.9999 3.03197 19.0871 2.62348 15.4108C2.37162 13.1436 2.37158 10.8546 2.62348 8.58751C3.0323 4.91153 5.95859 1.99928 9.61665 1.54161ZM11.4995 18.2506C11.0854 18.2508 10.7495 18.5865 10.7495 19.0006C10.7497 19.4145 11.0856 19.7504 11.4995 19.7506H12.4995C12.9135 19.7506 13.2492 19.4146 13.2495 19.0006C13.2495 18.5864 12.9137 18.2506 12.4995 18.2506H11.4995Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M12.5 18.25C12.9142 18.25 13.25 18.5858 13.25 19C13.25 19.4142 12.9142 19.75 12.5 19.75H11.5C11.0858 19.75 10.75 19.4142 10.75 19C10.75 18.5858 11.0858 18.25 11.5 18.25H12.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
