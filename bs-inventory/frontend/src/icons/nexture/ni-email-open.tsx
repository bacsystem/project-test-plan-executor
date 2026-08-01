import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEmailOpen({
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
          d="M18.116 4.66958C20.5256 6.11536 22 8.71942 22 11.5295L22 12.6809C22 13.5592 21.9377 14.4364 21.8134 15.3059L21.8016 15.3889C21.3297 18.692 18.6828 21.2575 15.3666 21.6259V21.6259C13.1291 21.8745 10.8709 21.8745 8.63344 21.6259V21.6259C5.31717 21.2575 2.67029 18.692 2.19841 15.3889L2.18655 15.3059C2.06234 14.4364 2 13.5592 2 12.6808L2 11.5295C2 8.71942 3.47439 6.11537 5.88403 4.66958L8.91302 2.85219C10.8131 1.71213 13.1869 1.71213 15.087 2.85218L18.116 4.66958Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16 17H8"
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
          opacity={oneTone ? 0 : 0.4}
          d="M16 16.25C16.4142 16.25 16.75 16.5858 16.75 17C16.75 17.4142 16.4142 17.75 16 17.75H8C7.58579 17.75 7.25 17.4142 7.25 17C7.25 16.5858 7.58579 16.25 8 16.25H16Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.52734 2.20913C10.6649 0.926709 13.3351 0.926708 15.4727 2.20913L18.502 4.02652C21.1374 5.60781 22.7499 8.45601 22.75 11.5294V12.6808C22.75 13.5946 22.6849 14.5077 22.5557 15.4123L22.5439 15.4953C22.0236 19.1369 19.1053 21.965 15.4492 22.3712C13.1568 22.6259 10.8432 22.6259 8.55078 22.3712C4.89467 21.965 1.97641 19.1369 1.45605 15.4953L1.44434 15.4123C1.31511 14.5077 1.25 13.5946 1.25 12.6808V11.5294C1.25008 8.45601 2.86261 5.60782 5.49805 4.02652L8.52734 2.20913ZM8 16.2501C7.58579 16.2501 7.25 16.5859 7.25 17.0001C7.25007 17.4143 7.58583 17.7501 8 17.7501H16C16.4142 17.7501 16.7499 17.4143 16.75 17.0001C16.75 16.5859 16.4142 16.2501 16 16.2501H8Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
