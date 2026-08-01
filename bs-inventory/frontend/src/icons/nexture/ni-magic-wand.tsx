import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiMagicWand({
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
          d="M4.76315 21.5552C4.39722 21.7992 3.92863 21.8284 3.53527 21.6317L3.44887 21.5885C2.99988 21.364 2.63582 20.9999 2.41133 20.551L2.36813 20.4645C2.17145 20.0712 2.20062 19.6026 2.44458 19.2367V19.2367C3.11771 18.227 3.98414 17.3605 4.99384 16.6874V16.6874C5.35977 16.4434 5.82836 16.4143 6.22173 16.611L6.30813 16.6542C6.75711 16.8786 7.12117 17.2427 7.34566 17.6917L7.38886 17.7781C7.58554 18.1715 7.55637 18.64 7.31242 19.006V19.006C6.63928 20.0157 5.77286 20.8821 4.76315 21.5552V21.5552Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16 7.99951L6.99951 17"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path d="M16 2V4" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M16 12V14" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M10 8L12 8" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path d="M20 8L22 8" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path
          d="M18.8286 5.17139L20.2428 3.75717"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M20.2427 12.2427L18.8285 10.8285"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M13.1714 5.17139L11.7572 3.75717"
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
          d="M4.57756 16.0641C5.16735 15.6709 5.92302 15.6232 6.55705 15.9401L6.64397 15.984C7.23769 16.281 7.71902 16.7624 8.01604 17.3561L8.05998 17.443C8.37692 18.0771 8.32916 18.8327 7.93596 19.4225C7.20793 20.5144 6.27109 21.4524 5.17912 22.1803C4.58932 22.5733 3.83357 22.6194 3.19963 22.3024L3.11369 22.2594C2.51961 21.9624 2.0377 21.4805 1.74065 20.8864L1.69768 20.8004C1.38076 20.1665 1.42676 19.4107 1.81975 18.821C2.54772 17.729 3.48565 16.7921 4.57756 16.0641Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M15.4692 7.46918C15.7621 7.17629 16.2378 7.17629 16.5307 7.46918C16.8233 7.76201 16.8233 8.2369 16.5307 8.52973L7.52973 17.5307L7.47309 17.5815C7.17859 17.8219 6.74387 17.8052 6.46918 17.5307C6.17629 17.2378 6.17629 16.7621 6.46918 16.4692L15.4692 7.46918Z"
          fill="currentColor"
        />
        <path
          d="M15.25 4V2C15.25 1.58579 15.5858 1.25 16 1.25C16.4142 1.25 16.75 1.58579 16.75 2V4C16.75 4.41421 16.4142 4.75 16 4.75C15.5858 4.75 15.25 4.41421 15.25 4Z"
          fill="currentColor"
        />
        <path
          d="M15.25 14V12C15.25 11.5858 15.5858 11.25 16 11.25C16.4142 11.25 16.75 11.5858 16.75 12V14C16.75 14.4142 16.4142 14.75 16 14.75C15.5858 14.75 15.25 14.4142 15.25 14Z"
          fill="currentColor"
        />
        <path
          d="M12 8.75L10 8.75C9.58579 8.75 9.25 8.41421 9.25 8C9.25 7.58579 9.58579 7.25 10 7.25L12 7.25C12.4142 7.25 12.75 7.58579 12.75 8C12.75 8.41421 12.4142 8.75 12 8.75Z"
          fill="currentColor"
        />
        <path
          d="M22 8.75L20 8.75C19.5858 8.75 19.25 8.41421 19.25 8C19.25 7.58579 19.5858 7.25 20 7.25L22 7.25C22.4142 7.25 22.75 7.58579 22.75 8C22.75 8.41421 22.4142 8.75 22 8.75Z"
          fill="currentColor"
        />
        <path
          d="M20.7732 4.28739L19.3589 5.7016C19.0661 5.9945 18.5912 5.9945 18.2983 5.7016C18.0054 5.40871 18.0054 4.93384 18.2983 4.64094L19.7125 3.22673C20.0054 2.93384 20.4803 2.93384 20.7732 3.22673C21.066 3.51962 21.066 3.9945 20.7732 4.28739Z"
          fill="currentColor"
        />
        <path
          d="M19.3587 10.2981L20.7729 11.7123C21.0658 12.0052 21.0658 12.4801 20.7729 12.773C20.48 13.0659 20.0051 13.0659 19.7122 12.773L18.298 11.3588C18.0051 11.0659 18.0051 10.591 18.298 10.2981C18.5909 10.0052 19.0658 10.0052 19.3587 10.2981Z"
          fill="currentColor"
        />
        <path
          d="M12.2874 3.22684L13.7016 4.64106C13.9945 4.93395 13.9945 5.40882 13.7016 5.70172C13.4087 5.99461 12.9338 5.99461 12.6409 5.70172L11.2267 4.2875C10.9338 3.99461 10.9338 3.51974 11.2267 3.22684C11.5196 2.93395 11.9945 2.93395 12.2874 3.22684Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
