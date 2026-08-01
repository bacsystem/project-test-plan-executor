import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSpinner({
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
        <path d="M12 2V6" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M12 18V22" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M2 12L6 12" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M18 12L22 12" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M4.92871 4.92896L7.75714 7.75738"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16.2427 16.2427L19.0711 19.0711"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M4.92871 19.071L7.75714 16.2426"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16.2427 7.75732L19.0711 4.9289"
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
        <path d="M12 2V6" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M12 18V22" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M2 12L6 12" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M18 12L22 12" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M4.92871 4.92896L7.75714 7.75738"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16.2427 16.2427L19.0711 19.0711"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M4.92871 19.071L7.75714 16.2426"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16.2427 7.75732L19.0711 4.9289"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />

        <svg
          width={iconSize}
          height={iconSize}
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.25 6V2C11.25 1.58579 11.5858 1.25 12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V6C12.75 6.41421 12.4142 6.75 12 6.75C11.5858 6.75 11.25 6.41421 11.25 6Z"
            fill="currentColor"
          />
          <path
            d="M11.25 22V18C11.25 17.5858 11.5858 17.25 12 17.25C12.4142 17.25 12.75 17.5858 12.75 18V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22Z"
            fill="currentColor"
          />
          <path
            d="M6 12.75L2 12.75C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25L6 11.25C6.41421 11.25 6.75 11.5858 6.75 12C6.75 12.4142 6.41421 12.75 6 12.75Z"
            fill="currentColor"
          />
          <path
            d="M22 12.75L18 12.75C17.5858 12.75 17.25 12.4142 17.25 12C17.25 11.5858 17.5858 11.25 18 11.25L22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75Z"
            fill="currentColor"
          />
          <path
            opacity={oneTone ? 1 : 0.4}
            d="M7.22692 8.28771L4.39849 5.45929C4.1056 5.16639 4.1056 4.69152 4.39849 4.39863C4.69139 4.10573 5.16626 4.10573 5.45915 4.39863L8.28758 7.22705C8.58047 7.51995 8.58047 7.99482 8.28758 8.28771C7.99469 8.58061 7.51981 8.58061 7.22692 8.28771Z"
            fill="currentColor"
          />
          <path
            opacity={oneTone ? 1 : 0.4}
            d="M18.5409 19.6014L15.7125 16.773C15.4196 16.4801 15.4196 16.0052 15.7125 15.7123C16.0054 15.4195 16.4802 15.4195 16.7731 15.7123L19.6015 18.5408C19.8944 18.8337 19.8944 19.3085 19.6015 19.6014C19.3087 19.8943 18.8338 19.8943 18.5409 19.6014Z"
            fill="currentColor"
          />
          <path
            opacity={oneTone ? 1 : 0.4}
            d="M8.28747 16.7728L5.45904 19.6013C5.16615 19.8942 4.69127 19.8942 4.39838 19.6013C4.10549 19.3084 4.10549 18.8335 4.39838 18.5406L7.22681 15.7122C7.5197 15.4193 7.99457 15.4193 8.28747 15.7122C8.58036 16.0051 8.58036 16.4799 8.28747 16.7728Z"
            fill="currentColor"
          />
          <path
            opacity={oneTone ? 1 : 0.4}
            d="M19.6014 5.45911L16.773 8.28754C16.4801 8.58043 16.0052 8.58043 15.7123 8.28754C15.4195 7.99465 15.4195 7.51977 15.7123 7.22688L18.5408 4.39845C18.8337 4.10556 19.3085 4.10556 19.6014 4.39845C19.8943 4.69135 19.8943 5.16622 19.6014 5.45911Z"
            fill="currentColor"
          />
        </svg>
      </svg>
    );
  }
}
