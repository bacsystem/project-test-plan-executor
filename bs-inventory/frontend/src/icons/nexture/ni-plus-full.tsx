import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPlusFull({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M4.00004 12H19.9999M11.9998 4.00024L11.9999 20.0001"
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
          d="M11.2501 20.0002L11.25 12.7502H4.00005C3.58591 12.7502 3.25017 12.4144 3.25004 12.0002C3.25004 11.586 3.58583 11.2502 4.00004 11.2502H11.25L11.25 4.00024C11.25 3.58603 11.5858 3.25024 12 3.25024C12.4141 3.25037 12.75 3.58611 12.75 4.00024L12.75 11.2502H20L20.0762 11.2542C20.4546 11.2924 20.75 11.6118 20.75 12.0002C20.7499 12.3886 20.4545 12.7081 20.0762 12.7463L20 12.7502H12.75L12.7501 20.0002C12.75 20.4143 12.4142 20.7501 12.0001 20.7502C11.5859 20.7502 11.2502 20.4144 11.2501 20.0002Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
