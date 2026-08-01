import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEyeInactive({
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
          d="M18.1109 5.84985C19.3256 6.6762 20.4021 7.77706 21.2485 9.15244C22.3225 10.8976 22.3225 13.0988 21.2485 14.844C17.8649 20.3424 10.804 21.4535 5.93408 18.1774"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.8267 18.1044C4.63721 17.2829 3.58282 16.1962 2.75079 14.8441C1.67682 13.0989 1.67682 10.8978 2.75079 9.15255C6.14994 3.62896 13.2603 2.53295 18.1322 5.86454"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M3 20.9998L9.875 14.1248L14.1719 9.82788L21 2.99976"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M14.2073 9.79272C14.5313 10.1168 14.7566 10.5396 14.8356 11.0137C14.9445 11.6667 14.9445 12.3333 14.8356 12.9863C14.6776 13.9345 13.9345 14.6776 12.9863 14.8356C12.3333 14.9445 11.6667 14.9445 11.0137 14.8356C10.5094 14.7516 10.063 14.502 9.73193 14.1441"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          d="M14.1687 9.7548C13.85 9.45112 13.4419 9.24029 12.9866 9.16439C12.3335 9.05555 11.667 9.05555 11.014 9.16439C10.0657 9.32243 9.32267 10.0655 9.16464 11.0137C9.0558 11.6667 9.0558 12.3333 9.16464 12.9863C9.24166 13.4485 9.45765 13.8619 9.76862 14.1826"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
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
          d="M20.4699 2.46928L20.5266 2.41818C20.8211 2.17772 21.2559 2.19462 21.5306 2.46928C21.8053 2.74394 21.8222 3.17873 21.5817 3.47331L21.5306 3.52994L3.53044 21.5301C3.23755 21.823 2.76268 21.823 2.46978 21.5301C2.17689 21.2372 2.17689 20.7623 2.46978 20.4694L20.4699 2.46928Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M15.198 9.86113C15.3816 10.1724 15.5121 10.5192 15.574 10.8904C15.6964 11.6248 15.6963 12.3748 15.574 13.1092C15.3632 14.3733 14.3724 15.3643 13.1082 15.575C12.3738 15.6973 11.6238 15.6974 10.8894 15.575C10.5182 15.5131 10.1714 15.3827 9.86014 15.199L15.198 9.86113Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M10.8894 8.42461C11.4178 8.33656 11.9542 8.31273 12.4871 8.35137L8.35037 12.4881C8.31176 11.9553 8.3356 11.4187 8.42361 10.8904C8.63442 9.62644 9.62547 8.63551 10.8894 8.42461Z"
          fill="currentColor"
        />
        <path
          d="M19.2769 5.78314C20.2718 6.58607 21.1595 7.57804 21.8872 8.76068C23.1091 10.7468 23.1094 13.2522 21.8872 15.2382C18.3736 20.9468 11.1524 22.2299 5.97024 19.0898L9.86184 15.1982C10.173 15.3817 10.5192 15.5132 10.8902 15.5751C11.6243 15.6975 12.3747 15.6974 13.1089 15.5751C14.3727 15.3643 15.3638 14.3731 15.5747 13.1093C15.697 12.3751 15.697 11.6247 15.5747 10.8906C15.5128 10.5195 15.3823 10.1725 15.1988 9.86127L19.2769 5.78314Z"
          fill="currentColor"
        />
        <path
          d="M2.11282 8.76068C5.32294 3.54424 11.6286 2.02221 16.646 4.1933L12.4888 8.35052C11.9557 8.31183 11.4186 8.33671 10.8902 8.42474C9.6264 8.63572 8.63522 9.62677 8.42434 10.8906C8.33636 11.4188 8.31244 11.9553 8.3511 12.4882L3.6304 17.2089C3.07234 16.624 2.56179 15.9676 2.11282 15.2382C0.890642 13.2522 0.890917 10.7468 2.11282 8.76068Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
