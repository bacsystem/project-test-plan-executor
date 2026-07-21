import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPhone({
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
          d="M4.46553 7.81025C4.78016 4.97857 6.97074 2.71847 9.79121 2.31554V2.31554C11.2563 2.10624 12.7437 2.10624 14.2088 2.31554V2.31554C17.0293 2.71846 19.2198 4.97857 19.5345 7.81025L19.6259 8.63344C19.8745 10.8709 19.8745 13.1291 19.6259 15.3666L19.5345 16.1898C19.2198 19.0214 17.0293 21.2815 14.2088 21.6845V21.6845C12.7437 21.8938 11.2563 21.8938 9.79121 21.6845V21.6845C6.97074 21.2815 4.78016 19.0214 4.46553 16.1898L4.37406 15.3666C4.12545 13.1291 4.12545 10.8709 4.37406 8.63343L4.46553 7.81025Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M10 6H14"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M11.5 19H12.5"
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.68517 1.57266C11.2204 1.35337 12.7799 1.3534 14.3151 1.57266C17.474 2.02406 19.9275 4.55641 20.2799 7.72793L20.3717 8.5502C20.6264 10.8426 20.6264 13.1572 20.3717 15.4496L20.2799 16.2729C19.9272 19.4441 17.4738 21.9758 14.3151 22.4272C12.7799 22.6464 11.2203 22.6464 9.68517 22.4272C6.52659 21.9756 4.07292 19.444 3.72032 16.2729L3.6295 15.4496C3.37479 13.1572 3.37481 10.8426 3.6295 8.5502L3.72032 7.72793C4.0727 4.55653 6.52641 2.0242 9.68517 1.57266ZM11.5006 18.2494C11.0865 18.2494 10.7508 18.5854 10.7506 18.9994C10.7506 19.4136 11.0864 19.7494 11.5006 19.7494H12.5006C12.9146 19.7492 13.2506 19.4135 13.2506 18.9994C13.2504 18.5855 12.9145 18.2496 12.5006 18.2494H11.5006ZM10.0006 5.24942C9.58651 5.24942 9.2508 5.58538 9.2506 5.99942C9.2506 6.41363 9.58638 6.74942 10.0006 6.74942H14.0006L14.0777 6.74551C14.4555 6.70669 14.7506 6.38744 14.7506 5.99942C14.7504 5.61154 14.4554 5.29209 14.0777 5.25332L14.0006 5.24942H10.0006Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M12.5 18.25C12.9142 18.25 13.25 18.5858 13.25 19C13.25 19.4142 12.9142 19.75 12.5 19.75H11.5C11.0858 19.75 10.75 19.4142 10.75 19C10.75 18.5858 11.0858 18.25 11.5 18.25H12.5Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M14.0771 5.25391C14.4551 5.29253 14.75 5.61183 14.75 6C14.75 6.38817 14.4551 6.70747 14.0771 6.74609L14 6.75H10C9.58579 6.75 9.25 6.41421 9.25 6C9.25 5.58579 9.58579 5.25 10 5.25H14L14.0771 5.25391Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
