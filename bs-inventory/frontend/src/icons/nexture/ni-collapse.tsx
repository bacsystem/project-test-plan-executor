import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCollapse({
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
          d="M9.01562 21.6685C8.62483 18.1513 5.84839 15.3749 2.33128 14.9841"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M14.9841 2.33176C15.3749 5.84888 18.1513 8.62532 21.6685 9.01611"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M9.01562 2.33176C8.62483 5.84888 5.84839 8.62532 2.33127 9.01611"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M14.9841 21.6685C15.3749 18.1513 18.1513 15.3749 21.6685 14.9841"
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
          d="M9.0986 22.4136C8.7125 22.4565 8.36195 22.1985 8.2822 21.8266L8.27048 21.7514L8.23044 21.4565C7.77593 18.5266 5.47376 16.2238 2.54391 15.769L2.24802 15.73L2.17282 15.7173C1.80108 15.6374 1.54302 15.2869 1.58591 14.9009C1.62899 14.515 1.95769 14.2301 2.33786 14.2339L2.41403 14.2387L2.77438 14.2866C6.34913 14.8414 9.15835 17.6512 9.71286 21.2261L9.76071 21.5854L9.76559 21.6626C9.76902 22.0425 9.48433 22.3706 9.0986 22.4136Z"
          fill="currentColor"
        />
        <path
          d="M21.5857 9.7612L21.2263 9.71335C17.6515 9.15883 14.8417 6.34962 14.2868 2.77487L14.239 2.41452L14.2341 2.33835C14.2303 1.95818 14.5152 1.62948 14.9011 1.5864C15.2871 1.5435 15.6377 1.80157 15.7175 2.17331L15.7302 2.2485L15.7693 2.5444C16.2241 5.47425 18.5268 7.77641 21.4568 8.23093L21.7517 8.27097L21.8269 8.28268C22.1988 8.36243 22.4567 8.71298 22.4138 9.09909C22.3708 9.48482 22.0427 9.76951 21.6628 9.76608L21.5857 9.7612Z"
          fill="currentColor"
        />
        <path
          d="M2.41429 9.76121C2.00267 9.80695 1.632 9.51068 1.58616 9.0991C1.54044 8.68757 1.83682 8.31693 2.24827 8.27098C5.41675 7.91892 7.91868 5.417 8.27073 2.24852C8.31669 1.83706 8.68732 1.54068 9.09886 1.58641C9.51044 1.63224 9.8067 2.00292 9.76097 2.41453C9.33144 6.28028 6.28004 9.33168 2.41429 9.76121Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M14.9011 22.4136C14.4896 22.3676 14.1933 21.997 14.239 21.5854L14.2868 21.2261C14.8598 17.532 17.8407 14.6549 21.5857 14.2388L21.6628 14.2339C22.0427 14.2304 22.3707 14.5152 22.4138 14.9009C22.4595 15.3125 22.1633 15.6842 21.7517 15.73L21.4568 15.769C18.429 16.2387 16.0713 18.6819 15.7302 21.7514L15.7175 21.8266C15.6377 22.1985 15.2872 22.4565 14.9011 22.4136Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
