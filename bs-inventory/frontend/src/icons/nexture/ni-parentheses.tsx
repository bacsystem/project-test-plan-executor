import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiParentheses({
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
          d="M8.5 2.5546C8.38241 2.61557 8.26651 2.68112 8.15255 2.75125C1.26165 6.99181 1.26165 17.0083 8.15255 21.2488C8.27743 21.3257 8.40465 21.397 8.53386 21.4629"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.4844 2.5546C15.602 2.61557 15.7179 2.68112 15.8318 2.75125C22.7227 6.99181 22.7227 17.0083 15.8318 21.2488C15.7069 21.3257 15.5797 21.397 15.4505 21.4629"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M8.5 12L7.5 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12.5 12L11.5 12"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16.5 12L15.5 12"
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
          d="M7.75997 21.8877C0.393162 17.3543 0.393161 6.64576 7.75997 2.11233C7.82451 2.07262 7.88965 2.03424 7.95528 1.9971L8.1545 1.8887L8.22481 1.85647C8.57812 1.71661 8.98743 1.86448 9.16622 2.20901C9.34501 2.55384 9.22959 2.97355 8.91134 3.18167L8.84591 3.22073L8.5461 3.38968C2.1311 7.33738 2.1311 16.6627 8.5461 20.6104C8.65366 20.6766 8.76303 20.7383 8.87423 20.7949C9.24328 20.983 9.39043 21.4347 9.20235 21.8037C9.01421 22.1726 8.56255 22.3189 8.19356 22.1309L7.97481 22.0137C7.9026 21.9732 7.83088 21.9314 7.75997 21.8877Z"
          fill="currentColor"
        />
        <path
          d="M16.2244 21.8877C23.5912 17.3543 23.5912 6.64576 16.2244 2.11233C16.1599 2.07262 16.0947 2.03424 16.0291 1.9971L15.8299 1.8887L15.7596 1.85647C15.4063 1.71661 14.9969 1.86448 14.8182 2.20901C14.6394 2.55384 14.7548 2.97355 15.073 3.18167L15.1385 3.22073L15.4383 3.38968C21.8533 7.33738 21.8533 16.6627 15.4383 20.6104C15.3307 20.6766 15.2213 20.7383 15.1101 20.7949C14.7411 20.983 14.5939 21.4347 14.782 21.8037C14.9702 22.1726 15.4218 22.3189 15.7908 22.1309L16.0096 22.0137C16.0818 21.9732 16.1535 21.9314 16.2244 21.8877Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M7.5 12.75L7.42285 12.7461C7.04488 12.7075 6.75 12.3882 6.75 12C6.75 11.6118 7.04488 11.2925 7.42285 11.2539L7.5 11.25L8.5 11.25C8.91421 11.25 9.25 11.5858 9.25 12C9.25 12.4142 8.91421 12.75 8.5 12.75L7.5 12.75Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11.5 12.75L11.4229 12.7461C11.0449 12.7075 10.75 12.3882 10.75 12C10.75 11.6118 11.0449 11.2925 11.4229 11.2539L11.5 11.25L12.5 11.25C12.9142 11.25 13.25 11.5858 13.25 12C13.25 12.4142 12.9142 12.75 12.5 12.75L11.5 12.75Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M15.5 12.75L15.4229 12.7461C15.0449 12.7075 14.75 12.3882 14.75 12C14.75 11.6118 15.0449 11.2925 15.4229 11.2539L15.5 11.25L16.5 11.25C16.9142 11.25 17.25 11.5858 17.25 12C17.25 12.4142 16.9142 12.75 16.5 12.75L15.5 12.75Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
