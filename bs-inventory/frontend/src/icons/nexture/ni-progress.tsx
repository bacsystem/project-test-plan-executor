import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiProgress({
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
          d="M8 2.83203C6.84484 3.33674 5.80347 4.05337 4.92502 4.93279C3.11768 6.74212 2 9.24051 2 11.9999C2 13.4222 2.2969 14.775 2.8321 16"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M11.9998 2C14.7592 2 17.2576 3.11768 19.0669 4.92503C20.8789 6.73498 21.9998 9.23659 21.9998 12C21.9998 14.7654 20.8773 17.2686 19.0631 19.0789C17.254 20.8839 14.7572 22 11.9998 22C9.24134 22 6.74375 20.8831 4.93457 19.0769"
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
          d="M1.25 11.9999C1.25 9.03371 2.45245 6.34645 4.39453 4.40223C5.33828 3.45751 6.45804 2.68714 7.7002 2.14442C8.07965 1.97894 8.52173 2.15271 8.6875 2.53211C8.85298 2.91157 8.67921 3.35365 8.2998 3.51942C7.23203 3.98602 6.26898 4.649 5.45605 5.46278C3.78344 7.13723 2.75 9.4472 2.75 11.9999C2.75001 13.1522 2.9608 14.2537 3.34473 15.2694L3.51953 15.6991L3.54688 15.7714C3.66302 16.1332 3.48845 16.5318 3.13281 16.6874C2.75325 16.8532 2.31037 16.6793 2.14453 16.2997C1.56888 14.982 1.25001 13.5272 1.25 11.9999Z"
          fill="currentColor"
        />
        <path
          d="M21.2502 12C21.2502 9.4438 20.214 7.13106 18.5373 5.45605C16.9675 3.888 14.839 2.88136 12.4758 2.76172L12.0002 2.75L11.923 2.74609C11.545 2.70757 11.2502 2.38824 11.2502 2C11.2502 1.58579 11.586 1.25 12.0002 1.25L12.5529 1.26367C15.2992 1.40291 17.7742 2.57391 19.5969 4.39453C21.5439 6.33941 22.7502 9.02954 22.7502 12C22.7502 14.9725 21.5423 17.6642 19.593 19.6094C17.6491 21.549 14.9642 22.7499 12.0002 22.75C9.03507 22.75 6.34854 21.5483 4.40448 19.6074C4.11173 19.3148 4.11113 18.8399 4.40351 18.5469C4.69616 18.2537 5.1719 18.2532 5.46503 18.5459C7.13933 20.2174 9.44845 21.25 12.0002 21.25C14.551 21.2499 16.8593 20.2183 18.5334 18.5479C20.2124 16.8725 21.2502 14.5582 21.2502 12Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
