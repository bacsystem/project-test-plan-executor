import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCoin({
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
        <circle cx="9.5" cy="14.5" r="7.5" stroke="currentColor" strokeWidth={iconStrokeWidth} />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16.65 16.6873C19.7443 15.7629 21.9999 12.8949 21.9999 9.5C21.9999 5.35786 18.6421 2 14.4999 2C11.0504 2 8.14478 4.32881 7.26953 7.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          d="M7.5 12.5L9.5 13L11.5 12.5L11 14.5L11.5 16.5L9.5 16L7.5 16.5L8 14.5L7.5 12.5Z"
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
          opacity={oneTone ? 1 : 0.4}
          d="M14.5 1.25C19.0563 1.25005 22.75 4.94368 22.75 9.5C22.75 12.3668 21.2867 14.8896 19.0684 16.3682C19.1858 15.7634 19.25 15.1391 19.25 14.5C19.25 9.11522 14.8848 4.75 9.5 4.75C8.86061 4.75 8.2359 4.81317 7.63086 4.93066C9.1093 2.71221 11.6332 1.25 14.5 1.25Z"
          fill="currentColor"
        />
        <path
          d="M10.2725 14.3184C10.2427 14.4376 10.2427 14.5624 10.2725 14.6816L10.4688 15.4688L9.68164 15.2725C9.59205 15.2501 9.49934 15.2446 9.4082 15.2559L9.31836 15.2725L8.53027 15.4688L8.72754 14.6816C8.75731 14.5624 8.75729 14.4376 8.72754 14.3184L8.53027 13.5303L9.31836 13.7275C9.43761 13.7573 9.5624 13.7573 9.68164 13.7275L10.4688 13.5303L10.2725 14.3184Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.5 6.25C14.0563 6.25 17.75 9.94365 17.75 14.5C17.75 19.0563 14.0563 22.75 9.5 22.75C4.94365 22.75 1.25 19.0563 1.25 14.5C1.25 9.94365 4.94365 6.25 9.5 6.25ZM12.0303 11.9697C11.8441 11.7835 11.5739 11.7087 11.3184 11.7725L9.5 12.2275L7.68164 11.7725C7.42613 11.7087 7.15596 11.7835 6.96973 11.9697C6.7835 12.156 6.70867 12.4261 6.77246 12.6816L7.22754 14.5L6.77246 16.3184C6.7087 16.5739 6.78351 16.8441 6.96973 17.0303C7.15595 17.2164 7.42617 17.2913 7.68164 17.2275L9.5 16.7725L11.3184 17.2275C11.5738 17.2913 11.8441 17.2165 12.0303 17.0303C12.2165 16.8441 12.2913 16.5738 12.2275 16.3184L11.7725 14.5L12.2275 12.6816C12.2913 12.4262 12.2164 12.156 12.0303 11.9697Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
