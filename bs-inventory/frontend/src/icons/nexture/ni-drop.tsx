import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiDrop({
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
          d="M11.3802 2.23697C7.39437 3.96084 4 9.28661 4 13.9481C4 16.0675 4.70169 17.7487 5.84164 19.0223C8.9305 22.4732 15.0695 22.4732 18.1584 19.0223C19.2983 17.7487 20 16.0675 20 13.9481C20 9.28661 16.6056 3.96084 12.6198 2.23697C12.2239 2.06576 11.7761 2.06576 11.3802 2.23697Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M7 13.2178C7 16.2811 9.34548 17.8796 12 18.2502"
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
          d="M11.082 1.54938C11.6678 1.29604 12.3322 1.29604 12.918 1.54938C15.0849 2.48675 17.035 4.37129 18.4385 6.5904C19.8438 8.81254 20.75 11.4471 20.75 13.9488C20.7499 16.2472 19.9832 18.1081 18.7168 19.523C17.0067 21.4333 14.4823 22.3609 12 22.3609C9.51765 22.3609 6.9933 21.4333 5.2832 19.523C4.01678 18.1081 3.2501 16.2472 3.25 13.9488C3.25005 11.4471 4.15623 8.81254 5.56152 6.5904C6.96501 4.37129 8.91513 2.48675 11.082 1.54938ZM7 12.4683C6.58579 12.4683 6.25 12.8041 6.25 13.2183C6.2501 14.9632 6.92715 16.3311 8.00195 17.3013C9.05904 18.2554 10.4625 18.7935 11.8965 18.9937C12.3065 19.0508 12.6857 18.764 12.7432 18.3541C12.8002 17.944 12.5136 17.5656 12.1035 17.5084C10.8834 17.338 9.78603 16.8913 9.00684 16.1881C8.24543 15.5007 7.7501 14.5365 7.75 13.2183C7.75 12.8041 7.41421 12.4683 7 12.4683Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M6.25 13.2178C6.25 12.8036 6.58579 12.4678 7 12.4678C7.41421 12.4678 7.75 12.8036 7.75 13.2178C7.75 14.5361 8.24536 15.5001 9.00684 16.1875C9.78605 16.8909 10.8833 17.3374 12.1035 17.5078C12.5136 17.5651 12.8002 17.9434 12.7432 18.3535C12.6859 18.7637 12.3066 19.0503 11.8965 18.9932C10.4624 18.7929 9.05906 18.255 8.00195 17.3008C6.92707 16.3305 6.25 14.9628 6.25 13.2178Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
