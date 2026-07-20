import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiChevronUpDownSmall({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M16 7.5L12.8485 4.34853C12.3799 3.8799 11.6201 3.8799 11.1515 4.34853L8 7.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M16 16.5L12.8485 19.6515C12.3799 20.1201 11.6201 20.1201 11.1515 19.6515L8 16.5"
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
          d="M16.5303 8.03033C16.8232 7.73744 16.8232 7.26268 16.5303 6.96978L13.379 3.81842C12.6174 3.05689 11.3827 3.05689 10.6212 3.81842L7.46978 6.96978C7.17689 7.26268 7.17689 7.73744 7.46978 8.03033C7.76268 8.32322 8.23744 8.32322 8.53033 8.03033L11.6817 4.87896C11.8574 4.70323 12.1427 4.70323 12.3184 4.87896L15.4698 8.03033C15.7627 8.32322 16.2374 8.32322 16.5303 8.03033Z"
          fill="currentColor"
        />
        <path
          d="M16.5303 15.9697C16.8232 16.2626 16.8232 16.7373 16.5303 17.0302L13.379 20.1816C12.6174 20.9431 11.3827 20.9431 10.6212 20.1816L7.46978 17.0302C7.17689 16.7373 7.17689 16.2626 7.46978 15.9697C7.76268 15.6768 8.23744 15.6768 8.53033 15.9697L11.6817 19.121C11.8574 19.2968 12.1427 19.2968 12.3184 19.121L15.4698 15.9697C15.7627 15.6768 16.2374 15.6768 16.5303 15.9697Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
