import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPhoneHandsetCheck({
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
          opacity={oneTone ? 1 : 0.6}
          d="M20 4L16.8423 7.59785C16.6514 7.81541 16.3162 7.82587 16.112 7.62064L14.5 6"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M19.3957 20.4242L19.2835 20.5364C18.3821 21.4378 17.0319 21.7186 15.8459 21.2514C9.64999 18.8106 4.74587 13.9064 2.30505 7.71051C1.83783 6.5245 2.11865 5.17432 3.02002 4.27295L3.12618 4.16679C4.72291 2.57006 7.40009 2.9247 8.52601 4.8821L9.20869 6.06893C9.74819 7.00684 9.59145 8.19004 8.82636 8.95513C8.43358 9.34791 8.2733 9.91668 8.4032 10.4568L8.43308 10.581C8.97191 12.8212 10.7437 14.5583 12.9936 15.055C13.5274 15.1728 14.0849 15.0103 14.4714 14.6238C15.2426 13.8526 16.4364 13.6979 17.3787 14.2468L18.6942 15.0133C20.6459 16.1504 20.993 18.8269 19.3957 20.4242Z"
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
          opacity={oneTone ? 1 : 0.4}
          d="M20.4951 3.43632C20.7867 3.69252 20.8318 4.1249 20.6113 4.43437L20.5634 4.49491L17.4062 8.09257C16.9289 8.63646 16.0904 8.66227 15.58 8.14921L13.9677 6.52909C13.6757 6.23542 13.677 5.75966 13.9707 5.46757C14.2644 5.17551 14.7401 5.17684 15.0322 5.4705L16.455 6.90116L19.4365 3.50468L19.4902 3.44999C19.7685 3.19129 20.2033 3.18024 20.4951 3.43632Z"
          fill="currentColor"
        />
        <path
          d="M2.59599 3.63676C4.54176 1.69116 7.804 2.12371 9.17607 4.50883L9.85869 5.69535C10.5672 6.92711 10.3615 8.48156 9.35673 9.48637C9.14876 9.69451 9.06336 9.99617 9.13212 10.2823L9.1624 10.4063C9.63408 12.3672 11.1855 13.8883 13.1556 14.3233C13.4395 14.3859 13.7365 14.299 13.9417 14.0938C14.9536 13.0822 16.5198 12.8795 17.7561 13.5997L19.0716 14.3663C21.4484 15.751 21.8711 19.01 19.9261 20.9551L19.8138 21.0674C18.7013 22.1797 17.0353 22.5258 15.5716 21.9493C9.18235 19.4323 4.1248 14.3756 1.60771 7.98637C1.03116 6.52265 1.37722 4.85568 2.48955 3.74321L2.59599 3.63676Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
