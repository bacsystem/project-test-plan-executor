import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiHeart({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M2 9.34385C2 15.638 8.20633 19.5195 11.3839 20.7759C11.7805 20.9328 12.2195 20.9328 12.6161 20.7759C15.7937 19.5195 22 15.638 22 9.34385C22 6.37211 20.4779 3.46837 17.44 3.07135C14 2.62178 13 4.39359 12 5.67101C11 4.39359 10 2.62178 6.56 3.07135C3.52211 3.46837 2 6.37211 2 9.34385Z"
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
          d="M6.46289 2.32765C8.33287 2.08327 9.63467 2.43589 10.6162 3.10207C11.1907 3.49204 11.6366 3.98502 12 4.43996C12.3634 3.98502 12.8093 3.49204 13.3838 3.10207C14.3653 2.43589 15.6671 2.08327 17.5371 2.32765C21.1124 2.7949 22.75 6.18795 22.75 9.34328C22.75 12.7563 21.0639 15.4816 19.0254 17.4839C16.9908 19.4824 14.553 20.8162 12.8916 21.4732C12.318 21.6999 11.682 21.6999 11.1084 21.4732C9.44702 20.8162 7.00923 19.4824 4.97461 17.4839C2.93615 15.4816 1.25 12.7563 1.25 9.34328C1.25005 6.18795 2.88758 2.7949 6.46289 2.32765Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
