import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSendDownRight({
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
          d="M22.0169 17.6351C21.5771 12.2099 19.256 7.03579 15.5333 3.0649C13.6422 1.0477 10.2112 2.10043 9.86825 4.84413L9.50969 7.71255C9.39621 8.62044 8.6811 9.33555 7.77321 9.44904L4.90479 9.80759C2.16109 10.1506 1.10835 13.5815 3.12556 15.4727C7.09645 19.1954 12.2706 21.5164 17.6958 21.9563C20.1603 22.1561 22.2168 20.0997 22.0169 17.6351Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9.31689 9.25586L12.4989 12.4378"
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
          d="M9.12409 4.75004C9.54995 1.34742 13.7748 0.0928098 16.0801 2.55082C19.9169 6.64339 22.3107 11.9767 22.7647 17.5733C23.0019 20.4987 20.5602 22.9403 17.6348 22.7032C12.0382 22.2492 6.70496 19.8554 2.61237 16.0186C0.154332 13.7132 1.40891 9.48835 4.81159 9.06254L7.68073 8.70414C8.24783 8.63293 8.69479 8.1854 8.76569 7.61821L9.12409 4.75004ZM9.84772 8.72563C9.5549 8.4328 9.08009 8.43294 8.78718 8.72563C8.49428 9.01852 8.49428 9.49328 8.78718 9.78617L11.9688 12.9688L12.0264 13.0205C12.3209 13.2601 12.755 13.2429 13.0294 12.9688C13.3038 12.6943 13.3211 12.2595 13.0811 11.9649L13.0294 11.9073L9.84772 8.72563Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M11.9687 12.9682L12.026 13.02C12.3205 13.2599 12.7548 13.2426 13.0293 12.9682C13.3038 12.6937 13.3211 12.2594 13.0811 11.9648L13.0293 11.9075L9.84734 8.72553C9.55444 8.43264 9.07957 8.43264 8.78668 8.72553C8.49378 9.01842 8.49378 9.4933 8.78668 9.78619L11.9687 12.9682Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
