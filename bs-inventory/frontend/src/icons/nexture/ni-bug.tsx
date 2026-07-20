import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiBug({
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
          d="M17.0268 17.866C16.701 19.4948 15.5275 20.8242 13.9517 21.3494V21.3494C12.6848 21.7717 11.3152 21.7717 10.0483 21.3494V21.3494C8.47251 20.8242 7.29896 19.4948 6.9732 17.866L6.84566 17.2283C6.28741 14.4371 6.28741 11.5629 6.84566 8.7717L6.9732 8.13401C7.29896 6.50521 8.47251 5.17583 10.0483 4.65055V4.65055C11.3152 4.22827 12.6848 4.22827 13.9517 4.65055V4.65055C15.5275 5.17583 16.701 6.50521 17.0268 8.13402L17.1543 8.7717C17.7126 11.5629 17.7126 14.4371 17.1543 17.2283L17.0268 17.866Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M15 4.5L16 2"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9 4.5L8 2"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M10.5 10L10 9"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M13.5 10L14 9"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M7 8L4 7"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M17 8L20 7"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M6 13H3"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M18 13H21"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M7 18L4 19"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M17 18L20 19"
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
          d="M9.8111 3.93908C11.2317 3.46563 12.7684 3.46561 14.189 3.93908C16.0199 4.54942 17.3836 6.09453 17.7623 7.98693L17.8902 8.62463C18.4678 11.5126 18.4677 14.4876 17.8902 17.3756L17.7623 18.0133C17.3836 19.9057 16.0198 21.4507 14.189 22.0611C12.7684 22.5346 11.2318 22.5347 9.8111 22.0611C7.9803 21.4507 6.61648 19.9057 6.23786 18.0133L6.1109 17.3756C5.53338 14.4875 5.53331 11.5127 6.1109 8.62463L6.23786 7.98693C6.61655 6.09469 7.98041 4.54951 9.8111 3.93908ZM10.6714 8.66564C10.4863 8.29535 10.036 8.14492 9.66559 8.3297C9.29525 8.51489 9.14471 8.96516 9.32965 9.33556L9.82965 10.3356C10.015 10.7055 10.4653 10.8563 10.8355 10.6715C11.2055 10.4864 11.3559 10.0359 11.1714 9.66564L10.6714 8.66564ZM14.3355 8.3297C13.9651 8.14476 13.5148 8.29529 13.3297 8.66564L12.8297 9.66564C12.6448 10.036 12.7953 10.4864 13.1656 10.6715C13.5358 10.856 13.9863 10.7056 14.1714 10.3356L14.6714 9.33556C14.8563 8.96534 14.7055 8.51506 14.3355 8.3297Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M6.7627 17.2881C7.15548 17.1573 7.58081 17.3701 7.71191 17.7627C7.84288 18.1556 7.63013 18.5809 7.2373 18.7119L4.2373 19.7119C3.84435 19.8429 3.41907 19.6303 3.28809 19.2373C3.15735 18.8445 3.36986 18.4191 3.7627 18.2881L6.7627 17.2881Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M16.2881 17.7627C16.4192 17.3701 16.8445 17.1573 17.2373 17.2881L20.2373 18.2881C20.6301 18.4191 20.8427 18.8445 20.7119 19.2373C20.5809 19.6303 20.1557 19.8429 19.7627 19.7119L16.7627 18.7119C16.3699 18.5809 16.1571 18.1556 16.2881 17.7627Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M6 12.25C6.4142 12.25 6.74999 12.5858 6.75 13C6.75 13.4142 6.41421 13.75 6 13.75H3C2.58579 13.75 2.25 13.4142 2.25 13C2.25001 12.5858 2.5858 12.25 3 12.25H6Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M21 12.25C21.4142 12.25 21.75 12.5858 21.75 13C21.75 13.4142 21.4142 13.75 21 13.75H18C17.5858 13.75 17.25 13.4142 17.25 13C17.25 12.5858 17.5858 12.25 18 12.25H21Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M3.28809 6.76272C3.41907 6.36976 3.84435 6.15712 4.2373 6.28811L7.2373 7.28811C7.63014 7.41917 7.84288 7.84443 7.71191 8.23732C7.58083 8.63002 7.1555 8.84275 6.7627 8.71193L3.7627 7.71193C3.36984 7.58098 3.15731 7.15559 3.28809 6.76272Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M19.7627 6.28811C20.1557 6.15712 20.5809 6.36976 20.7119 6.76272C20.8427 7.15559 20.6302 7.58098 20.2373 7.71193L17.2373 8.71193C16.8445 8.84275 16.4192 8.63002 16.2881 8.23732C16.1571 7.84443 16.3699 7.41917 16.7627 7.28811L19.7627 6.28811Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M7.72168 1.30373C8.10619 1.15008 8.54247 1.33723 8.69629 1.7217L9.69629 4.2217C9.84999 4.60622 9.6628 5.04247 9.27832 5.19631C8.89377 5.35002 8.45752 5.16287 8.30371 4.77834L7.30371 2.27834C7.15003 1.89381 7.33716 1.45754 7.72168 1.30373Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M15.3037 1.7217C15.4575 1.33723 15.8938 1.15008 16.2783 1.30373C16.6628 1.45754 16.85 1.89381 16.6963 2.27834L15.6963 4.77834C15.5425 5.16287 15.1062 5.35002 14.7217 5.19631C14.3372 5.04247 14.15 4.60622 14.3037 4.2217L15.3037 1.7217Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M9.66502 8.32908C10.0354 8.14414 10.4857 8.29466 10.6709 8.66502L11.1709 9.66502C11.3558 10.0354 11.2053 10.4857 10.8349 10.6709C10.4645 10.8558 10.0143 10.7053 9.82908 10.3349L9.32908 9.33494C9.14414 8.96453 9.29467 8.51426 9.66502 8.32908Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M13.3291 8.66502C13.5143 8.29466 13.9645 8.14414 14.3349 8.32908C14.7053 8.51427 14.8558 8.96455 14.6709 9.33494L14.1709 10.3349C13.9857 10.7053 13.5354 10.8558 13.165 10.6709C12.7947 10.4857 12.6441 10.0354 12.8291 9.66502L13.3291 8.66502Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
