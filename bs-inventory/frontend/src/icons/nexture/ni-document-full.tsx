import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiDocumentFull({
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
          d="M8 10L16 10"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M8 14L14 14"
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
          d="M9.61665 1.54161C11.1857 1.34549 12.8132 1.34552 14.3823 1.54161C18.0405 1.99911 20.9666 4.91143 21.3754 8.58751C21.6273 10.8546 21.6273 13.1436 21.3754 15.4108C20.9669 19.0872 18.0408 22.0001 14.3823 22.4576C12.8132 22.6537 11.1857 22.6538 9.61665 22.4576C5.95832 21.9999 3.03197 19.0871 2.62348 15.4108C2.37162 13.1436 2.37158 10.8546 2.62348 8.58751C3.0323 4.91153 5.95859 1.99928 9.61665 1.54161ZM7.99946 13.2506C7.58544 13.2508 7.24946 13.5865 7.24946 14.0006C7.24967 14.4145 7.58557 14.7504 7.99946 14.7506H13.9995C14.4135 14.7506 14.7492 14.4146 14.7495 14.0006C14.7495 13.5864 14.4137 13.2506 13.9995 13.2506H7.99946ZM7.99946 9.25059C7.58544 9.25082 7.24946 9.58652 7.24946 10.0006C7.24967 10.4145 7.58557 10.7504 7.99946 10.7506H15.9995L16.0766 10.7467C16.4544 10.7081 16.7493 10.3886 16.7495 10.0006C16.7495 9.61243 16.4546 9.29312 16.0766 9.2545L15.9995 9.25059H7.99946Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M14 13.25C14.4142 13.25 14.75 13.5858 14.75 14C14.75 14.4142 14.4142 14.75 14 14.75H8C7.58579 14.75 7.25 14.4142 7.25 14C7.25 13.5858 7.58579 13.25 8 13.25H14Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M16.0771 9.25391C16.4551 9.29253 16.75 9.61183 16.75 10C16.75 10.3882 16.4551 10.7075 16.0771 10.7461L16 10.75H8C7.58579 10.75 7.25 10.4142 7.25 10C7.25 9.58579 7.58579 9.25 8 9.25H16L16.0771 9.25391Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
