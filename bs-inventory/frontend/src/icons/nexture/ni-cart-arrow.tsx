import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCartArrow({
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
          d="M10 9.49997L12.1468 11.6465C12.342 11.8417 12.6586 11.8417 12.8539 11.6464L15 9.49997M12.4997 7L12.4997 11"
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
          d="M2.08809 1.25526L2.16426 1.26893L3.17598 1.4955C4.07202 1.69656 4.75603 2.42355 4.90059 3.33046L5.0207 4.08729L7.18867 3.58339C11.0123 2.69356 14.9934 2.72597 18.802 3.67811L19.4201 3.83241C20.7938 4.17628 21.6827 5.50716 21.4729 6.90761L20.6252 12.557C20.3495 14.3922 18.772 15.7502 16.9162 15.7504H8.55977C6.71678 15.7503 5.1469 14.4102 4.85664 12.5902L3.41914 3.56679C3.37131 3.26662 3.14436 3.02605 2.84785 2.95936L1.83613 2.73182L1.76191 2.71132C1.4016 2.59104 1.18407 2.215 1.26875 1.83632C1.35369 1.45762 1.71087 1.2103 2.08809 1.25526ZM12.5002 6.2494C12.0861 6.2494 11.7504 6.58535 11.7502 6.9994V10.1889L10.5305 8.96913L10.4738 8.91737C10.1794 8.67714 9.74454 8.69483 9.46992 8.96913C9.17705 9.26203 9.17703 9.7368 9.46992 10.0297L11.6164 12.1762C12.1045 12.6642 12.8958 12.6641 13.384 12.1762L15.5305 10.0297C15.823 9.73675 15.8232 9.26189 15.5305 8.96913C15.2377 8.67638 14.7628 8.67657 14.4699 8.96913L13.2502 10.1889V6.9994C13.25 6.58556 12.914 6.24975 12.5002 6.2494Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M9.46966 8.96973C9.17679 9.26263 9.17677 9.7374 9.46966 10.0303L11.6161 12.1768C12.1043 12.6648 12.8956 12.6647 13.3837 12.1768L15.5302 10.0303C15.8231 9.73738 15.8231 9.2626 15.5302 8.96973C15.2373 8.67686 14.7625 8.67684 14.4697 8.96973L13.2499 10.1895V7C13.2499 6.58589 12.914 6.25017 12.4999 6.25C12.0857 6.25 11.7499 6.58579 11.7499 7V10.1895L10.5302 8.96973L10.4736 8.91797C10.179 8.67764 9.74427 8.69511 9.46966 8.96973Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
