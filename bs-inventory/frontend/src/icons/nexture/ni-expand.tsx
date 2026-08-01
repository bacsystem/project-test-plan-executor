import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiExpand({
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
          opacity={oneTone ? 1 : 0.6}
          d="M2.33154 14.9839C2.72233 18.501 5.49878 21.2774 9.01589 21.6682"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M21.6687 9.01589C21.2779 5.49878 18.5015 2.72233 14.9844 2.33154"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M2.33154 9.01589C2.72233 5.49878 5.49878 2.72233 9.01589 2.33154"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M21.6687 14.9844C21.2779 18.5015 18.5015 21.2779 14.9844 21.6687"
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
          opacity={oneTone ? 1 : 0.4}
          d="M2.24857 14.2388C2.63467 14.1959 2.98522 14.4538 3.06497 14.8257L3.07669 14.9009L3.11673 15.1958C3.57124 18.1258 5.87341 20.4285 8.80325 20.8833L9.09915 20.9224L9.17435 20.9351C9.54609 21.0149 9.80415 21.3655 9.76126 21.7515C9.71818 22.1374 9.38948 22.4223 9.00931 22.4185L8.93314 22.4136L8.57278 22.3657C4.99804 21.8109 2.18882 19.0011 1.63431 15.4263L1.58646 15.0669L1.58157 14.9898C1.57815 14.6099 1.86283 14.2818 2.24857 14.2388Z"
          fill="currentColor"
        />
        <path
          d="M15.0672 1.58646L15.4265 1.63431C19.0014 2.18882 21.8112 4.99804 22.366 8.57278L22.4138 8.93314L22.4187 9.00931C22.4225 9.38948 22.1376 9.71818 21.7517 9.76126C21.3657 9.80415 21.0152 9.54609 20.9353 9.17435L20.9226 9.09915L20.8836 8.80325C20.4288 5.87341 18.126 3.57124 15.1961 3.11673L14.9011 3.07669L14.8259 3.06497C14.4541 2.98522 14.1961 2.63467 14.239 2.24857C14.282 1.86283 14.6101 1.57815 14.99 1.58157L15.0672 1.58646Z"
          fill="currentColor"
        />
        <path
          d="M8.93288 1.58644C9.3445 1.54071 9.71517 1.83697 9.761 2.24855C9.80673 2.66009 9.51035 3.03073 9.0989 3.07668C5.93042 3.42873 3.42849 5.93066 3.07643 9.09914C3.03048 9.5106 2.65985 9.80697 2.24831 9.76125C1.83673 9.71541 1.54047 9.34474 1.5862 8.93312C2.01573 5.06737 5.06713 2.01597 8.93288 1.58644Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M21.7517 14.2393C22.1632 14.2852 22.4596 14.6559 22.4138 15.0674L22.366 15.4268C21.793 19.1209 18.8122 21.9979 15.0672 22.4141L14.99 22.419C14.6102 22.4224 14.2821 22.1376 14.239 21.752C14.1933 21.3403 14.4895 20.9687 14.9011 20.9229L15.1961 20.8838C18.2239 20.4141 20.5816 17.9709 20.9226 14.9014L20.9353 14.8262C21.0151 14.4543 21.3656 14.1964 21.7517 14.2393Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
