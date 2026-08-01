import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiRouter({
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
          d="M5.51235 19.7431C4.23302 19.5939 3.13483 18.751 2.66458 17.5519L2.6099 17.4124C2.219 16.4157 2.23486 15.3053 2.65408 14.3201V14.3201C3.13296 13.1947 4.19777 12.4103 5.41256 12.2685V12.2685C9.74667 11.7629 14.2367 11.7631 18.5703 12.273V12.273C19.7582 12.4127 20.7989 13.169 21.2869 14.2611V14.2611C21.7422 15.2803 21.7594 16.4416 21.3344 17.4737L21.2781 17.6103C20.7978 18.7768 19.7232 19.5914 18.4704 19.7388V19.7388C14.1715 20.2445 9.81174 20.2447 5.51235 19.7431V19.7431Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M6 16L14 16"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M17.5 16L18 16"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M6 4L6 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M18 4L18 12"
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.32614 11.5245C9.71777 11.0122 14.2666 11.0118 18.6582 11.5284C20.1049 11.6988 21.3745 12.6199 21.9716 13.9562C22.5107 15.1627 22.5312 16.5379 22.0283 17.7599L21.9716 17.8966C21.3878 19.3145 20.0814 20.3051 18.5586 20.4845C14.2016 20.9971 9.78277 20.9967 5.42575 20.4884C3.8726 20.3072 2.5386 19.2844 1.96676 17.8263L1.91208 17.6866C1.44973 16.5072 1.46791 15.1932 1.96383 14.0275C2.55013 12.6502 3.84877 11.6969 5.32614 11.5245ZM5.99997 15.2501C5.58579 15.2501 5.25003 15.586 5.24997 16.0001C5.24997 16.4143 5.58575 16.7501 5.99997 16.7501H14L14.0771 16.7462C14.4551 16.7076 14.75 16.3883 14.75 16.0001C14.7499 15.612 14.455 15.2926 14.0771 15.254L14 15.2501H5.99997ZM17.5 15.2501C17.0858 15.2501 16.75 15.586 16.75 16.0001C16.75 16.4143 17.0858 16.7501 17.5 16.7501H18L18.0771 16.7462C18.4551 16.7076 18.75 16.3883 18.75 16.0001C18.7499 15.612 18.455 15.2926 18.0771 15.254L18 15.2501H17.5Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M6 3.25C6.41421 3.25 6.75 3.58579 6.75 4V12L6.74609 12.0771C6.70747 12.4551 6.38817 12.75 6 12.75C5.61183 12.75 5.29253 12.4551 5.25391 12.0771L5.25 12V4C5.25 3.58579 5.58579 3.25 6 3.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M18 3.25C18.4142 3.25 18.75 3.58579 18.75 4V12L18.7461 12.0771C18.7075 12.4551 18.3882 12.75 18 12.75C17.6118 12.75 17.2925 12.4551 17.2539 12.0771L17.25 12V4C17.25 3.58579 17.5858 3.25 18 3.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M14.0771 15.2539C14.4551 15.2925 14.75 15.6118 14.75 16C14.75 16.3882 14.4551 16.7075 14.0771 16.7461L14 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H14L14.0771 15.2539Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M18.0771 15.2539C18.4551 15.2925 18.75 15.6118 18.75 16C18.75 16.3882 18.4551 16.7075 18.0771 16.7461L18 16.75H17.5C17.0858 16.75 16.75 16.4142 16.75 16C16.75 15.5858 17.0858 15.25 17.5 15.25H18L18.0771 15.2539Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
