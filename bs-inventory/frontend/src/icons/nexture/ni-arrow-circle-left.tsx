import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiArrowCircleLeft({
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
          opacity={oneTone ? 1 : 0.6}
          d="M4.24658 5.68421C6.08028 3.4358 8.87252 2 12.0001 2C17.5229 2 22.0001 6.47715 22.0001 12C22.0001 17.5228 17.5229 22 12.0001 22C9.51856 22 7.24813 21.0961 5.5001 19.5996"
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
          d="M21.2503 12C21.2503 6.8915 17.1087 2.75021 12.0003 2.75C9.10755 2.75 6.5248 4.07694 4.82741 6.1582C4.5657 6.47903 4.09369 6.5271 3.77272 6.26562C3.45173 6.00383 3.40351 5.53096 3.6653 5.20996C5.63532 2.79453 8.63792 1.25 12.0003 1.25C17.9371 1.25021 22.7503 6.06307 22.7503 12C22.7503 17.9369 17.9371 22.7498 12.0003 22.75C9.33319 22.75 6.89075 21.7774 5.01198 20.1689C4.69769 19.8996 4.66099 19.4269 4.92995 19.1123C5.19933 18.7977 5.67291 18.7609 5.98757 19.0303C7.60483 20.4148 9.70433 21.25 12.0003 21.25C17.1087 21.2498 21.2503 17.1085 21.2503 12Z"
          fill="currentColor"
        />
        <path
          d="M4 1.25011C3.58579 1.25011 3.25008 1.58582 3.25008 2.00003L3.25008 4.99971C3.25008 5.96617 4.03344 6.74947 4.99989 6.74953L8.00026 6.75022C8.41427 6.75008 8.75004 6.4143 8.75018 6.0003C8.75019 5.58617 8.41436 5.25052 8.00026 5.25038L4.99989 5.24969C4.86187 5.24963 4.74992 5.13775 4.74992 4.99971L4.74992 2.00003C4.74992 1.58582 4.41421 1.25011 4 1.25011Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
