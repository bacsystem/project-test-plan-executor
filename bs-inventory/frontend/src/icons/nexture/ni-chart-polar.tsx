import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChartPolar({
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
          d="M9.87491 1.77199C5.54062 2.07792 2.07792 5.54062 1.77198 9.87491C1.74768 10.2192 2.02982 10.5 2.375 10.5L9.875 10.5C10.2202 10.5 10.5 10.2202 10.5 9.875L10.5 2.375C10.5 2.02982 10.2192 1.74768 9.87491 1.77199Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M5.53853 14.1238C5.82011 16.3865 7.61354 18.1799 9.87624 18.4615C10.2188 18.5041 10.5 18.2202 10.5 17.875L10.5 14.125C10.5 13.7798 10.2202 13.5 9.875 13.5L6.125 13.5C5.77982 13.5 5.4959 13.7812 5.53853 14.1238Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20.9743 9.87519C20.6738 6.23141 17.7686 3.32617 14.1248 3.02566C13.7808 2.99728 13.5 3.27982 13.5 3.625L13.5 9.875C13.5 10.2202 13.7798 10.5 14.125 10.5L20.375 10.5C20.7202 10.5 21.0027 10.2192 20.9743 9.87519Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          d="M14.1251 22.228C18.4594 21.9221 21.9221 18.4594 22.228 14.1251C22.2523 13.7808 21.9702 13.5 21.625 13.5L14.125 13.5C13.7798 13.5 13.5 13.7798 13.5 14.125L13.5 21.625C13.5 21.9702 13.7808 22.2523 14.1251 22.228Z"
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
          opacity={oneTone ? 1 : 0.4}
          d="M9.87537 12.7498C10.6346 12.75 11.2504 13.3655 11.2504 14.1248V17.8748C11.2503 18.6056 10.6358 19.3118 9.78357 19.2059C7.18046 18.8818 5.11852 16.8197 4.79431 14.2166C4.68823 13.3642 5.39449 12.7498 6.12537 12.7498H9.87537Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M14.1869 2.27815C18.1962 2.60885 21.3914 5.80405 21.722 9.81331C21.7897 10.6347 21.1174 11.2498 20.3754 11.2498H14.1254C13.3661 11.2498 12.7505 10.6341 12.7504 9.87483V3.62483C12.7504 2.8828 13.3654 2.21042 14.1869 2.27815Z"
          fill="currentColor"
        />
        <path
          d="M21.6255 12.7505C22.3703 12.7508 23.0343 13.366 22.9771 14.1783C22.6448 18.8851 18.8841 22.6448 14.1773 22.9771C13.3651 23.034 12.7495 22.3704 12.7495 21.6255L12.7505 14.1255C12.7505 13.3661 13.3661 12.7505 14.1255 12.7505H21.6255Z"
          fill="currentColor"
        />
        <path
          d="M9.82181 1.02298C10.6342 0.965747 11.2495 1.62955 11.2495 2.37454V9.87454C11.2495 10.6339 10.6339 11.2495 9.87454 11.2495H2.37454C1.62972 11.2493 0.965754 10.634 1.02298 9.82181C1.35521 5.11511 5.11517 1.35544 9.82181 1.02298Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
