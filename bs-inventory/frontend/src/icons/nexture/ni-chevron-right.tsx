import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChevronRight({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M8 19L14.7099 13.1289C15.3929 12.5312 15.3929 11.4688 14.7099 10.8711L8 5"
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
          d="M7.43562 19.494C7.69131 19.786 8.12382 19.8321 8.43367 19.6121L8.49422 19.5643L15.2042 13.6932C16.2284 12.7968 16.2284 11.2029 15.2042 10.3065L8.49422 4.43538C8.18253 4.16266 7.7084 4.19409 7.43562 4.50569C7.1629 4.81737 7.19434 5.2915 7.50593 5.56428L14.2159 11.4354C14.5574 11.7342 14.5574 12.2655 14.2159 12.5643L7.50593 18.4354L7.45125 18.4891C7.19196 18.767 7.17992 19.2017 7.43562 19.494Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
