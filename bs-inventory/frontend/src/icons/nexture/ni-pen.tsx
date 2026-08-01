import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPen({
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
          d="M3.84552 14.556L3.73489 14.6904C3.15581 15.394 2.81901 16.2654 2.77449 17.1755L2.63511 20.0248C2.60553 20.6293 3.11556 21.1213 3.71863 21.0701L6.66824 20.8193C7.40218 20.7569 8.10957 20.4774 8.69109 20.0253C12.0631 17.4037 14.5781 15.1364 17.2269 12.2189C18.2756 11.0637 18.1961 9.29275 17.0928 8.18947L15.533 6.6297C14.4297 5.52642 12.6597 5.44766 11.5007 6.49224C8.7068 9.01033 6.3965 11.4569 3.84552 14.556Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M17.7189 11.4997L21.1013 7.82558C22.0234 6.76137 22.2703 5.3317 21.7213 4.23516C21.2283 3.25039 20.4451 2.46714 19.4603 1.97413C18.3637 1.42516 16.9341 1.67203 15.8699 2.59412L12.205 5.9859"
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
          d="M10.9982 5.93518C12.4652 4.61306 14.6893 4.72496 16.0637 6.09924L17.6232 7.65881C18.997 9.03256 19.1119 11.2589 17.7824 12.7233C15.0995 15.6784 12.5509 17.975 9.15155 20.6178C8.4571 21.1576 7.61172 21.4922 6.73163 21.567L3.78241 21.817C2.72724 21.9065 1.83427 21.0456 1.88592 19.9879L2.02557 17.1393C2.07797 16.0682 2.47398 15.0415 3.15545 14.2135L3.26678 14.0797C5.83848 10.9554 8.17392 8.48073 10.9982 5.93518Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M15.3799 2.02738C16.63 0.944583 18.3815 0.595134 19.7969 1.30374C20.9262 1.86923 21.8271 2.77011 22.3926 3.89945C23.0567 5.2264 22.7913 6.84962 21.8633 8.07718L21.6689 8.31742L21.6621 8.32523L21.6543 8.33402L20.2031 9.90921C20.111 8.69225 19.5924 7.50752 18.6836 6.59867L17.124 5.03909C16.203 4.1182 15.001 3.59844 13.7695 3.51566L15.3613 2.04398L15.3711 2.03519L15.3799 2.02738Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
