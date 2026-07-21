import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiDocumentCheck({
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
          d="M3.36984 8.67144C3.73938 5.34558 6.39015 2.70123 9.71063 2.28617V2.28617C11.2181 2.09774 12.7819 2.09774 14.2894 2.28617V2.28617C17.6099 2.70123 20.2606 5.34558 20.6302 8.67144V8.67144C20.876 10.8837 20.876 13.1163 20.6302 15.3286V15.3286C20.2606 18.6544 17.6099 21.2988 14.2894 21.7138V21.7138C12.7819 21.9023 11.2181 21.9023 9.71063 21.7138V21.7138C6.39015 21.2988 3.73938 18.6544 3.36984 15.3286V15.3286C3.12404 13.1163 3.12404 10.8837 3.36984 8.67144V8.67144Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M15 10L11.8423 13.5979C11.6514 13.8154 11.3162 13.8259 11.112 13.6206L9.5 12"
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.61664 1.5416C11.1856 1.3455 12.8133 1.34551 14.3823 1.5416C18.0404 1.99914 20.9665 4.91154 21.3754 8.5875C21.6273 10.8546 21.6273 13.1437 21.3754 15.4107C20.9669 19.0872 18.0407 22 14.3823 22.4576C12.8132 22.6537 11.1857 22.6537 9.61664 22.4576C5.95831 21.9999 3.03196 19.0871 2.62347 15.4107C2.37163 13.1437 2.37158 10.8545 2.62347 8.5875C3.03238 4.91162 5.95865 1.99926 9.61664 1.5416ZM15.4946 9.43613C15.2028 9.18041 14.7679 9.19122 14.4897 9.4498L14.436 9.50449L11.4545 12.901L10.0317 11.4703C9.73955 11.177 9.2637 11.1754 8.97015 11.4674C8.67663 11.7594 8.67554 12.2352 8.96722 12.5289L10.5795 14.149C11.0899 14.6621 11.9283 14.6363 12.4057 14.0924L15.5629 10.4947L15.6108 10.4342C15.8313 10.1247 15.7861 9.69231 15.4946 9.43613Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M15.4951 9.43632C15.7867 9.69252 15.8318 10.1249 15.6113 10.4344L15.5634 10.4949L12.4062 14.0926C11.9289 14.6365 11.0904 14.6623 10.58 14.1492L8.96774 12.5291C8.67568 12.2354 8.67702 11.7597 8.97067 11.4676C9.26435 11.1755 9.7401 11.1768 10.0322 11.4705L11.455 12.9012L14.4365 9.50468L14.4902 9.44999C14.7685 9.19129 15.2033 9.18024 15.4951 9.43632Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
