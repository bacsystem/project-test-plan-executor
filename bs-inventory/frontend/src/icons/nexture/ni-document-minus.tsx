import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiDocumentMinus({
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
          d="M9.5 12H14.5"
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
          d="M9.61664 1.5416C11.1856 1.3455 12.8133 1.34551 14.3823 1.5416C18.0404 1.99914 20.9665 4.91154 21.3754 8.5875C21.6273 10.8546 21.6273 13.1437 21.3754 15.4107C20.9669 19.0872 18.0407 22 14.3823 22.4576C12.8132 22.6537 11.1857 22.6537 9.61664 22.4576C5.95831 21.9999 3.03196 19.0871 2.62347 15.4107C2.37163 13.1437 2.37158 10.8545 2.62347 8.5875C3.03238 4.91162 5.95865 1.99926 9.61664 1.5416ZM9.49945 11.2506C9.08542 11.2508 8.74945 11.5865 8.74945 12.0006C8.74967 12.4145 9.08556 12.7504 9.49945 12.7506H14.4994C14.9135 12.7506 15.2492 12.4146 15.2494 12.0006C15.2494 11.5864 14.9137 11.2506 14.4994 11.2506H9.49945Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M14.5 11.25C14.9142 11.25 15.25 11.5858 15.25 12C15.25 12.4142 14.9142 12.75 14.5 12.75H9.50001C9.08579 12.75 8.75001 12.4142 8.75 12C8.75 11.5858 9.08579 11.25 9.5 11.25H14.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
