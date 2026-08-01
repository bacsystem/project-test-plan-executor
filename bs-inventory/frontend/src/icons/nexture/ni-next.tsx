import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiNext({
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
          d="M20.9994 14.7423C22.5792 13.2554 22.5792 10.7446 20.9994 9.25771L20.3176 8.61602C18.3613 6.77475 15.8553 5.6255 13.1835 5.34426L13.0892 5.33432C11.2796 5.14384 9.61502 6.34131 9.22029 8.11758V8.11758C8.65205 10.6747 8.65205 13.3253 9.22029 15.8824V15.8824C9.61502 17.6587 11.2796 18.8562 13.0892 18.6657L13.1835 18.6557C15.8553 18.3745 18.3613 17.2252 20.3176 15.384L20.9994 14.7423Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M10.1078 6.4362C8.87772 5.8602 7.55254 5.48833 6.18384 5.34426L6.0895 5.33433C4.2799 5.14384 2.61534 6.34132 2.22061 8.11759C1.65237 10.6747 1.65237 13.3253 2.22061 15.8824C2.61534 17.6587 4.2799 18.8562 6.0895 18.6657L6.18384 18.6557C7.55254 18.5117 8.87772 18.1398 10.1078 17.5638"
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
          d="M13.1678 4.58923C10.979 4.35885 8.9655 5.80699 8.48807 7.95544C7.89616 10.6194 7.89611 13.3813 8.48807 16.0453C8.96564 18.1935 10.9791 19.6418 13.1678 19.4115L13.2625 19.4017C16.0971 19.1033 18.7562 17.8835 20.8318 15.93L21.5135 15.2884C23.4077 13.5055 23.4076 10.4953 21.5135 8.71227L20.8318 8.07067C18.7561 6.11709 16.0972 4.89747 13.2625 4.59899L13.1678 4.58923Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M6.16797 4.58943C3.97937 4.35927 1.96569 5.80733 1.48828 7.95564C0.896383 10.6196 0.896311 13.3815 1.48828 16.0455C1.9658 18.1936 3.9795 19.6418 6.16797 19.4117L6.26172 19.4019C6.98053 19.3263 7.68809 19.1906 8.37793 18.9996C7.72681 18.2755 7.24903 17.381 7.02441 16.3707C6.38488 13.4924 6.38491 10.5077 7.02441 7.62947C7.24909 6.6191 7.72677 5.72468 8.37793 5.00056C7.6882 4.80959 6.9805 4.67486 6.26172 4.59919L6.16797 4.58943Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
