import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCloudSnow({
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
          d="M6 19C3.79086 19 2 17.2091 2 15C2 13.4378 2.89559 12.0847 4.20137 11.4262C4.6798 11.185 5.01488 10.6847 5.00182 10.1491C5.00061 10.0995 5 10.0498 5 10C5 6.68629 7.68629 4 11 4C13.9446 4 16.3938 6.12117 16.9029 8.91886C16.9114 8.96572 16.9524 9 17 9C19.7614 9 22 11.2386 22 14C22 16.419 20.2822 18.4367 18 18.9"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16.9172 9.00098L16.5775 9.07114C15.2222 9.35107 13.9785 10.0217 13 11.0002V11.0002"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M5 9.99996L5.06277 10.251C5.34411 11.3764 6.03481 12.3565 7 13V13"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9 17V17.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M15 17V17.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 18V18.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 21V21.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 15V15.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9 20V20.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M15 20V20.5"
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
          opacity={oneTone ? 0 : 0.4}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.4258 8.48633L17.5342 8.27539L16.9707 6.85645L16.1221 7.01758C14.4484 7.36333 12.9032 8.16055 11.6543 9.32129L11.54 9.43164C11.4565 9.51256 11.4092 9.62391 11.4092 9.74023C11.4092 10.1875 11.7525 10.5601 12.1982 10.5967L12.2568 10.6016C12.3919 10.6126 12.5248 10.5631 12.623 10.4697L12.6306 10.4626C12.6456 10.4483 12.6606 10.434 12.6758 10.4199C12.8854 10.2251 13.1056 10.0429 13.334 9.87305C13.4099 9.81657 13.4866 9.76066 13.5645 9.70703C13.7205 9.59955 13.8807 9.49812 14.0439 9.40234C14.1255 9.3545 14.2078 9.30755 14.291 9.2627C14.8742 8.94828 15.4978 8.7087 16.1465 8.5498L16.4258 8.48633Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.33496 10.4326L4.25195 10.167C4.25714 10.3797 4.11415 10.6303 3.86328 10.7568C3.56457 10.9075 3.28393 11.0889 3.02539 11.2969C3.47532 12.6528 4.33521 13.8387 5.48828 14.6875C5.6508 14.8012 5.86242 14.8169 6.04004 14.7285L6.10449 14.6963C6.35032 14.574 6.51573 14.3339 6.54199 14.0605L6.54395 14.0381C6.56826 13.783 6.44785 13.5379 6.24609 13.3799C6.22347 13.3622 6.20102 13.3442 6.17871 13.3262C5.27022 12.5901 4.62072 11.5756 4.33496 10.4326Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M8.25 17.5V17C8.25 16.5858 8.58579 16.25 9 16.25C9.41421 16.25 9.75 16.5858 9.75 17V17.5C9.75 17.9142 9.41421 18.25 9 18.25C8.58579 18.25 8.25 17.9142 8.25 17.5Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M14.25 17.5V17C14.25 16.5858 14.5858 16.25 15 16.25C15.4142 16.25 15.75 16.5858 15.75 17V17.5C15.75 17.9142 15.4142 18.25 15 18.25C14.5858 18.25 14.25 17.9142 14.25 17.5Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11.25 18.5V18C11.25 17.5858 11.5858 17.25 12 17.25C12.4142 17.25 12.75 17.5858 12.75 18V18.5C12.75 18.9142 12.4142 19.25 12 19.25C11.5858 19.25 11.25 18.9142 11.25 18.5Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11.25 21.5V21C11.25 20.5858 11.5858 20.25 12 20.25C12.4142 20.25 12.75 20.5858 12.75 21V21.5C12.75 21.9142 12.4142 22.25 12 22.25C11.5858 22.25 11.25 21.9142 11.25 21.5Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11.25 15.5V15C11.25 14.5858 11.5858 14.25 12 14.25C12.4142 14.25 12.75 14.5858 12.75 15V15.5C12.75 15.9142 12.4142 16.25 12 16.25C11.5858 16.25 11.25 15.9142 11.25 15.5Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M8.25 20.5V20C8.25 19.5858 8.58579 19.25 9 19.25C9.41421 19.25 9.75 19.5858 9.75 20V20.5C9.75 20.9142 9.41421 21.25 9 21.25C8.58579 21.25 8.25 20.9142 8.25 20.5Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M14.25 20.5V20C14.25 19.5858 14.5858 19.25 15 19.25C15.4142 19.25 15.75 19.5858 15.75 20V20.5C15.75 20.9142 15.4142 21.25 15 21.25C14.5858 21.25 14.25 20.9142 14.25 20.5Z"
          fill="currentColor"
        />
        <path
          d="M11 3.25C13.5927 3.25 15.8403 4.7125 16.9707 6.85645L16.1221 7.01758C14.4484 7.36333 12.9032 8.16055 11.6543 9.32129L11.54 9.43164C11.4565 9.51256 11.4092 9.62391 11.4092 9.74023C11.4092 10.1875 11.7525 10.5601 12.1982 10.5967L12.2568 10.6016C12.3919 10.6126 12.5248 10.5631 12.623 10.4697C12.6406 10.4531 12.6581 10.4364 12.6758 10.4199C12.8854 10.2251 13.1056 10.0429 13.334 9.87305C13.4099 9.81657 13.4866 9.76066 13.5645 9.70703C13.7205 9.59955 13.8807 9.49812 14.0439 9.40234C14.1255 9.3545 14.2078 9.30755 14.291 9.2627C14.8742 8.94828 15.4978 8.7087 16.1465 8.5498L16.4258 8.48633L17.5352 8.27539C20.4599 8.54535 22.75 11.0048 22.75 14C22.75 16.9346 20.5516 19.3534 17.7119 19.7038C17.4313 19.7384 17.1963 19.5098 17.1963 19.2271V16.2553C17.1963 15.5408 16.815 14.8801 16.1963 14.5229L13 12.6771C12.3813 12.32 11.6187 12.32 11 12.6771L7.80371 14.5229C7.18492 14.8801 6.80371 15.5407 6.80371 16.2553V19.25C6.80371 19.5261 6.57985 19.75 6.30371 19.75H6C3.37665 19.75 1.25 17.6234 1.25 15C1.25 13.5017 1.94338 12.1659 3.02539 11.2959C3.47524 12.6522 4.33496 13.8385 5.48828 14.6875C5.6508 14.8012 5.86242 14.8169 6.04004 14.7285L6.10449 14.6963C6.35032 14.574 6.51573 14.3339 6.54199 14.0605L6.54395 14.0381C6.56826 13.783 6.44785 13.5379 6.24609 13.3799C6.22347 13.3622 6.20102 13.3442 6.17871 13.3262C5.27022 12.5901 4.62072 11.5756 4.33496 10.4326L4.27246 10.1816L4.2627 9.59961C4.4699 6.0581 7.40652 3.25 11 3.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
