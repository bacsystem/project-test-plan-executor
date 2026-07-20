import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiTriangleDown({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M10.4184 15.7208C11.263 16.671 12.7452 16.6787 13.5996 15.7373L14.1809 15.0967C15.3709 13.7856 16.1802 12.1743 16.5214 10.4369V10.4369C16.784 9.09961 15.896 7.80783 14.5534 7.57412L14.3406 7.53709C12.7917 7.26748 11.2079 7.26749 9.65905 7.53711L9.44188 7.57492C8.10326 7.80794 7.21959 9.09811 7.48602 10.4305V10.4305C7.8225 12.1131 8.60069 13.676 9.74072 14.9585L10.4184 15.7208Z"
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
          d="M9.52977 6.79821C11.1635 6.51382 12.8345 6.51393 14.4682 6.79821L14.6811 6.83532C16.438 7.14113 17.5998 8.83162 17.2563 10.5814C16.8888 12.4527 16.0174 14.1887 14.7358 15.6009L14.1548 16.2416C13.0006 17.5129 10.9977 17.5025 9.85692 16.2191L9.17918 15.4574C7.95083 14.0754 7.11207 12.3906 6.74949 10.5775C6.40078 8.8321 7.55947 7.1418 9.31297 6.8363L9.52977 6.79821Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
