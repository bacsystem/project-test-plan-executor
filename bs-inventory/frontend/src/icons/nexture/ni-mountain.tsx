import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiMountain({
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
          d="M4.23607 20C2.7493 20 1.78231 18.4354 2.44721 17.1056L4.18765 13.6247C4.81806 12.3639 6.52007 12.1334 7.46309 13.1812L8.17464 13.9718C9.07888 14.9765 10.6987 14.8135 11.3846 13.6488L13.5816 9.91802C14.354 8.60646 16.2501 8.60405 17.0258 9.91366L21.2117 16.9808C22.0013 18.314 21.0404 20 19.4909 20L4.23607 20Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <circle opacity={oneTone ? 1 : 0.6} cx="8" cy="6" r="2" stroke="currentColor" strokeWidth={iconStrokeWidth} />
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
          d="M12.9358 9.53778C13.9978 7.7348 16.6045 7.73156 17.6711 9.53193L21.8576 16.5993C22.9425 18.4321 21.6213 20.7501 19.4914 20.7507H4.23654C2.19238 20.7507 0.862718 18.5996 1.77658 16.7712L3.51681 13.2897C4.38368 11.5562 6.7241 11.2397 8.02072 12.6804L8.73264 13.4704C9.29777 14.0978 10.3098 13.9967 10.7385 13.2692L12.9358 9.53778Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M8 3.25C9.51878 3.25 10.75 4.48122 10.75 6C10.75 7.51878 9.51878 8.75 8 8.75C6.48122 8.75 5.25 7.51878 5.25 6C5.25 4.48122 6.48122 3.25 8 3.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
