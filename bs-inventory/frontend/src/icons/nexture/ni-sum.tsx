import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSum({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M18 21.0056L16.601 21.2375C13.566 21.7405 10.46 21.615 7.47549 20.8689V20.8689C6.05103 20.5128 5.65088 18.6793 6.79743 17.7621L12.0478 13.5617C13.0486 12.7611 13.0486 11.2389 12.0478 10.4383L6.79382 6.23506C5.64875 5.319 6.04839 3.4879 7.47101 3.13225V3.13225C10.4584 2.38541 13.5675 2.26124 16.6049 2.76748L18 3"
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
          d="M16.7236 21.9775C13.5875 22.4973 10.378 22.3676 7.29394 21.5967C5.26738 21.09 4.69796 18.4817 6.3291 17.1767L11.5791 12.9766C12.2046 12.4761 12.2046 11.5238 11.5791 11.0234L6.32519 6.8203C4.69579 5.51646 5.26441 2.91045 7.28906 2.40429C10.3762 1.6325 13.5896 1.50419 16.7285 2.02733L18.123 2.25975L18.1982 2.27636C18.5649 2.37634 18.8039 2.74007 18.7402 3.12304C18.6721 3.53151 18.2854 3.80812 17.8769 3.74022L16.4814 3.50682C13.5458 3.01757 10.5406 3.1376 7.65331 3.85936C6.83281 4.06449 6.60226 5.12106 7.26269 5.6494L12.5166 9.85253C13.8926 10.9534 13.8926 13.0466 12.5166 14.1474L7.26562 18.3476C6.60395 18.8772 6.83502 19.936 7.65722 20.1416C10.5422 20.8628 13.5448 20.9833 16.4785 20.4971L17.8769 20.2656C18.2856 20.1979 18.6725 20.4742 18.7402 20.8828C18.8079 21.2913 18.5314 21.6772 18.123 21.7451L16.7236 21.9775Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
