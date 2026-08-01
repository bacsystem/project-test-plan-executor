import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSnow({
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
        <path d="M12 2L12 22" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9.5 3.5L12 5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9.5 20.5L12 19"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M14.5 3.5L12 5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M14.5 20.5L12 19"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path d="M3.33984 7L20.6604 17" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M3.38867 9.91506L5.93771 8.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M18.1113 18.4151L18.0623 15.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M5.88867 5.58494L5.93771 8.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20.6113 14.0849L18.0623 15.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path d="M3.33985 17L20.6604 7" stroke="currentColor" strokeWidth={iconStrokeWidth} strokeLinecap="round" />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M5.88867 18.4151L5.93771 15.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20.6113 9.91506L18.0623 8.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M3.38867 14.0849L5.93771 15.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M18.1113 5.58494L18.0623 8.5"
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
          d="M12.75 22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22L11.25 2C11.25 1.58579 11.5858 1.25 12 1.25C12.4142 1.25 12.75 1.58579 12.75 2L12.75 22Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M12.386 4.35623C12.741 4.56928 12.8566 5.03038 12.6438 5.38552C12.4307 5.74061 11.9696 5.85621 11.6145 5.64334L9.11447 4.14334C8.75939 3.93028 8.64379 3.46919 8.85666 3.11404C9.06972 2.75895 9.53081 2.64335 9.88596 2.85623L12.386 4.35623Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M12.386 19.6438C12.741 19.4307 12.8566 18.9696 12.6438 18.6145C12.4307 18.2594 11.9696 18.1438 11.6145 18.3567L9.11447 19.8567C8.75939 20.0697 8.64379 20.5308 8.85666 20.886C9.06972 21.241 9.53081 21.3566 9.88596 21.1438L12.386 19.6438Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11.614 4.35623C11.259 4.56928 11.1434 5.03038 11.3562 5.38552C11.5693 5.74061 12.0304 5.85621 12.3855 5.64334L14.8855 4.14334C15.2406 3.93028 15.3562 3.46919 15.1433 3.11404C14.9303 2.75895 14.4692 2.64335 14.114 2.85623L11.614 4.35623Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11.614 19.6438C11.259 19.4307 11.1434 18.9696 11.3562 18.6145C11.5693 18.2594 12.0304 18.1438 12.3855 18.3567L14.8855 19.8567C15.2406 20.0697 15.3562 20.5308 15.1433 20.886C14.9303 21.241 14.4692 21.3566 14.114 21.1438L11.614 19.6438Z"
          fill="currentColor"
        />
        <path
          d="M21.0355 16.3506C21.3942 16.5577 21.5171 17.0164 21.31 17.3751C21.1029 17.7338 20.6442 17.8567 20.2855 17.6496L2.96495 7.64962C2.60623 7.44252 2.48332 6.98382 2.69043 6.62511C2.89754 6.26639 3.35623 6.14348 3.71495 6.35059L21.0355 16.3506Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M5.57345 7.84415C5.93551 7.64316 6.39263 7.77359 6.59375 8.13552C6.79474 8.49758 6.66431 8.9547 6.30238 9.15583L3.75334 10.5709C3.39128 10.7719 2.93416 10.6414 2.73304 10.2795C2.53205 9.91746 2.66248 9.46034 3.02441 9.25921L5.57345 7.84415Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M18.8125 15.4879C18.8055 15.0739 18.464 14.7432 18.05 14.75C17.636 14.757 17.3053 15.0985 17.3121 15.5125L17.3611 18.4276C17.3681 18.8416 17.7096 19.1723 18.1236 19.1655C18.5377 19.1585 18.8683 18.817 18.8615 18.403L18.8125 15.4879Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M5.18749 8.51208C5.19446 8.92612 5.53598 9.25678 5.94998 9.25C6.36403 9.24304 6.69469 8.90151 6.6879 8.48751L6.63886 5.57245C6.6319 5.1584 6.29038 4.82774 5.87637 4.83453C5.46233 4.84149 5.13167 5.18301 5.13845 5.59702L5.18749 8.51208Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M18.4265 16.1559C18.0645 16.3568 17.6074 16.2264 17.4062 15.8645C17.2053 15.5024 17.3357 15.0453 17.6976 14.8442L20.2467 13.4291C20.6087 13.2281 21.0658 13.3586 21.267 13.7205C21.468 14.0825 21.3375 14.5397 20.9756 14.7408L18.4265 16.1559Z"
          fill="currentColor"
        />
        <path
          d="M20.2855 6.35059C20.6442 6.14348 21.1029 6.26639 21.31 6.6251C21.5171 6.98382 21.3942 7.44252 21.0355 7.64962L3.71495 17.6496C3.35623 17.8567 2.89754 17.7338 2.69043 17.3751C2.48333 17.0164 2.60623 16.5577 2.96495 16.3506L20.2855 6.35059Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M5.18749 15.4879C5.19446 15.0739 5.53598 14.7432 5.94998 14.75C6.36403 14.757 6.69469 15.0985 6.6879 15.5125L6.63886 18.4276C6.6319 18.8416 6.29038 19.1723 5.87637 19.1655C5.46233 19.1585 5.13167 18.817 5.13845 18.403L5.18749 15.4879Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M18.4265 7.84415C18.0645 7.64316 17.6074 7.77359 17.4062 8.13552C17.2053 8.49758 17.3357 8.9547 17.6976 9.15583L20.2467 10.5709C20.6087 10.7719 21.0658 10.6414 21.267 10.2795C21.468 9.91746 21.3375 9.46034 20.9756 9.25921L18.4265 7.84415Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M5.57345 16.1559C5.93551 16.3568 6.39263 16.2264 6.59375 15.8645C6.79474 15.5024 6.66431 15.0453 6.30238 14.8442L3.75334 13.4291C3.39128 13.2281 2.93416 13.3586 2.73304 13.7205C2.53205 14.0825 2.66248 14.5397 3.02441 14.7408L5.57345 16.1559Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M18.8125 8.51208C18.8055 8.92612 18.464 9.25679 18.05 9.25C17.636 9.24304 17.3053 8.90151 17.3121 8.48751L17.3611 5.57245C17.3681 5.1584 17.7096 4.82774 18.1236 4.83453C18.5377 4.84149 18.8683 5.18301 18.8615 5.59702L18.8125 8.51208Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
