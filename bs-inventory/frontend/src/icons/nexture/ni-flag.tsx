import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiFlag({
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
          d="M5 4L6.27803 3.68049C8.04757 3.23811 9.91152 3.36461 11.6051 4.04203V4.04203C13.1679 4.66716 14.8788 4.82424 16.5293 4.49413L17.5453 4.29095C18.2978 4.14043 19 4.71606 19 5.48355V8.5L19 11.8978C19 12.5387 18.5476 13.0905 17.9192 13.2162L16.5293 13.4941C14.8788 13.8242 13.1679 13.6672 11.6051 13.042V13.042C9.91152 12.3646 8.04757 12.2381 6.27803 12.6805L5 13"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          d="M4.5 21.5L4.94903 17.2342C5.31533 13.7544 5.31533 10.2456 4.94903 6.76576L4.5 2.5"
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
          d="M3.75413 21.4221C3.71101 21.8339 4.0103 22.203 4.4221 22.2463C4.83388 22.2894 5.20297 21.9902 5.24632 21.5784L5.69554 17.3127C6.0673 13.7808 6.0673 10.2196 5.69554 6.68773L5.24632 2.42211L5.2346 2.34593C5.1569 1.97389 4.80818 1.71371 4.4221 1.75414C4.03587 1.79479 3.74878 2.122 3.75023 2.50218L3.75413 2.57836L4.20335 6.84496C4.5641 10.2723 4.5641 13.7281 4.20335 17.1555L3.75413 21.4221Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M6.0957 2.95242C8.01816 2.47183 10.0439 2.60904 11.8838 3.345C13.3113 3.91587 14.8743 4.05952 16.3818 3.75808L17.3984 3.55496C18.6149 3.31194 19.75 4.24305 19.75 5.48367V11.8977L19.7422 12.0833C19.6607 13.0005 18.9837 13.7679 18.0664 13.9514L16.6768 14.2298C14.8838 14.5883 13.0239 14.4175 11.3262 13.7386C9.77912 13.1198 8.07643 13.0034 6.45996 13.4075C6.28476 13.4513 6.1144 13.4555 5.95312 13.4348C6.0168 11.1838 5.93134 8.92917 5.69531 6.68679L5.32422 3.16629C5.40092 3.13345 5.4811 3.10608 5.56445 3.08523L6.0957 2.95242Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
