import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSign({
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
          d="M5.61022 20.9544C3.8852 20.6721 2.43119 19.5129 1.77169 17.8941V17.8941C1.27697 16.6798 1.27697 15.3202 1.77169 14.1059V14.1059C2.43119 12.4871 3.8852 11.3279 5.61022 11.0456L6.79509 10.8517C10.2421 10.2877 13.7579 10.2877 17.2049 10.8517L18.3898 11.0456C20.1148 11.3279 21.5688 12.4871 22.2283 14.1059V14.1059C22.723 15.3202 22.723 16.6798 22.2283 17.8941V17.8941C21.5688 19.5129 20.1148 20.6721 18.3898 20.9544L17.8354 21.0451C13.9708 21.6775 10.0292 21.6775 6.16459 21.0451L5.61022 20.9544Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M10 3.5L6 11"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M14 3.5L18 11"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M10 4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4Z"
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
          d="M6.67442 10.1106C10.2015 9.53348 13.7997 9.53343 17.3268 10.1106L18.5113 10.3049C20.4939 10.6295 22.1654 11.962 22.9234 13.8225C23.4918 15.2179 23.4917 16.7806 22.9234 18.176C22.1655 20.0365 20.4939 21.369 18.5113 21.6936L17.9566 21.7844C14.012 22.4299 9.98821 22.4299 6.04356 21.7844L5.48985 21.6936C3.50712 21.3691 1.83576 20.0366 1.07774 18.176C0.509264 16.7804 0.509224 15.2181 1.07774 13.8225C1.83581 11.962 3.50722 10.6294 5.48985 10.3049L6.67442 10.1106Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M6.66238 11.3529C6.4675 11.7183 6.01274 11.857 5.64729 11.6623C5.28193 11.4674 5.14328 11.0126 5.33794 10.6472L9.3382 3.14731C9.53312 2.78184 9.98781 2.64305 10.3533 2.83795C10.7186 3.0328 10.8565 3.48694 10.662 3.85234L6.66238 11.3529Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M17.3376 11.3529C17.5325 11.7183 17.9873 11.857 18.3527 11.6623C18.7181 11.4674 18.8567 11.0126 18.6621 10.6472L14.6618 3.14731C14.4669 2.78184 14.0122 2.64305 13.6467 2.83795C13.2814 3.0328 13.1435 3.48694 13.338 3.85234L17.3376 11.3529Z"
          fill="currentColor"
        />
        <path
          d="M14.75 4C14.75 2.48122 13.5188 1.25 12 1.25C10.4812 1.25 9.25 2.48122 9.25 4C9.25 5.51878 10.4812 6.75 12 6.75C13.5188 6.75 14.75 5.51878 14.75 4Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
