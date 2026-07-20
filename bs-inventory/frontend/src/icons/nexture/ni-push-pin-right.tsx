import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPushPinRight({
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
          d="M4.73874 5.32707C6.23154 4.01515 7.96936 3.01182 9.85192 2.37498C10.8252 2.04574 11.835 2.76674 11.8395 3.79417L11.8458 5.2057C11.8474 5.55375 11.9397 5.89537 12.1138 6.19679L12.8418 7.45788C13.006 7.74217 13.2763 7.94962 13.5934 8.03458L15.6211 8.5779C17.5167 9.08582 18.1335 11.4675 16.7226 12.8316C14.9351 14.56 12.7497 15.8218 10.3591 16.5056C8.47232 17.0454 6.71811 15.3204 7.22602 13.4248L7.76935 11.3971C7.85431 11.08 7.80983 10.7422 7.64569 10.4579L6.91761 9.19679C6.74358 8.89537 6.4939 8.64458 6.19326 8.46921L4.97399 7.75801C4.08649 7.24033 3.96698 6.00532 4.73874 5.32707Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M14 15.4639L17 20.66"
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
          d="M12.589 3.79059C12.5819 2.25146 11.0685 1.17137 9.61048 1.66462C7.63441 2.33321 5.81027 3.38712 4.24329 4.76422C3.08737 5.78037 3.26654 7.63016 4.59583 8.40583L5.81458 9.11676C6.00241 9.22632 6.15895 9.38356 6.26771 9.57184L6.99524 10.8326C7.05988 10.9445 7.07745 11.0778 7.04407 11.2027L6.5011 13.231C5.84255 15.6894 8.11761 17.9266 10.5646 17.2271C13.0734 16.5094 15.3673 15.1845 17.2433 13.3707C19.0731 11.6013 18.2732 8.51189 15.8146 7.85309L13.7872 7.31012C13.6624 7.27658 13.555 7.1945 13.4904 7.08258L12.7628 5.82184C12.6542 5.63359 12.5959 5.42005 12.5949 5.2027L12.589 3.79059Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M16.3506 21.0351C16.5577 21.3938 17.0164 21.5167 17.3751 21.3096C17.7338 21.1025 17.8567 20.6438 17.6496 20.2851L14.6496 15.089C14.4425 14.7303 13.9838 14.6073 13.6251 14.8145C13.2664 15.0216 13.1435 15.4803 13.3506 15.839L16.3506 21.0351Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
