import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiLoader({
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
        <path d="M12 2V4" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M12 20V22" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M2 12L4 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path d="M20 12L22 12" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M7 3.33984L8 5.07189" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M16 18.9282L17 20.6603" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M3.33984 17L5.07189 16"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path d="M18.9282 8L20.6603 7" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M3.33984 7L5.07189 8"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path d="M18.9282 16L20.6603 17" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M7 20.6602L8 18.9281" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M16 5.07178L17 3.33973" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
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
          d="M11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4Z"
          fill="currentColor"
        />
        <path
          d="M11.25 22V20C11.25 19.5858 11.5858 19.25 12 19.25C12.4142 19.25 12.75 19.5858 12.75 20V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M4 12.75L2 12.75C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25L4 11.25C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75Z"
          fill="currentColor"
        />
        <path
          d="M22 12.75L20 12.75C19.5858 12.75 19.25 12.4142 19.25 12C19.25 11.5858 19.5858 11.25 20 11.25L22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75Z"
          fill="currentColor"
        />
        <path
          d="M7.35059 5.44676L6.35059 3.7147C6.14348 3.35599 6.26639 2.89729 6.6251 2.69019C6.98382 2.48308 7.44252 2.60599 7.64962 2.9647L8.64962 4.69676C8.85673 5.05547 8.73382 5.51417 8.3751 5.72127C8.01639 5.92838 7.55769 5.80547 7.35059 5.44676Z"
          fill="currentColor"
        />
        <path
          d="M16.3506 21.0354L15.3506 19.3033C15.1435 18.9446 15.2664 18.4859 15.6251 18.2788C15.9838 18.0717 16.4425 18.1946 16.6496 18.5533L17.6496 20.2854C17.8567 20.6441 17.7338 21.1028 17.3751 21.3099C17.0164 21.517 16.5577 21.3941 16.3506 21.0354Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M5.447 16.6494L3.71495 17.6494C3.35623 17.8565 2.89754 17.7336 2.69043 17.3749C2.48332 17.0162 2.60623 16.5575 2.96495 16.3504L4.697 15.3504C5.05572 15.1433 5.51441 15.2662 5.72152 15.6249C5.92863 15.9836 5.80572 16.4423 5.447 16.6494Z"
          fill="currentColor"
        />
        <path
          d="M21.0354 7.64941L19.3033 8.64941C18.9446 8.85652 18.4859 8.73361 18.2788 8.3749C18.0717 8.01618 18.1946 7.55748 18.5533 7.35038L20.2854 6.35038C20.6441 6.14327 21.1028 6.26618 21.3099 6.62489C21.517 6.98361 21.3941 7.44231 21.0354 7.64941Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M4.697 8.64941L2.96495 7.64941C2.60623 7.44231 2.48332 6.98361 2.69043 6.6249C2.89754 6.26618 3.35623 6.14327 3.71495 6.35038L5.447 7.35038C5.80572 7.55748 5.92863 8.01618 5.72152 8.37489C5.51441 8.73361 5.05572 8.85652 4.697 8.64941Z"
          fill="currentColor"
        />
        <path
          d="M20.2854 17.6494L18.5533 16.6494C18.1946 16.4423 18.0717 15.9836 18.2788 15.6249C18.4859 15.2662 18.9446 15.1433 19.3033 15.3504L21.0354 16.3504C21.3941 16.5575 21.517 17.0162 21.3099 17.3749C21.1028 17.7336 20.6441 17.8565 20.2854 17.6494Z"
          fill="currentColor"
        />
        <path
          d="M8.64941 19.3032L7.64941 21.0353C7.44231 21.394 6.98361 21.5169 6.6249 21.3098C6.26618 21.1027 6.14327 20.644 6.35038 20.2853L7.35038 18.5532C7.55748 18.1945 8.01618 18.0716 8.37489 18.2787C8.73361 18.4858 8.85652 18.9445 8.64941 19.3032Z"
          fill="currentColor"
        />
        <path
          d="M17.6494 3.71462L16.6494 5.44667C16.4423 5.80539 15.9836 5.9283 15.6249 5.72119C15.2662 5.51408 15.1433 5.05539 15.3504 4.69667L16.3504 2.96462C16.5575 2.6059 17.0162 2.483 17.3749 2.6901C17.7336 2.89721 17.8565 3.3559 17.6494 3.71462Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
