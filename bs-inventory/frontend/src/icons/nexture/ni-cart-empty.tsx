import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCartEmpty({
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
          d="M2 2L3.0119 2.22681C3.60846 2.36052 4.06314 2.84453 4.15934 3.44828V3.44828L5.5972 12.4721C5.82924 13.9283 7.08521 15 8.55982 15H16.9164C18.4014 15 19.663 13.9136 19.8832 12.445L20.7305 6.7964C20.8834 5.77755 20.2372 4.80931 19.2377 4.55943L18.6195 4.40487C14.9262 3.48155 11.0662 3.45006 7.35835 4.31302L4.40659 5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M7 20C7 18.8954 7.89543 18 9 18C10.1046 18 11 18.8954 11 20C11 21.1046 10.1046 22 9 22C7.89543 22 7 21.1046 7 20Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M14 20C14 18.8954 14.8954 18 16 18C17.1046 18 18 18.8954 18 20C18 21.1046 17.1046 22 16 22C14.8954 22 14 21.1046 14 20Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
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
          d="M2.08814 1.25526L2.16431 1.26893L3.17603 1.4955C4.07211 1.69654 4.75608 2.42353 4.90064 3.33046L5.02075 4.08729L7.18872 3.58339C11.0123 2.69356 14.9934 2.72597 18.802 3.67811L19.4202 3.83241C20.7939 4.17625 21.6827 5.50713 21.4729 6.90761L20.6252 12.557C20.3497 14.3923 18.7721 15.7502 16.9163 15.7504H8.55982C6.71675 15.7503 5.14685 14.4103 4.85669 12.5902L3.41919 3.56679C3.37136 3.2666 3.14445 3.02603 2.8479 2.95936L1.83618 2.73182L1.76196 2.71132C1.40158 2.59101 1.18397 2.21508 1.2688 1.83632C1.35374 1.45762 1.71092 1.2103 2.08814 1.25526Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M9 17.25C10.5188 17.25 11.75 18.4812 11.75 20C11.75 21.5188 10.5188 22.75 9 22.75C7.48122 22.75 6.25 21.5188 6.25 20C6.25 18.4812 7.48122 17.25 9 17.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M16 17.25C17.5188 17.25 18.75 18.4812 18.75 20C18.75 21.5188 17.5188 22.75 16 22.75C14.4812 22.75 13.25 21.5188 13.25 20C13.25 18.4812 14.4812 17.25 16 17.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
