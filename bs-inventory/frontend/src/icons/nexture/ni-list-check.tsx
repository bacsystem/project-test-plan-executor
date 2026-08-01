import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiListCheck({
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
          d="M22 5L11 5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M22 12L11 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M22 19L11 19"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M7.01073 3L4.35284 6.08992C4.16267 6.311 3.82443 6.32309 3.61897 6.11615L2.51073 5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M7.01073 10L4.35284 13.0899C4.16267 13.311 3.82443 13.3231 3.61897 13.1162L2.51073 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M7.01073 17L4.35284 20.0899C4.16267 20.311 3.82443 20.3231 3.61897 20.1162L2.51073 19"
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
          d="M22 4.25C22.4142 4.25 22.75 4.58579 22.75 5C22.75 5.41421 22.4142 5.75 22 5.75L11 5.75C10.5858 5.75 10.25 5.41421 10.25 5C10.25 4.58579 10.5858 4.25 11 4.25L22 4.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75L11 12.75C10.5858 12.75 10.25 12.4142 10.25 12C10.25 11.5858 10.5858 11.25 11 11.25L22 11.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M22 18.25C22.4142 18.25 22.75 18.5858 22.75 19C22.75 19.4142 22.4142 19.75 22 19.75L11 19.75C10.5858 19.75 10.25 19.4142 10.25 19C10.25 18.5858 10.5858 18.25 11 18.25L22 18.25Z"
          fill="currentColor"
        />
        <path
          d="M7.5001 2.43158C7.79443 2.68494 7.84384 3.11694 7.62608 3.42865L7.5792 3.4892L4.92198 6.57904C4.44658 7.13172 3.60069 7.16176 3.08702 6.64447L1.97862 5.52826C1.68683 5.23432 1.68861 4.75954 1.98253 4.46771C2.27646 4.17594 2.75125 4.17771 3.04307 4.47162L3.96104 5.39545L6.44249 2.51068L6.49522 2.45502C6.77097 2.19347 7.20575 2.17839 7.5001 2.43158Z"
          fill="currentColor"
        />
        <path
          d="M7.5001 9.43158C7.79443 9.68494 7.84384 10.1169 7.62608 10.4287L7.5792 10.4892L4.92198 13.579C4.44658 14.1317 3.60069 14.1618 3.08702 13.6445L1.97862 12.5283C1.68683 12.2343 1.68861 11.7595 1.98253 11.4677C2.27646 11.1759 2.75125 11.1777 3.04307 11.4716L3.96104 12.3954L6.44249 9.51068L6.49522 9.45502C6.77097 9.19347 7.20575 9.17839 7.5001 9.43158Z"
          fill="currentColor"
        />
        <path
          d="M7.5001 16.4316C7.79443 16.6849 7.84384 17.1169 7.62608 17.4287L7.5792 17.4892L4.92198 20.579C4.44658 21.1317 3.60069 21.1618 3.08702 20.6445L1.97862 19.5283C1.68683 19.2343 1.68861 18.7595 1.98253 18.4677C2.27646 18.1759 2.75125 18.1777 3.04307 18.4716L3.96104 19.3954L6.44249 16.5107L6.49522 16.455C6.77097 16.1935 7.20575 16.1784 7.5001 16.4316Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
