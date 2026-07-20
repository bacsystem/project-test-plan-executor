import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiBasket({
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
          d="M6.87198 21.3594C5.11427 21.1399 3.63861 19.9296 3.07986 18.2487L2.97791 17.942C2.33019 15.9933 2 13.9532 2 11.8998L2 10.7553C2 9.459 2.94839 8.35774 4.23037 8.16544V8.16544C9.38131 7.3928 14.6187 7.3928 19.7696 8.16544V8.16544C21.0516 8.35774 22 9.459 22 10.7553L22 11.8931C22 13.9509 21.6682 15.9953 21.0175 17.9475L20.9156 18.2531C20.3561 19.9316 18.8825 21.1397 17.1269 21.3591V21.3591C13.7222 21.7847 10.2767 21.7847 6.87198 21.3594V21.3594Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path d="M7 7.5L9 2" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M17 7.5L15 2" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M8 13L8 16" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 13L12 16"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16 13L16 16"
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
          d="M14.7441 1.29502C15.1331 1.154 15.5635 1.35536 15.7051 1.74424L17.667 7.14072C18.4063 7.22004 19.1445 7.31348 19.8809 7.42392C21.5297 7.67127 22.7496 9.08774 22.75 10.755V11.8927C22.75 14.0309 22.4056 16.1562 21.7295 18.1847L21.627 18.4903C20.9761 20.4427 19.2618 21.8483 17.2197 22.1036C13.7534 22.5369 10.2456 22.5366 6.7793 22.1036C4.73498 21.8482 3.01821 20.4406 2.36816 18.4854L2.2666 18.1788C1.5936 16.154 1.25002 14.0332 1.25 11.8995V10.755C1.25036 9.08774 2.47028 7.67127 4.11914 7.42392C4.85513 7.31353 5.59305 7.22002 6.33203 7.14072L8.29492 1.74424C8.43648 1.35536 8.86685 1.154 9.25586 1.29502C9.62062 1.42766 9.82034 1.81434 9.72754 2.18271L9.70508 2.25595L7.9834 6.98838C10.657 6.78567 13.3421 6.78571 16.0156 6.98838L14.2949 2.25595L14.2725 2.18271C14.1797 1.81434 14.3794 1.42766 14.7441 1.29502ZM8 12.2501C7.58583 12.2501 7.25006 12.5859 7.25 13.0001V16.0001C7.25 16.4143 7.58579 16.7501 8 16.7501C8.41421 16.7501 8.75 16.4143 8.75 16.0001V13.0001C8.74994 12.5859 8.41417 12.2501 8 12.2501ZM12 12.2501C11.5858 12.2501 11.2501 12.5859 11.25 13.0001V16.0001C11.25 16.4143 11.5858 16.7501 12 16.7501C12.4142 16.7501 12.75 16.4143 12.75 16.0001V13.0001C12.7499 12.5859 12.4142 12.2501 12 12.2501ZM16 12.2501C15.5858 12.2501 15.2501 12.5859 15.25 13.0001V16.0001C15.25 16.4143 15.5858 16.7501 16 16.7501C16.4142 16.7501 16.75 16.4143 16.75 16.0001V13.0001C16.7499 12.5859 16.4142 12.2501 16 12.2501Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M8 12.25C8.41421 12.25 8.75 12.5858 8.75 13V16C8.75 16.4142 8.41421 16.75 8 16.75C7.58579 16.75 7.25 16.4142 7.25 16V13C7.25 12.5858 7.58579 12.25 8 12.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M12 12.25C12.4142 12.25 12.75 12.5858 12.75 13V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V13C11.25 12.5858 11.5858 12.25 12 12.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M16 12.25C16.4142 12.25 16.75 12.5858 16.75 13V16C16.75 16.4142 16.4142 16.75 16 16.75C15.5858 16.75 15.25 16.4142 15.25 16V13C15.25 12.5858 15.5858 12.25 16 12.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
