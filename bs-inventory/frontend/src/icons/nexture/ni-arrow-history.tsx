import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiArrowHistory({
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
          d="M4.24658 5.68421C6.08028 3.4358 8.87252 2 12.0001 2C17.5229 2 22.0001 6.47715 22.0001 12C22.0001 17.5228 17.5229 22 12.0001 22C6.47725 22 2 17.5228 2 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M4 2L4 4.99995C4 5.55223 4.44771 5.99995 4.99998 5.99995L8 6"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 8L12 12.7169C12 12.8925 11.9079 13.0553 11.7572 13.1457L9.5 14.5"
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
          d="M1.25 12C1.25 11.5858 1.58579 11.25 2 11.25C2.41421 11.25 2.75 11.5858 2.75 12C2.75 17.1086 6.8914 21.2499 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75C9.1074 2.75003 6.52549 4.07706 4.82812 6.1582L4.77637 6.21484C4.5076 6.48383 4.07347 6.51108 3.77246 6.26562C3.45147 6.00384 3.40327 5.53096 3.66504 5.20996C5.63504 2.79442 8.63759 1.25003 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06299 22.7499 1.25 17.937 1.25 12Z"
          fill="currentColor"
        />
        <path
          d="M4 1.25011C3.58579 1.25011 3.25008 1.58582 3.25008 2.00003L3.25008 4.99971C3.25008 5.96617 4.03344 6.74947 4.99989 6.74953L8.00026 6.75022C8.41427 6.75008 8.75004 6.4143 8.75018 6.0003C8.75019 5.58617 8.41436 5.25052 8.00026 5.25038L4.99989 5.24969C4.86187 5.24963 4.74992 5.13775 4.74992 4.99971L4.74992 2.00003C4.74992 1.58582 4.41421 1.25011 4 1.25011Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M12.75 12.7168C12.75 13.1011 12.5738 13.4611 12.2773 13.6963L12.1436 13.7891L9.88574 15.1436L9.81836 15.1797C9.4743 15.3413 9.05624 15.2187 8.85644 14.8857C8.64357 14.5306 8.75917 14.0695 9.11426 13.8564L11.25 12.5752L11.25 8C11.25 7.58579 11.5858 7.25 12 7.25C12.4142 7.25 12.75 7.58579 12.75 8L12.75 12.7168Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
