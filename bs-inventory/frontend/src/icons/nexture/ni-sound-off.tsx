import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSoundOff({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M2 11V13C2 14.6569 3.34315 16 5 16C5.62951 16 6.22229 16.2964 6.6 16.8L8.4 19.2C8.77771 19.7036 9.37049 20 10 20H10.5102C11.9539 20 13.1928 18.9718 13.4588 17.5529L13.6016 16.7915C14.1954 13.6248 14.1954 10.3752 13.6016 7.2085L13.4588 6.44713C13.1928 5.02822 11.9539 4 10.5102 4H10C9.37049 4 8.77771 4.29639 8.4 4.8L6.6 7.2C6.22229 7.70361 5.62951 8 5 8C3.34315 8 2 9.34315 2 11Z"
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
          d="M10.5098 3.25C12.3142 3.25 13.8636 4.53508 14.1963 6.30859L14.3389 7.07031C14.9497 10.3284 14.9497 13.6716 14.3389 16.9297L14.1963 17.6914C13.8636 19.4649 12.3142 20.75 10.5098 20.75H10C9.13448 20.75 8.31916 20.3428 7.7998 19.6504L6 17.25C5.76393 16.9352 5.39345 16.75 5 16.75C2.92893 16.75 1.25 15.0711 1.25 13V11C1.25 8.92893 2.92893 7.25 5 7.25C5.39345 7.25 5.76393 7.06476 6 6.75L7.7998 4.34961C8.31916 3.65724 9.13448 3.25 10 3.25H10.5098Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
