import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiEyeClose({
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
          d="M22.0539 12C22.0536 12.986 21.7851 13.972 21.2484 14.8441C17.0078 21.735 6.99136 21.735 2.75079 14.8441C2.21411 13.972 1.94561 12.986 1.94531 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M4.00001 17.0001L2.5 18.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20 17L21.5 18.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M15.75 20L16.25 22"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M8.24998 20L7.75 22"
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
          d="M1.19531 12C1.19531 11.5859 1.53118 11.2501 1.94531 11.25C2.35942 11.25 2.69519 11.5859 2.69531 12C2.69561 12.85 2.92711 13.6996 3.38965 14.4512C7.33736 20.866 16.6616 20.8659 20.6094 14.4512C21.0719 13.6996 21.3034 12.85 21.3037 12C21.3038 11.5859 21.6397 11.2501 22.0537 11.25C22.4678 11.2501 22.8037 11.5859 22.8037 12C22.8034 13.122 22.4975 14.2448 21.8867 15.2373C17.3532 22.6038 6.64575 22.6038 2.1123 15.2373C1.50151 14.2448 1.19565 13.122 1.19531 12Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M3.46962 16.4698L3.52694 16.418C3.82149 16.178 4.25577 16.1954 4.53028 16.4698C4.82316 16.7627 4.82319 17.2376 4.53028 17.5305L3.03044 19.0303C2.73755 19.3232 2.26267 19.3232 1.96978 19.0303C1.67691 18.7374 1.6769 18.2626 1.96978 17.9697L3.46962 16.4698Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M20.5304 16.4698C20.2375 16.1769 19.7626 16.1769 19.4697 16.4698C19.1768 16.7627 19.1768 17.2376 19.4697 17.5305L20.9696 19.0303C21.2624 19.3232 21.7373 19.3232 22.0302 19.0303C22.3231 18.7374 22.3231 18.2626 22.0302 17.9697L20.5304 16.4698Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M16.478 19.8179C16.3774 19.4162 15.9696 19.1719 15.5678 19.2724C15.1661 19.373 14.9219 19.7808 15.0223 20.1825L15.5223 22.1823C15.6228 22.584 16.0306 22.8283 16.4324 22.7278C16.8339 22.6272 17.0776 22.2201 16.9772 21.8184L16.478 19.8179Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M7.52205 19.8179C7.62259 19.4162 8.03039 19.1719 8.43217 19.2724C8.83387 19.373 9.07813 19.7808 8.97769 20.1825L8.47774 22.1823C8.37717 22.584 7.96938 22.8283 7.56762 22.7278C7.16606 22.6272 6.92243 22.2201 7.02279 21.8184L7.52205 19.8179Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
