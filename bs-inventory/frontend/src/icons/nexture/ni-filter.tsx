import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiFilter({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M5.54102 1.94853C9.80985 1.14818 14.1902 1.14818 18.459 1.94853C19.7871 2.19758 20.75 3.35705 20.75 4.7083V6.96318C20.7498 7.80313 20.4672 8.6191 19.9482 9.27959L15.5176 14.9202C15.3447 15.1403 15.2501 15.4118 15.25 15.6917V18.8675C15.2499 19.8332 14.7431 20.7289 13.915 21.2259L12.1572 22.2806C10.6577 23.1797 8.75025 22.0994 8.75 20.3509V15.6917C8.74993 15.4118 8.65526 15.1403 8.48242 14.9202L4.05176 9.27959C3.53281 8.6191 3.25018 7.80313 3.25 6.96318V4.7083C3.25001 3.35705 4.21292 2.19758 5.54102 1.94853Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
