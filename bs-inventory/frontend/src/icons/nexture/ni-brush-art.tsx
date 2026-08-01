import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiBrushArt({
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
          d="M10.6278 17.7319L13.3679 15.7225C14.7994 14.6728 16.0977 13.4525 17.2342 12.0888C18.4472 10.6331 19.5056 9.05523 20.3922 7.38058L21.5388 5.21464C21.956 4.42666 21.8105 3.45875 21.18 2.8283C20.5496 2.19785 19.5816 2.05231 18.7937 2.46947L16.6277 3.61614C14.9531 4.50272 13.3752 5.56108 11.9195 6.77414C10.5558 7.91059 9.33554 9.20891 8.28576 10.6404L6.27637 13.3805"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M3.58999 14.7614C7.24394 11.1075 12.9008 16.7643 9.24691 20.4182C7.70618 21.959 5.10267 22.0788 3.52128 21.9842C2.70408 21.9354 2.07289 21.3042 2.02403 20.487C1.92947 18.9056 2.04926 16.3022 3.58999 14.7614Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
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
          d="M6.58486 12.8415C7.77538 12.9303 8.87372 13.5035 9.68935 14.3191C10.5047 15.1345 11.0769 16.2324 11.1659 17.4226C11.2562 18.6335 10.8402 19.8848 9.77724 20.948C8.86508 21.8601 7.67058 22.3223 6.54775 22.5496C5.42067 22.7776 4.30413 22.7816 3.47646 22.7322C2.28044 22.6607 1.34702 21.7279 1.27529 20.532C1.22582 19.7043 1.23078 18.5867 1.45888 17.4597C1.68619 16.3371 2.14759 15.1432 3.05947 14.2312C4.12274 13.1681 5.37391 12.7513 6.58486 12.8415Z"
          fill="currentColor"
        />
        <path
          d="M18.4434 1.80653C19.5222 1.2356 20.8478 1.43459 21.7109 2.29775C22.5739 3.16096 22.7731 4.48653 22.2021 5.56532L21.0557 7.73134C20.1448 9.4518 19.0568 11.0737 17.8105 12.5692C16.6353 13.9794 15.2919 15.2414 13.8115 16.327L12.6484 17.1796L12.6318 17.0126C12.4585 15.6351 11.8125 14.4011 10.9404 13.4559L10.75 13.2577C9.74654 12.2544 8.37321 11.5077 6.8291 11.3573L7.68164 10.1972C8.76727 8.71679 10.0292 7.37342 11.4395 6.19814C12.935 4.95191 14.5569 3.86386 16.2773 2.95302L18.4434 1.80653Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
