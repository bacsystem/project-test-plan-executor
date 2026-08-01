import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiFilterMinus({
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
          d="M4 4.70802C4 3.71766 4.70537 2.86774 5.67877 2.68523V2.68523C9.85652 1.9019 14.1435 1.9019 18.3212 2.68523V2.68523C19.2946 2.86774 20 3.71766 20 4.70802V6.96241C20 7.6346 19.7742 8.28732 19.359 8.81588L14.9274 14.4561C14.6505 14.8085 14.5 15.2436 14.5 15.6917V18.8676C14.5 19.5701 14.1314 20.2212 13.529 20.5826L11.7717 21.637C10.772 22.2368 9.5 21.5167 9.5 20.3507V15.6917C9.5 15.2436 9.3495 14.8085 9.07264 14.4561L4.64104 8.81587C4.22575 8.28732 4 7.6346 4 6.96241V4.70802Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M10 8H13.9996"
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
          d="M5.54102 1.94853C9.80985 1.14818 14.1901 1.14818 18.459 1.94853C19.7871 2.19757 20.75 3.35705 20.75 4.7083V6.9622C20.75 7.80236 20.4673 8.61895 19.9482 9.27959L15.5176 14.9192C15.3447 15.1394 15.2501 15.4118 15.25 15.6917V18.8675C15.2499 19.8333 14.7432 20.7289 13.915 21.2259L12.1572 22.2806C10.6577 23.1798 8.75016 22.0995 8.75 20.3509V15.6917C8.74994 15.4118 8.65534 15.1394 8.48242 14.9192L4.05176 9.27959C3.53269 8.61895 3.25005 7.80236 3.25 6.9622V4.7083C3.25001 3.35705 4.21291 2.19757 5.54102 1.94853ZM10 7.25029C9.58579 7.25029 9.25 7.58608 9.25 8.00029C9.25018 8.41435 9.5859 8.75029 10 8.75029H14L14.0762 8.74638C14.4543 8.70804 14.7498 8.38851 14.75 8.00029C14.75 7.61193 14.4544 7.29256 14.0762 7.2542L14 7.25029H10Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M14 7.25L14.0762 7.25391C14.4544 7.29226 14.75 7.61163 14.75 8C14.75 8.38837 14.4544 8.70774 14.0762 8.74609L14 8.75H10C9.58579 8.75 9.25001 8.41421 9.25 8C9.25 7.58579 9.58579 7.25 10 7.25H14Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
