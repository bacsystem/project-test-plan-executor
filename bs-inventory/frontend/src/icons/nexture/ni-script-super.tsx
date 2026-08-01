import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiScriptSuper({
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
          d="M20.5852 7H18.01C18.001 7 17.9966 6.98902 18.0031 6.98279L19.9402 4.93114C20.1606 4.71959 20.2852 4.42732 20.2852 4.12185C20.2852 3.50227 19.7829 3 19.1633 3H18.9712C18.6576 3 18.3543 3.1122 18.1161 3.31632"
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
          d="M19.5352 4.12207C19.5352 3.9167 19.3685 3.75 19.1631 3.75H18.9717C18.8372 3.75 18.7067 3.79823 18.6045 3.88574C18.2901 4.15524 17.8165 4.11895 17.5469 3.80469C17.2774 3.49024 17.3136 3.01666 17.628 2.74707C18.002 2.42643 18.479 2.25 18.9717 2.25H19.1631C20.1969 2.25 21.0352 3.08828 21.0352 4.12207C21.0351 4.61951 20.8358 5.0946 20.4844 5.44531L20.4854 5.44629L19.7266 6.25H20.585C20.9992 6.25 21.335 6.58579 21.335 7C21.335 7.41421 20.9992 7.75 20.585 7.75H18.0098C17.3375 7.7498 17.0025 6.94557 17.459 6.46777H17.4581L19.3946 4.41602L19.4209 4.38965C19.4938 4.3196 19.5351 4.22312 19.5352 4.12207Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
