import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiGpu({
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
          d="M3.49977 21L3.49998 4.33335C3.49999 3.59697 2.90304 3.00001 2.16666 3L2 3"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 19V20.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9 19V20.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M15 20.5V19"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M18 19V20.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.28152 18.4727C6.03796 18.1922 4.2452 16.4712 3.87349 14.2409V14.2409C3.6262 12.7572 3.6262 11.2428 3.87349 9.75909V9.75909C4.2452 7.52884 6.03796 5.80776 8.28152 5.52731L9.36999 5.39125C11.449 5.13137 13.5519 5.12375 15.6328 5.36856L17.2045 5.55347C19.453 5.818 21.2561 7.53651 21.6283 9.76968V9.76968C21.8744 11.2464 21.8744 12.7536 21.6283 14.2303V14.2303C21.2561 16.4635 19.453 18.182 17.2045 18.4465L15.6328 18.6314C13.5519 18.8762 11.449 18.8686 9.36999 18.6087L8.28152 18.4727Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M11 10.5L9 10.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M11 13.5L9 13.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16 14C17.1046 14 18 13.1046 18 12C18 10.8954 17.1046 10 16 10C14.8954 10 14 10.8954 14 12C14 13.1046 14.8954 14 16 14Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.16699 2.25C3.31732 2.25019 4.24982 3.18268 4.25 4.33301V7.04883C5.18252 5.82402 6.58547 4.98273 8.18848 4.78223L9.27734 4.64648C11.416 4.3792 13.5802 4.37125 15.7207 4.62305L17.292 4.80762C19.8717 5.11131 21.9411 7.08329 22.3682 9.64551C22.6278 11.2036 22.6278 12.7945 22.3682 14.3525C22.024 16.4167 20.6134 18.0969 18.7295 18.8311C18.742 18.8855 18.75 18.9418 18.75 19V20.5C18.75 20.9142 18.4142 21.25 18 21.25C17.5859 21.2499 17.25 20.9141 17.25 20.5V19.1953L15.75 19.3711V20.5C15.75 20.9142 15.4142 21.25 15 21.25C14.5859 21.2499 14.25 20.9141 14.25 20.5V19.5039C13.7504 19.5349 13.2503 19.5508 12.75 19.5537V20.5C12.75 20.9142 12.4142 21.25 12 21.25C11.5858 21.25 11.25 20.9142 11.25 20.5V19.5205C10.7492 19.4953 10.2491 19.4557 9.75 19.4023V20.5C9.75 20.9142 9.41421 21.25 9 21.25C8.5859 21.2499 8.25 20.9141 8.25 20.5V19.2227L8.18848 19.2158C6.58518 19.0153 5.18252 18.1724 4.25 16.9473V21C4.24999 21.4141 3.9141 21.7499 3.5 21.75C3.0859 21.7499 2.74999 21.4141 2.75 21V4.33301C2.74982 4.01111 2.48889 3.75019 2.16699 3.75H2C1.5859 3.74986 1.25 3.41413 1.25 3C1.25 2.58587 1.5859 2.25013 2 2.25H2.16699ZM16 9.25C14.4812 9.25 13.25 10.4812 13.25 12C13.25 13.5188 14.4812 14.75 16 14.75C17.5188 14.75 18.75 13.5188 18.75 12C18.75 10.4812 17.5188 9.25 16 9.25ZM9 12.75C8.58579 12.75 8.25 13.0858 8.25 13.5C8.25 13.9142 8.58579 14.25 9 14.25H11C11.4142 14.25 11.75 13.9142 11.75 13.5C11.75 13.0858 11.4142 12.75 11 12.75H9ZM9 9.75C8.58579 9.75 8.25 10.0858 8.25 10.5C8.25 10.9142 8.58579 11.25 9 11.25H11C11.4142 11.25 11.75 10.9142 11.75 10.5C11.75 10.0858 11.4142 9.75 11 9.75H9Z"
          fill="currentColor"
        />
        <g opacity={oneTone ? 0 : 0.4}>
          <path
            d="M16 9.25C17.5188 9.25 18.75 10.4812 18.75 12C18.75 13.5188 17.5188 14.75 16 14.75C14.4812 14.75 13.25 13.5188 13.25 12C13.25 10.4812 14.4812 9.25 16 9.25Z"
            fill="currentColor"
          />
          <path
            d="M11 12.75C11.4142 12.75 11.75 13.0858 11.75 13.5C11.75 13.9142 11.4142 14.25 11 14.25H9C8.58579 14.25 8.25 13.9142 8.25 13.5C8.25 13.0858 8.58579 12.75 9 12.75H11Z"
            fill="currentColor"
          />
          <path
            d="M11 9.75C11.4142 9.75 11.75 10.0858 11.75 10.5C11.75 10.9142 11.4142 11.25 11 11.25H9C8.58579 11.25 8.25 10.9142 8.25 10.5C8.25 10.0858 8.58579 9.75 9 9.75H11Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
}
