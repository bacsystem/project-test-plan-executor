import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChevronUp({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M19 16L13.1289 9.29013C12.5312 8.60714 11.4688 8.60714 10.8711 9.29013L5 16"
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
          d="M19.494 16.5644C19.786 16.3087 19.8321 15.8762 19.6121 15.5663L19.5643 15.5058L13.6932 8.79582C12.7968 7.77156 11.2029 7.77156 10.3065 8.79582L4.43538 15.5058C4.16266 15.8175 4.19409 16.2916 4.50569 16.5644C4.81737 16.8371 5.2915 16.8057 5.56428 16.4941L11.4354 9.7841C11.7342 9.44261 12.2655 9.44261 12.5643 9.7841L18.4354 16.4941L18.4891 16.5488C18.767 16.808 19.2017 16.8201 19.494 16.5644Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
