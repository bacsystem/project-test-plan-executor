import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPlay({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M19.2538 15.5258C21.285 13.6141 21.285 10.3859 19.2538 8.4742L18.3772 7.64917C15.8619 5.28183 12.64 3.80421 9.20483 3.44261L9.08354 3.42985C6.75691 3.18494 4.61677 4.72455 4.10926 7.00832V7.00832C3.37867 10.296 3.37867 13.704 4.10926 16.9917V16.9917C4.61677 19.2755 6.75691 20.8151 9.08354 20.5702L9.20483 20.5574C12.64 20.1958 15.8619 18.7182 18.3772 16.3508L19.2538 15.5258Z"
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
          d="M3.37677 6.84534C3.96706 4.18965 6.45637 2.39864 9.16193 2.68323L9.28302 2.69593C12.8812 3.07468 16.2567 4.62355 18.8914 7.10315L19.7684 7.92737C22.1141 10.1352 22.1132 13.8641 19.7674 16.0719L18.8914 16.8971C16.2567 19.3768 12.8812 20.9246 9.28302 21.3033L9.16193 21.316C6.45626 21.6007 3.96696 19.8098 3.37677 17.1539C2.62248 13.7593 2.62243 10.24 3.37677 6.84534Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
