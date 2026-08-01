import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiArrowCircleRight({
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
          d="M19.7534 5.68421C17.9197 3.4358 15.1275 2 11.9999 2C6.47705 2 1.9999 6.47715 1.9999 12C1.9999 17.5228 6.47705 22 11.9999 22C14.4814 22 16.7519 21.0961 18.4999 19.5996"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M20 2L20 4.99995C20 5.55223 19.5523 5.99995 19 5.99995L16 6"
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
          d="M2.74974 12C2.74974 6.8915 6.89128 2.75021 11.9997 2.75C14.8925 2.75 17.4752 4.07694 19.1726 6.1582C19.4343 6.47903 19.9063 6.5271 20.2273 6.26562C20.5483 6.00383 20.5965 5.53096 20.3347 5.20996C18.3647 2.79453 15.3621 1.25 11.9997 1.25C6.06285 1.25021 1.24974 6.06307 1.24974 12C1.24974 17.9369 6.06285 22.7498 11.9997 22.75C14.6668 22.75 17.1092 21.7774 18.988 20.1689C19.3023 19.8996 19.339 19.4269 19.07 19.1123C18.8007 18.7977 18.3271 18.7609 18.0124 19.0303C16.3952 20.4148 14.2957 21.25 11.9997 21.25C6.89128 21.2498 2.74974 17.1085 2.74974 12Z"
          fill="currentColor"
        />
        <path
          d="M20 1.25011C20.4142 1.25011 20.7499 1.58582 20.7499 2.00003L20.7499 4.99971C20.7499 5.96617 19.9666 6.74947 19.0001 6.74953L15.9997 6.75022C15.5857 6.75008 15.25 6.4143 15.2498 6.0003C15.2498 5.58617 15.5856 5.25052 15.9997 5.25038L19.0001 5.24969C19.1381 5.24963 19.2501 5.13775 19.2501 4.99971L19.2501 2.00003C19.2501 1.58582 19.5858 1.25011 20 1.25011Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
