import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiExpandFull({
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
          d="M5 18.9998L18.9999 5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M9.5 19.4999L5.50002 19.5C4.94773 19.5 4.5 19.0523 4.5 18.5L4.5 14.4999"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M14.5 4.50009L18.5 4.50002C19.0523 4.50001 19.5 4.94773 19.5 5.50002L19.5 9.50009"
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
          d="M18.4696 4.46966C18.7625 4.17679 19.2373 4.17677 19.5302 4.46966C19.823 4.76255 19.823 5.23732 19.5302 5.53021L5.53017 19.5302C5.2373 19.823 4.76249 19.823 4.46962 19.5302C4.17676 19.2373 4.17682 18.7626 4.46962 18.4697L18.4696 4.46966Z"
          fill="currentColor"
        />
        <path
          d="M10.2498 19.4999C10.2497 19.8882 9.95472 20.208 9.57652 20.2464L9.49987 20.2498L5.50029 20.2498C4.53378 20.2498 3.74979 19.4658 3.74979 18.4993L3.74979 14.4997C3.74983 14.0856 4.08559 13.7499 4.49971 13.7498C4.9139 13.7498 5.24959 14.0856 5.24963 14.4997L5.25032 18.5C5.25039 18.638 5.36226 18.75 5.50029 18.75L9.49987 18.75C9.91407 18.75 10.2498 19.0857 10.2498 19.4999Z"
          fill="currentColor"
        />
        <path
          d="M13.7502 4.50011C13.7503 4.1118 14.0453 3.79201 14.4235 3.75364L14.5001 3.75019L18.4997 3.75019C19.4662 3.75017 20.2502 4.53418 20.2502 5.50069L20.2502 9.50026C20.2502 9.9144 19.9144 10.2501 19.5003 10.2502C19.0861 10.2502 18.7504 9.91445 18.7504 9.50026L18.7497 5.5C18.7496 5.36199 18.6377 5.25003 18.4997 5.25003L14.5001 5.25003C14.0859 5.25003 13.7502 4.91432 13.7502 4.50011Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
