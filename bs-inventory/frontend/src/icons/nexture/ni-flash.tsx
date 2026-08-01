import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiFlash({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M15 9C15 9.55228 15.4477 10 16 10L16.9312 10C18.3411 10 19.2581 11.4838 18.6276 12.7448V12.7448C17.2164 15.5672 15.41 18.1739 13.2628 20.4862L12.166 21.6674C11.3929 22.4999 10 21.9529 10 20.8168L10 15C10 14.4477 9.55228 14 9 14L8.06881 14C6.65889 14 5.74188 12.5162 6.37241 11.2552V11.2552C7.78359 8.43281 9.59004 5.82611 11.7372 3.51379L12.834 2.33261C13.6071 1.50009 15 2.04709 15 3.18317L15 9Z"
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
          d="M12.2838 1.82212C13.5206 0.490206 15.7494 1.36591 15.7496 3.18345V8.99986C15.7496 9.13779 15.8617 9.24963 15.9996 9.24986H16.9312C18.8984 9.25004 20.1779 11.3203 19.2984 13.0799C17.8554 15.966 16.0077 18.6314 13.8121 20.996L12.7154 22.1776C11.4785 23.5096 9.2496 22.634 9.2496 20.8163V14.9999C9.24945 14.8619 9.13758 14.7499 8.9996 14.7499H8.06893C6.10161 14.7497 4.82191 12.6795 5.70175 10.9198C7.14473 8.03386 8.99162 5.3682 11.1871 3.00376L12.2838 1.82212Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
