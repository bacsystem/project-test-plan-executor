import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPulse({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M2 12H4.25538C5.14169 12 5.92228 12.5833 6.17342 13.4333L7.50369 17.9358C7.93183 19.3849 9.99179 19.3632 10.3894 17.9054L13.6105 6.09451C14.0081 4.63675 16.0681 4.61508 16.4962 6.06416L17.8265 10.5667C18.0777 11.4167 18.8582 12 19.7446 12H22"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
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
          d="M12.8867 5.89644C13.4831 3.7098 16.5736 3.67698 17.2158 5.85054L18.5459 10.3535C18.7029 10.8844 19.1905 11.2488 19.7441 11.249H22C22.4142 11.249 22.75 11.5848 22.75 11.999C22.75 12.4132 22.4142 12.749 22 12.749H19.7441C18.5257 12.7488 17.4527 11.9468 17.1074 10.7783L15.7773 6.27534C15.5631 5.55104 14.5327 5.56217 14.334 6.29097L11.1133 18.1015C10.5169 20.2882 7.42639 20.321 6.78418 18.1474L5.4541 13.6445C5.29707 13.1136 4.80948 12.7492 4.25586 12.749H2C1.58579 12.749 1.25 12.4132 1.25 11.999C1.25004 11.5848 1.58581 11.249 2 11.249H4.25586C5.47427 11.2492 6.54726 12.0512 6.89258 13.2197L8.22266 17.7226C8.43685 18.447 9.46725 18.4358 9.66602 17.707L12.8867 5.89644Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
