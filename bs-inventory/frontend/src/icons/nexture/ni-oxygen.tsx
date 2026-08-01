import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiOxygen({
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
          d="M13 7V5M14 5L12 5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 22C9.60457 22 10.5 21.1046 10.5 20C10.5 18.8954 9.60457 18 8.5 18C7.39543 18 6.5 18.8954 6.5 20C6.5 21.1046 7.39543 22 8.5 22Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 15V3.33334C9.5 2.59696 8.90305 2.00001 8.16668 2L8 2"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M13.0001 19.4994L15.6669 19.4998C16.4032 19.4999 17 20.0968 17 20.8331L17 22"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M15.7727 17.911C15.691 18.3257 15.4272 18.6878 15.0554 18.8888L14.8053 19.024C13.6706 19.6374 12.3113 19.6721 11.1467 19.1176L10.6374 18.875C10.2362 18.684 9.94797 18.3085 9.86203 17.8727C9.29763 15.0104 9.29427 12.0277 9.86642 9.16695C9.95058 8.74613 10.2243 8.38774 10.6082 8.19582L11.0969 7.95145C12.2862 7.35679 13.6936 7.39381 14.85 8.05016L15.085 8.18357C15.4391 8.38453 15.6884 8.72938 15.7682 9.12859C16.3455 12.0147 16.3421 15.0234 15.7727 17.911Z"
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
          d="M12.25 7V5.75H12C11.5858 5.75 11.25 5.41421 11.25 5C11.25 4.58579 11.5858 4.25 12 4.25H14C14.4142 4.25 14.75 4.58579 14.75 5C14.75 5.41421 14.4142 5.75 14 5.75H13.75V7C13.75 7.41421 13.4142 7.75 13 7.75C12.5858 7.75 12.25 7.41421 12.25 7Z"
          fill="currentColor"
        />
        <path
          d="M9.75 20C9.75 19.3096 9.19036 18.75 8.5 18.75C7.80964 18.75 7.25 19.3096 7.25 20C7.25 20.6904 7.80964 21.25 8.5 21.25C9.19036 21.25 9.75 20.6904 9.75 20ZM11.25 20C11.25 21.5188 10.0188 22.75 8.5 22.75C6.98122 22.75 5.75 21.5188 5.75 20C5.75 18.4812 6.98122 17.25 8.5 17.25C10.0188 17.25 11.25 18.4812 11.25 20Z"
          fill="currentColor"
        />
        <path
          d="M8.75 15V3.33301C8.74982 3.0111 8.4889 2.75018 8.16699 2.75H8C7.58579 2.75 7.25 2.41421 7.25 2C7.25 1.58579 7.58579 1.25 8 1.25H8.16699C9.31733 1.25018 10.2498 2.18267 10.25 3.33301V15C10.25 15.4142 9.91421 15.75 9.5 15.75C9.08579 15.75 8.75 15.4142 8.75 15Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M13 20.249L15.667 20.25C15.989 20.2502 16.2499 20.511 16.25 20.833L16.25 22C16.25 22.4142 16.5858 22.75 17 22.75C17.4142 22.75 17.75 22.4142 17.75 22L17.75 20.833C17.7499 19.6826 16.8174 18.7502 15.667 18.75L13 18.749C12.586 18.7491 12.2502 19.085 12.25 19.499C12.2499 19.9132 12.5858 20.249 13 20.249Z"
          fill="currentColor"
        />
        <path
          d="M10.7623 7.27943C12.1749 6.57325 13.8467 6.61723 15.2203 7.39662L15.4557 7.53041C15.9989 7.83881 16.382 8.36806 16.5045 8.9806C17.1012 11.9642 17.0974 15.0722 16.5094 18.0548C16.3849 18.6858 15.9842 19.2391 15.4127 19.548L15.1627 19.6828C13.8175 20.4099 12.2055 20.4515 10.8248 19.7941L10.315 19.5509C9.69694 19.2564 9.25775 18.6816 9.12657 18.0167C8.54345 15.0594 8.53981 11.977 9.13145 9.01869C9.26105 8.37119 9.6825 7.81998 10.2731 7.52455L10.7623 7.27943Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
