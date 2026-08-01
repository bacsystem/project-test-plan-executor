import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCartMinus({
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
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M10 9.5H15"
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
          d="M9 17.25C10.5188 17.25 11.75 18.4812 11.75 20C11.75 21.5188 10.5188 22.75 9 22.75C7.48122 22.75 6.25 21.5188 6.25 20C6.25 18.4812 7.48122 17.25 9 17.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M16 17.25C17.5188 17.25 18.75 18.4812 18.75 20C18.75 21.5188 17.5188 22.75 16 22.75C14.4812 22.75 13.25 21.5188 13.25 20C13.25 18.4812 14.4812 17.25 16 17.25Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.08809 1.25526L2.16426 1.26893L3.17598 1.4955C4.07202 1.69656 4.75603 2.42355 4.90059 3.33046L5.0207 4.08729L7.18867 3.58339C11.0123 2.69356 14.9934 2.72597 18.802 3.67811L19.4201 3.83241C20.7938 4.17628 21.6827 5.50716 21.4729 6.90761L20.6252 12.557C20.3495 14.3922 18.772 15.7502 16.9162 15.7504H8.55977C6.71678 15.7503 5.1469 14.4102 4.85664 12.5902L3.41914 3.56679C3.37131 3.26662 3.14436 3.02605 2.84785 2.95936L1.83613 2.73182L1.76191 2.71132C1.4016 2.59104 1.18407 2.215 1.26875 1.83632C1.35369 1.45762 1.71087 1.2103 2.08809 1.25526ZM10.0002 8.7494C9.58609 8.7494 9.25038 9.08535 9.2502 9.4994C9.2502 9.91362 9.58598 10.2494 10.0002 10.2494H15.0002C15.4143 10.2493 15.7502 9.91353 15.7502 9.4994C15.75 9.08543 15.4142 8.74954 15.0002 8.7494H10.0002Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M15 8.75C15.4142 8.75 15.75 9.08579 15.75 9.5C15.75 9.91421 15.4142 10.25 15 10.25H10C9.58579 10.25 9.25001 9.91421 9.25 9.5C9.25 9.08579 9.58579 8.75 10 8.75H15Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
