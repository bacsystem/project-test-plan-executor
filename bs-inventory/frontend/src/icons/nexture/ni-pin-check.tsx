import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPinCheck({
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
          d="M15 9.5L11.8423 13.0979C11.6514 13.3154 11.3162 13.3259 11.112 13.1206L9.5 11.5"
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
          d="M12 1.36133C14.2941 1.36134 16.6078 2.16054 18.3545 3.78418C20.1124 5.41826 21.25 7.84507 21.25 11C21.25 13.4381 20.2794 15.6319 19.0215 17.4531C17.7628 19.2754 16.1868 20.7689 14.8994 21.8252C13.1966 23.2223 10.8034 23.2223 9.10059 21.8252C7.81329 20.769 6.23812 19.2752 4.97949 17.4531C3.72149 15.6319 2.75 13.4382 2.75 11C2.75001 7.84504 3.8876 5.41826 5.64551 3.78418C7.39221 2.16056 9.70587 1.36131 12 1.36133ZM15.4951 8.93652C15.1839 8.66339 14.7098 8.69387 14.4365 9.00488L11.4551 12.4014L10.0322 10.9707C9.74013 10.677 9.26438 10.6757 8.9707 10.9678C8.67713 11.2599 8.67574 11.7356 8.96777 12.0293L10.5801 13.6494C11.0904 14.1625 11.9289 14.1366 12.4062 13.5928L15.5635 9.99512C15.8366 9.68391 15.8061 9.2098 15.4951 8.93652Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M15.4952 8.93644C15.8062 9.20972 15.8367 9.68383 15.5636 9.99504L12.4063 13.5927C11.929 14.1366 11.0905 14.1624 10.5802 13.6493L8.96785 12.0292C8.67579 11.7355 8.67713 11.2598 8.97078 10.9677C9.26446 10.6756 9.74021 10.677 10.0323 10.9706L11.4552 12.4013L14.4366 9.0048C14.7099 8.69379 15.184 8.66331 15.4952 8.93644Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
