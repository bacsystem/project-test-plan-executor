import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiRecord({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M14.6857 3.29841C17.8511 3.65012 20.3499 6.14892 20.7016 9.31432V9.31432C20.8999 11.0993 20.8999 12.9007 20.7016 14.6857V14.6857C20.3499 17.8511 17.8511 20.3499 14.6857 20.7016V20.7016C12.9007 20.8999 11.0993 20.8999 9.31432 20.7016V20.7016C6.14892 20.3499 3.65012 17.8511 3.29841 14.6857V14.6857C3.10008 12.9007 3.10008 11.0993 3.29841 9.31432V9.31432C3.65012 6.14892 6.14892 3.65012 9.31433 3.29841V3.29841C11.0993 3.10008 12.9007 3.10008 14.6857 3.29841V3.29841Z"
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
          d="M9.23143 2.55271C11.0712 2.3483 12.9288 2.34833 14.7685 2.55271C18.2823 2.94327 21.0557 5.71761 21.4463 9.23142C21.6507 11.0713 21.6507 12.9286 21.4463 14.7685C21.0557 18.2823 18.2823 21.0557 14.7685 21.4463C12.9287 21.6507 11.0712 21.6507 9.23143 21.4463C5.71773 21.0556 2.94328 18.2823 2.55272 14.7685C2.34831 12.9287 2.34831 11.0713 2.55272 9.23142C2.94322 5.71761 5.71766 2.94334 9.23143 2.55271Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
