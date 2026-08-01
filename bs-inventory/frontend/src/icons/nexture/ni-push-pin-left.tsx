import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPushPinLeft({
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
          d="M14.1484 2.37498C16.0309 3.01182 17.7687 4.01515 19.2615 5.32707C20.0333 6.00532 19.9138 7.24033 19.0263 7.75801L17.807 8.46921C17.5064 8.64458 17.2567 8.89537 17.0827 9.19679L16.3546 10.4579C16.1904 10.7422 16.146 11.08 16.2309 11.3971L16.7742 13.4248C17.2822 15.3204 15.528 17.0454 13.6412 16.5056C11.2506 15.8218 9.06514 14.56 7.27762 12.8316C5.86682 11.4675 6.48356 9.08582 8.37914 8.5779L10.4069 8.03458C10.7239 7.94962 10.9943 7.74217 11.1584 7.45787L11.8865 6.19679C12.0605 5.89537 12.1529 5.55375 12.1544 5.2057L12.1607 3.79417C12.1653 2.76674 13.1751 2.04574 14.1484 2.37498Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M10 15.4639L7 20.66"
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
          d="M11.411 3.79059C11.4181 2.25146 12.9315 1.17137 14.3895 1.66462C16.3656 2.33321 18.1897 3.38712 19.7567 4.76422C20.9126 5.78037 20.7335 7.63016 19.4042 8.40583L18.1854 9.11676C17.9976 9.22632 17.8411 9.38356 17.7323 9.57184L17.0048 10.8326C16.9401 10.9445 16.9225 11.0778 16.9559 11.2027L17.4989 13.231C18.1574 15.6894 15.8824 17.9266 13.4354 17.2271C10.9266 16.5094 8.63269 15.1845 6.75671 13.3707C4.92688 11.6013 5.72676 8.51189 8.18542 7.85309L10.2128 7.31012C10.3376 7.27658 10.445 7.1945 10.5096 7.08258L11.2372 5.82184C11.3458 5.63359 11.4041 5.42005 11.4051 5.2027L11.411 3.79059Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M7.64941 21.0351C7.44231 21.3938 6.98361 21.5167 6.62489 21.3096C6.26618 21.1025 6.14327 20.6438 6.35038 20.2851L9.35038 15.089C9.55748 14.7303 10.0162 14.6073 10.3749 14.8145C10.7336 15.0216 10.8565 15.4803 10.6494 15.839L7.64941 21.0351Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
