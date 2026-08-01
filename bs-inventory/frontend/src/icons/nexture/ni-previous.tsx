import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPrevious({
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
          d="M3.0006 14.7423C1.42077 13.2554 1.42077 10.7446 3.0006 9.25771L3.68239 8.61602C5.63874 6.77475 8.1447 5.6255 10.8165 5.34426L10.9108 5.33432C12.7204 5.14384 14.385 6.34131 14.7797 8.11758V8.11758C15.348 10.6747 15.348 13.3253 14.7797 15.8824V15.8824C14.385 17.6587 12.7204 18.8562 10.9108 18.6657L10.8165 18.6557C8.14469 18.3745 5.63874 17.2252 3.68239 15.384L3.0006 14.7423Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M13.8922 6.4362C15.1223 5.8602 16.4475 5.48833 17.8162 5.34426L17.9105 5.33433C19.7201 5.14384 21.3847 6.34132 21.7794 8.11759C22.3476 10.6747 22.3476 13.3253 21.7794 15.8824C21.3847 17.6587 19.7201 18.8562 17.9105 18.6657L17.8162 18.6557C16.4475 18.5117 15.1223 18.1398 13.8922 17.5638"
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
          d="M10.8322 4.58923C13.021 4.35885 15.0345 5.80699 15.5119 7.95544C16.1038 10.6194 16.1039 13.3813 15.5119 16.0453C15.0344 18.1935 13.0209 19.6418 10.8322 19.4115L10.7375 19.4017C7.90287 19.1033 5.24383 17.8835 3.16818 15.93L2.48654 15.2884C0.592329 13.5055 0.592427 10.4953 2.48654 8.71227L3.16818 8.07067C5.24386 6.11709 7.90277 4.89747 10.7375 4.59899L10.8322 4.58923Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M17.832 4.58943C20.0206 4.35927 22.0343 5.80733 22.5117 7.95564C23.1036 10.6196 23.1037 13.3815 22.5117 16.0455C22.0342 18.1936 20.0205 19.6418 17.832 19.4117L17.7383 19.4019C17.0195 19.3263 16.3119 19.1906 15.6221 18.9996C16.2732 18.2755 16.751 17.381 16.9756 16.3707C17.6151 13.4924 17.6151 10.5077 16.9756 7.62947C16.7509 6.6191 16.2732 5.72468 15.6221 5.00056C16.3118 4.80959 17.0195 4.67486 17.7383 4.59919L17.832 4.58943Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
