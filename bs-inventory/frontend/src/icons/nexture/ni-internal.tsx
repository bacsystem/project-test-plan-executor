import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiInternal({
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
          d="M11.9997 2.1665C11.0035 2.1665 10.0073 2.2216 9.01564 2.33178C5.49853 2.72257 2.72208 5.49901 2.33129 9.01613C2.11092 10.9994 2.11092 13.001 2.33129 14.9843C2.72208 18.5014 5.49852 21.2779 9.01564 21.6686C10.9989 21.889 13.0005 21.889 14.9838 21.6686C18.5009 21.2779 21.2774 18.5014 21.6682 14.9843C21.7783 13.9927 21.8334 12.9965 21.8334 12.0002"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M15 5.00004L15 7.99999C15 8.55227 15.4477 8.99998 15.9999 8.99999L19 9.00003M20.9999 2.99994L15.5 8.49998"
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
          d="M14.9996 4.25036C14.6116 4.25048 14.2925 4.54504 14.2539 4.92294L14.2497 5.00028L14.2497 7.99996C14.2497 8.96635 15.0332 9.7496 15.9995 9.74978L18.9999 9.75047C19.4139 9.75045 19.7496 9.41452 19.7498 9.00055C19.7498 8.58634 19.4141 8.25065 18.9999 8.25063L16.8102 8.24994L21.53 3.53014C21.8229 3.23724 21.8229 2.76237 21.53 2.46948C21.2371 2.17673 20.7622 2.17663 20.4694 2.46948L15.7496 7.18928V5.00028L15.7461 4.92363C15.7078 4.54531 15.3881 4.25036 14.9996 4.25036Z"
          fill="currentColor"
        />
        <path
          d="M12 2.40344V8.20032C12 10.2989 13.7012 12 15.7998 12.0001H21.5957C21.6052 12.9339 21.5567 13.7757 21.4462 14.7697C21.0555 18.2831 18.2821 21.0568 14.7685 21.4474C12.9288 21.6518 11.0711 21.6518 9.2314 21.4474C5.71789 21.0568 2.94348 18.2831 2.55269 14.7697C2.3483 12.93 2.34834 11.0722 2.55269 9.23254C2.94319 5.71874 5.71764 2.94446 9.2314 2.55383C10.2251 2.44343 11.0664 2.39418 12 2.40344Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
