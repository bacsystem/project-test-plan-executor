import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSignalUp({
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
          opacity={oneTone ? 1 : 0.6}
          d="M10.0503 19.9289C11.3349 19.0725 13.0084 19.0725 14.2929 19.9289"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M8 15.9291C10.5261 14.245 13.8171 14.245 16.3433 15.9291"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M5.29297 11.8786C9.45835 9.10167 14.8849 9.10167 19.0503 11.8786"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M2 8.17152C8.15945 4.06522 16.1838 4.06522 22.3433 8.17152"
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
          d="M9.6343 19.3056C11.0747 18.3454 12.924 18.2848 14.4156 19.125L14.7085 19.3056L14.771 19.3515C15.064 19.5933 15.1318 20.0227 14.9165 20.3457C14.701 20.6684 14.2787 20.7705 13.9429 20.5927L13.8765 20.5537L13.6802 20.4326C12.6777 19.8676 11.4346 19.9082 10.4663 20.5537C10.1218 20.7833 9.65608 20.6901 9.42629 20.3457C9.19656 20.0011 9.28977 19.5354 9.6343 19.3056Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M7.58393 15.3048C10.2751 13.5108 13.7556 13.455 16.496 15.1368L16.7597 15.3048L16.8212 15.3507C17.1144 15.5923 17.1827 16.0218 16.9677 16.3448C16.738 16.6895 16.2714 16.7826 15.9267 16.5528C13.6526 15.0371 10.69 15.0369 8.41596 16.5528C8.07132 16.7826 7.60569 16.6895 7.37592 16.3448C7.14638 16.0002 7.23937 15.5345 7.58393 15.3048Z"
          fill="currentColor"
        />
        <path
          d="M4.87697 11.2555C9.29428 8.31066 15.0495 8.31066 19.4668 11.2555C19.8111 11.4854 19.9045 11.9511 19.6748 12.2956C19.4451 12.6402 18.9785 12.7333 18.6338 12.5036C14.7204 9.89473 9.6224 9.89465 5.70901 12.5036C5.36445 12.7332 4.89875 12.64 4.66897 12.2956C4.43923 11.951 4.53245 11.4853 4.87697 11.2555Z"
          fill="currentColor"
        />
        <path
          d="M1.584 7.54765C7.79493 3.40703 15.8275 3.27726 22.1524 7.15897L22.7598 7.54765L22.8213 7.59257C23.1147 7.8343 23.1832 8.26457 22.9678 8.58769C22.7524 8.91077 22.3291 9.01257 21.9932 8.83476L21.9268 8.79569L21.3682 8.43729C15.5404 4.86063 8.13886 4.98047 2.41603 8.79569C2.07148 9.02526 1.60578 8.93208 1.37599 8.58769C1.14626 8.24309 1.23949 7.77745 1.584 7.54765Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
