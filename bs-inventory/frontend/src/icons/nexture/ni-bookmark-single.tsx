import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiBookmarkSingle({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M4.46553 7.81025C4.78016 4.97857 6.97074 2.71846 9.79121 2.31554V2.31554C11.2563 2.10624 12.7437 2.10624 14.2088 2.31554V2.31554C17.0293 2.71846 19.2198 4.97857 19.5345 7.81025L19.648 8.83196C19.8821 10.9386 19.9033 13.0635 19.7114 15.1744L19.3332 19.3344C19.1897 20.9138 17.3528 21.7058 16.1058 20.726L13.2356 18.4709C12.5104 17.901 11.4896 17.901 10.7644 18.4709L7.89419 20.726C6.64716 21.7058 4.81035 20.9138 4.66677 19.3344L4.28859 15.1745C4.09668 13.0635 4.11793 10.9386 4.352 8.83195L4.46553 7.81025Z"
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
          d="M9.68561 1.57267C11.2209 1.35341 12.7803 1.35335 14.3155 1.57267C17.4742 2.02424 19.928 4.55656 20.2803 7.72794L20.3936 8.74943C20.6332 10.906 20.6555 13.0816 20.459 15.2426L20.0801 19.4028C19.8824 21.5739 17.3572 22.6626 15.6426 21.3158L12.7725 19.061C12.3193 18.7049 11.6809 18.7049 11.2276 19.061L8.35748 21.3158C6.64296 22.6627 4.11777 21.574 3.91998 19.4028L3.54205 15.2426C3.3456 13.0816 3.36691 10.906 3.60651 8.74943L3.72076 7.72794C4.07316 4.55633 6.52655 2.02397 9.68561 1.57267Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
