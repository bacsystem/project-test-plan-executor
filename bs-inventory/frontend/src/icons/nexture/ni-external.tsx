import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiExternal({
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
          d="M11.9997 2.1665C11.0035 2.1665 10.0073 2.2216 9.01564 2.33178C5.49853 2.72257 2.72208 5.49901 2.33129 9.01613C2.11092 10.9994 2.11092 13.001 2.33129 14.9843C2.72208 18.5014 5.49852 21.2779 9.01564 21.6686C10.9989 21.889 13.0005 21.889 14.9838 21.6686C18.5009 21.2779 21.2774 18.5014 21.6682 14.9843C21.7783 13.9927 21.8334 12.9965 21.8334 12.0002"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M21 6.99996L21 4.00001C21 3.44773 20.5523 3.00002 20.0001 3.00001L17 2.99997M15.0001 9.00006L20.5 3.50002"
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
          d="M21.0004 7.74964C21.3884 7.74952 21.7075 7.45497 21.7461 7.07706L21.7503 6.99972L21.7503 4.00004C21.7503 3.03365 20.9668 2.2504 20.0005 2.25022L17.0001 2.24953C16.5861 2.24955 16.2504 2.58548 16.2502 2.99945C16.2502 3.41366 16.5859 3.74935 17.0001 3.74937L19.1898 3.75006L14.47 8.46986C14.1771 8.76276 14.1771 9.23763 14.47 9.53052C14.7629 9.82327 15.2378 9.82337 15.5306 9.53052L20.2504 4.81072L20.2504 6.99972L20.2539 7.07637C20.2922 7.45469 20.6119 7.74964 21.0004 7.74964Z"
          fill="currentColor"
        />
        <path
          d="M12 2.40344V8.20032C12 10.2989 13.7012 12 15.7998 12.0001H21.5957C21.6052 12.9339 21.5567 13.7757 21.4462 14.7697C21.0555 18.2831 18.2821 21.0568 14.7685 21.4474C12.9288 21.6518 11.0711 21.6518 9.2314 21.4474C5.71789 21.0568 2.94348 18.2831 2.55269 14.7697C2.3483 12.93 2.34834 11.0722 2.55269 9.23254C2.94319 5.71874 5.71764 2.94446 9.2314 2.55383C10.2251 2.44343 11.0664 2.39418 12 2.40344Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
