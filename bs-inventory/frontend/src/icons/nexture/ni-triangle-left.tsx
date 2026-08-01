import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiTriangleLeft({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M8.27917 10.4184C7.32896 11.263 7.3213 12.7452 8.26273 13.5996L8.90326 14.1809C10.2144 15.3709 11.8257 16.1802 13.5631 16.5214V16.5214C14.9004 16.784 16.1922 15.896 16.4259 14.5534L16.4629 14.3406C16.7325 12.7917 16.7325 11.2079 16.4629 9.65905L16.4251 9.44188C16.1921 8.10326 14.9019 7.21959 13.5695 7.48602V7.48602C11.8869 7.8225 10.324 8.60069 9.0415 9.74072L8.27917 10.4184Z"
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
          d="M13.4231 6.75046C15.1686 6.40182 16.859 7.56024 17.1643 9.31393L17.2024 9.53073C17.4868 11.1645 17.4867 12.8354 17.2024 14.4692L17.1653 14.6821C16.8595 16.4389 15.1689 17.6007 13.4192 17.2573C11.5478 16.8898 9.81192 16.0184 8.39965 14.7368L7.75902 14.1557C6.48735 13.0016 6.49795 10.9988 7.78148 9.85788L8.5432 9.18015C9.92518 7.95177 11.61 7.11302 13.4231 6.75046Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
