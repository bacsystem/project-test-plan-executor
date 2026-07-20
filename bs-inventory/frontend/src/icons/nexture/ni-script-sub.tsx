import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiScriptSub({
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
          d="M8.00016 8L12.0001 12M12.0001 12L16 16.0002M12.0001 12L16 8.00015M12.0001 12L8 16.0002"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M20.5852 21H18.01C18.001 21 17.9966 20.989 18.0031 20.9828L19.9402 18.9311C20.1606 18.7196 20.2852 18.4273 20.2852 18.1218C20.2852 17.5023 19.7829 17 19.1633 17H18.9712C18.6576 17 18.3543 17.1122 18.1161 17.3163"
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
          d="M15.4698 7.46963C15.7626 7.17684 16.2374 7.17684 16.5303 7.46963C16.8232 7.7625 16.8231 8.23728 16.5303 8.53018L13.0606 11.9999L16.5303 15.4696C16.8232 15.7625 16.8231 16.2373 16.5303 16.5302C16.2557 16.8048 15.821 16.8223 15.5264 16.5819L15.4698 16.5302L12 13.0604L8.53032 16.5302C8.23743 16.8231 7.76267 16.8231 7.46977 16.5302C7.17697 16.2373 7.17691 15.7625 7.46977 15.4696L10.9395 11.9999L7.46977 8.53018L7.41801 8.47354C7.1778 8.17898 7.19527 7.74421 7.46977 7.46963C7.76264 7.17676 8.23742 7.17682 8.53032 7.46963L12 10.9394L15.4698 7.46963Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M19.5352 18.1221C19.5352 17.9167 19.3685 17.75 19.1631 17.75H18.9717C18.8372 17.75 18.7067 17.7982 18.6045 17.8857C18.2901 18.1552 17.8165 18.1189 17.5469 17.8047C17.2774 17.4902 17.3136 17.0167 17.628 16.7471C18.002 16.4264 18.479 16.25 18.9717 16.25H19.1631C20.1969 16.25 21.0352 17.0883 21.0352 18.1221C21.0351 18.6195 20.8358 19.0946 20.4844 19.4453L20.4854 19.4463L19.7266 20.25H20.585C20.9992 20.25 21.335 20.5858 21.335 21C21.335 21.4142 20.9992 21.75 20.585 21.75H18.0098C17.3375 21.7498 17.0025 20.9456 17.459 20.4678H17.4581L19.3946 18.416L19.4209 18.3896C19.4938 18.3196 19.5351 18.2231 19.5352 18.1221Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
