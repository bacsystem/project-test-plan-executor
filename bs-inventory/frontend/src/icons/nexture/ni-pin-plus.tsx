import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPinPlus({
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
          d="M3.5 11C3.5 -0.851664 20.5 -0.851509 20.5 11.0001C20.5 15.4717 16.9361 19.1839 14.4237 21.2453C12.9975 22.4155 11.003 22.4155 9.57669 21.2453C7.06421 19.1839 3.5 15.4717 3.5 11Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9.49952 11.0003H14.4995M11.9999 8.5L11.9999 13.5"
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
          d="M12 1.36133C14.2941 1.36134 16.6078 2.16054 18.3545 3.78418C20.1124 5.41826 21.25 7.84507 21.25 11C21.25 13.4381 20.2794 15.6319 19.0215 17.4531C17.7628 19.2754 16.1868 20.7689 14.8994 21.8252C13.1966 23.2223 10.8034 23.2223 9.10059 21.8252C7.81329 20.769 6.23812 19.2752 4.97949 17.4531C3.72149 15.6319 2.75 13.4382 2.75 11C2.75001 7.84504 3.8876 5.41826 5.64551 3.78418C7.39221 2.16056 9.70587 1.36131 12 1.36133ZM12 7.75C11.586 7.7502 11.25 8.08591 11.25 8.5V10.25H9.5C9.08589 10.25 8.75016 10.5859 8.75 11C8.75 11.4142 9.08579 11.75 9.5 11.75H11.25V13.5C11.25 13.9141 11.5859 14.2498 12 14.25C12.414 14.2498 12.75 13.9141 12.75 13.5V11.75H14.5C14.914 11.7497 15.25 11.4141 15.25 11C15.2498 10.5861 14.9139 10.2503 14.5 10.25H12.75V8.5C12.75 8.08595 12.414 7.75027 12 7.75Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M11.2495 13.5L11.2495 11.75H9.49953C9.08532 11.75 8.74953 11.4142 8.74953 11C8.74969 10.5859 9.08541 10.25 9.49952 10.25H11.2495L11.2495 8.5C11.2495 8.08591 11.5855 7.7502 11.9995 7.75C12.4137 7.75 12.7495 8.08579 12.7495 8.5L12.7495 10.25H14.4995C14.9136 10.25 15.2494 10.5859 15.2495 11C15.2495 11.4142 14.9137 11.75 14.4995 11.75H12.7495L12.7495 13.5C12.7495 13.9142 12.4138 14.25 11.9995 14.25C11.5855 14.2498 11.2495 13.9141 11.2495 13.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
