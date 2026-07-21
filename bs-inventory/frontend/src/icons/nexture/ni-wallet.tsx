import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiWallet({
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
          d="M17.5 6.5C17.5 6 17.3715 5.41996 16.7315 4.78996L14.9815 3.02C13.6115 1.66 11.3915 1.66 10.0215 3.02L7 6.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.1898 6.46553C19.0214 6.78016 21.2815 8.97074 21.6845 11.7912V11.7912C21.8938 13.2563 21.8938 14.7437 21.6845 16.2088V16.2088C21.2815 19.0293 19.0214 21.2198 16.1898 21.5345L15.3666 21.6259C13.1291 21.8745 10.8709 21.8745 8.63344 21.6259L7.81025 21.5345C4.97857 21.2198 2.71847 19.0293 2.31554 16.2088V16.2088C2.10624 14.7437 2.10624 13.2563 2.31554 11.7912V11.7912C2.71847 8.97074 4.97857 6.78016 7.81025 6.46553L8.63343 6.37406C10.8709 6.12545 13.1291 6.12545 15.3666 6.37406L16.1898 6.46553Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M21.5 12H19C17.9 12 17 12.9 17 14C17 15.1 17.9 16 19 16H21.5"
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
          opacity={oneTone ? 1 : 0.4}
          d="M9.49316 2.48732C11.1555 0.837568 13.8474 0.837551 15.5098 2.48732L17.2578 4.25588L17.3877 4.38967C17.0771 4.31903 16.76 4.26439 16.4375 4.22854L15.6143 4.13869L15.6152 4.13772C13.2129 3.87082 10.787 3.87085 8.38477 4.13772L8.02246 4.17678L9.45508 2.52834L9.49316 2.48732Z"
          fill="currentColor"
        />
        <path
          d="M8.5502 5.62852C10.8426 5.37384 13.1572 5.37381 15.4496 5.62852L16.2729 5.71934C19.2972 6.0556 21.7387 8.30334 22.35 11.2506H18.9994C17.4854 11.2508 16.2494 12.4865 16.2494 14.0006C16.2496 15.5145 17.4855 16.7504 18.9994 16.7506H22.349C21.737 19.6968 19.2965 21.9427 16.2729 22.2789L15.4496 22.3707C13.1572 22.6254 10.8426 22.6254 8.5502 22.3707L7.72794 22.2789C4.55632 21.9265 2.02396 19.4731 1.57266 16.3141C1.35342 14.7789 1.35335 13.2194 1.57266 11.6842C2.0243 8.52555 4.55661 6.07171 7.72794 5.71934L8.5502 5.62852Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M22.5425 12.75C22.6061 13.5821 22.6063 14.4179 22.5425 15.25H18.9995C18.314 15.2498 17.7497 14.6855 17.7495 14C17.7495 13.3143 18.3139 12.7502 18.9995 12.75H22.5425Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
