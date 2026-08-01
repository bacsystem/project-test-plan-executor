import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiBrackets({
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
          d="M16.8193 21.3532C18.6787 21.1466 20.1465 19.6788 20.3531 17.8194L20.3863 17.5214C20.794 13.8517 20.794 10.1481 20.3863 6.47829L20.3531 6.18029C20.1465 4.3209 18.6787 2.85308 16.8193 2.64648"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M7.18035 2.64648C5.32096 2.85308 3.85314 4.3209 3.64654 6.18029L3.61343 6.47829C3.20568 10.148 3.20568 13.8517 3.61343 17.5214L3.64654 17.8194C3.85314 19.6788 5.32096 21.1466 7.18035 21.3532"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
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
          d="M16.9021 1.9014L17.1072 1.92874C19.2172 2.256 20.8607 3.95856 21.0984 6.09769L21.1316 6.39554C21.5455 10.1203 21.5455 13.8797 21.1316 17.6045L21.0984 17.9024C20.853 20.1103 19.11 21.8533 16.9021 22.0987L16.825 22.1035C16.4451 22.107 16.1171 21.8221 16.074 21.4366C16.0283 21.0249 16.3245 20.6533 16.7361 20.6075L17.0154 20.5645C18.392 20.2897 19.4498 19.1528 19.6072 17.7364L19.6404 17.4385C20.042 13.824 20.042 10.1761 19.6404 6.56155L19.6072 6.26273C19.4496 4.84654 18.3918 3.71036 17.0154 3.43558L16.7361 3.39163L16.6609 3.37991C16.289 3.30016 16.0311 2.94961 16.074 2.56351C16.117 2.17778 16.4451 1.89309 16.825 1.89651L16.9021 1.9014Z"
          fill="currentColor"
        />
        <path
          d="M7.17368 1.89652C7.55389 1.89276 7.88266 2.17754 7.92563 2.56351C7.97138 2.97519 7.67423 3.3459 7.26255 3.39164C5.75213 3.55967 4.55946 4.7523 4.39145 6.26273L4.35825 6.56156C3.95667 10.1761 3.95665 13.824 4.35825 17.4385L4.39145 17.7364C4.5593 19.2469 5.75204 20.4394 7.26255 20.6075C7.67423 20.6532 7.97138 21.0249 7.92563 21.4366C7.88253 21.8224 7.5538 22.1073 7.17368 22.1036L7.09751 22.0987L6.89145 22.0713C4.78174 21.7438 3.13892 20.0412 2.90122 17.9024L2.86802 17.6045C2.45415 13.8797 2.45415 10.1203 2.86802 6.39554L2.90122 6.09769C3.14656 3.88967 4.88948 2.14674 7.09751 1.9014L7.17368 1.89652Z"
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
