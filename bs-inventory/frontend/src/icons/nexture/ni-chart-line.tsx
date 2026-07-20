import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChartLine({
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
          d="M21 21L16.8283 21.4635C13.6193 21.8201 10.3807 21.8201 7.17167 21.4635V21.4635C4.73277 21.1925 2.80747 19.2672 2.53648 16.8283V16.8283C2.17992 13.6193 2.17992 10.3807 2.53648 7.17167L3 3"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M6 15L9 12C10.1046 10.8954 11.8954 10.8954 13 12V12C14.1046 13.1046 15.8954 13.1046 17 12L20 9"
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
          d="M21.7453 20.9168C21.7882 21.3029 21.5303 21.6534 21.1584 21.7332L21.0832 21.7449L16.9114 22.2088C13.6473 22.5714 10.3531 22.5714 7.08909 22.2088C4.30155 21.899 2.10097 19.6985 1.79124 16.9109C1.42857 13.6469 1.42857 10.3527 1.79124 7.08864L2.25511 2.91677L2.26683 2.84157C2.34658 2.46969 2.69713 2.21176 3.08323 2.25466C3.46897 2.29763 3.75365 2.62572 3.75023 3.00563L3.74534 3.08278L3.28245 7.25466C2.93206 10.4084 2.93206 13.5912 3.28245 16.7449C3.5147 18.8352 5.16483 20.4853 7.25511 20.7175C10.4088 21.0679 13.5916 21.0679 16.7453 20.7175L20.9172 20.2547L20.9944 20.2498C21.3743 20.2463 21.7024 20.531 21.7453 20.9168Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M20.5303 8.46967C20.2374 8.17678 19.7627 8.17678 19.4698 8.46967L16.4698 11.4697C15.6581 12.2813 14.342 12.2813 13.5303 11.4697C12.1329 10.0722 9.86725 10.0722 8.46978 11.4697L5.46978 14.4697L5.41803 14.5263C5.17772 14.8209 5.19518 15.2556 5.46978 15.5302C5.74439 15.8048 6.17911 15.8223 6.47369 15.582L6.53033 15.5302L9.53033 12.5302C10.342 11.7185 11.6581 11.7185 12.4698 12.5302C13.8672 13.9277 16.1329 13.9277 17.5303 12.5302L20.5303 9.53022C20.8232 9.23732 20.8232 8.76256 20.5303 8.46967Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
