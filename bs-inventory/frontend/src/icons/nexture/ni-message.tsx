import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiMessage({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M16.1899 2.46542C19.0216 2.78005 21.2817 4.97064 21.6846 7.7911C21.8939 9.25619 21.8939 10.7436 21.6846 12.2087C21.2817 15.0292 19.0216 17.2197 16.1899 17.5344L15.3667 17.6258C13.7801 17.8021 12.1831 17.8534 10.5904 17.7797C10.2263 17.7628 9.8785 17.9374 9.6821 18.2444L7.84289 21.1197C7.30446 21.9615 6.00049 21.5801 6.00049 20.5808V17.7058C6.00049 17.3083 5.76109 16.9548 5.41544 16.7583C3.77283 15.8249 2.5957 14.1689 2.31567 12.2087C2.10637 10.7436 2.10637 9.25619 2.31567 7.7911C2.71859 4.97064 4.9787 2.78005 7.81037 2.46542L8.63356 2.37396C10.871 2.12535 13.1292 2.12535 15.3667 2.37396L16.1899 2.46542Z"
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
          d="M8.55021 1.62853C10.8427 1.37383 13.1571 1.37382 15.4496 1.62853L16.2729 1.71936C19.4441 2.07187 21.9756 4.52556 22.4272 7.6842C22.6465 9.21945 22.6464 10.7788 22.4272 12.3141C21.9759 15.473 19.4443 17.9263 16.2729 18.2789L15.4496 18.3707C13.8242 18.5513 12.1877 18.6044 10.5561 18.5289C10.4519 18.5241 10.3615 18.5739 10.3139 18.6481L8.47502 21.5231C7.5328 22.9961 5.25059 22.3292 5.25041 20.5807V17.7057C5.25031 17.6202 5.19455 17.4951 5.04435 17.4098C3.20553 16.3647 1.88636 14.5099 1.57267 12.3141C1.35341 10.7788 1.35335 9.21946 1.57267 7.6842C2.02422 4.52545 4.55655 2.07173 7.72795 1.71936L8.55021 1.62853Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
