import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiListCross({
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
          d="M3.00002 3.49999L6.00012 6.50024M6.00016 3.50017L2.99998 6.50019"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M2.99997 10.5L6.00009 13.5002M6.00017 10.5002L2.99997 13.5004"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M2.99991 17.5001L6.00009 20.5002M6.00017 17.5002L3.00012 20.5002"
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
          d="M2.46914 5.97001L3.43934 4.9998L2.46984 4.03029C2.17695 3.73739 2.17694 3.26252 2.46984 2.96963C2.76274 2.67688 3.23765 2.67678 3.53049 2.96963L4.5 3.93914L5.46951 2.96963C5.7623 2.67685 6.23725 2.67706 6.53016 2.96963C6.82304 3.26252 6.82305 3.7374 6.53016 4.03029L5.56066 4.9998L6.53086 5.97001L6.58195 6.02663C6.82233 6.32114 6.8053 6.75601 6.53086 7.03067C6.25622 7.3053 5.8214 7.32216 5.52682 7.08177L5.4702 7.03067L4.5 6.06047L3.5298 7.03067C3.23688 7.3233 2.76194 7.32348 2.46914 7.03067C2.17658 6.73784 2.1766 6.26284 2.46914 5.97001Z"
          fill="currentColor"
        />
        <path
          d="M2.46914 12.97L3.43934 11.9998L2.46984 11.0303C2.17695 10.7374 2.17694 10.2625 2.46984 9.96963C2.76275 9.67691 3.23766 9.67679 3.53049 9.96963L4.5 10.9391L5.46951 9.96963C5.76229 9.67685 6.23725 9.67708 6.53016 9.96963C6.82305 10.2625 6.82305 10.7374 6.53016 11.0303L5.56066 11.9998L6.53086 12.97L6.58195 13.0266C6.82232 13.3211 6.80528 13.756 6.53086 14.0307C6.25622 14.3053 5.8214 14.3222 5.52682 14.0818L5.4702 14.0307L4.5 13.0605L3.5298 14.0307C3.2369 14.3234 2.76198 14.3235 2.46914 14.0307C2.17664 13.7378 2.17653 13.2628 2.46914 12.97Z"
          fill="currentColor"
        />
        <path
          d="M2.46914 19.97L3.43934 18.9998L2.46984 18.0303C2.17694 17.7374 2.17694 17.2625 2.46984 16.9696C2.76275 16.677 3.23768 16.6768 3.53049 16.9696L4.5 17.9391L5.46951 16.9696C5.76229 16.6769 6.23725 16.6771 6.53016 16.9696C6.82305 17.2625 6.82305 17.7374 6.53016 18.0303L5.56066 18.9998L6.53086 19.97L6.58195 20.0266C6.82232 20.3211 6.80528 20.756 6.53086 21.0307C6.25623 21.3053 5.82141 21.3222 5.52682 21.0818L5.4702 21.0307L4.5 20.0605L3.5298 21.0307C3.23688 21.3233 2.76193 21.3235 2.46914 21.0307C2.17669 20.7379 2.17667 20.2628 2.46914 19.97Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
