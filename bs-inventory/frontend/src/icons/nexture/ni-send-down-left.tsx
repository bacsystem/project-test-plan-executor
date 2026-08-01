import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSendDownLeft({
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
          d="M1.98305 17.6351C2.42294 12.2099 4.74397 7.03579 8.46668 3.0649C10.3578 1.0477 13.7888 2.10043 14.1318 4.84413L14.4903 7.71255C14.6038 8.62044 15.3189 9.33555 16.2268 9.44904L19.0952 9.80759C21.8389 10.1506 22.8916 13.5815 20.8744 15.4727C16.9036 19.1954 11.7294 21.5164 6.30422 21.9563C3.83967 22.1561 1.78323 20.0997 1.98305 17.6351Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M14.6831 9.25586L11.5011 12.4378"
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
          d="M7.91971 2.5512C10.2251 0.0925876 14.4501 1.34735 14.8758 4.75041L15.2342 7.61858C15.3052 8.18549 15.7523 8.63324 16.3191 8.70452L19.1883 9.06291C22.5914 9.4885 23.8461 13.7136 21.3875 16.019C17.2949 19.8556 11.9616 22.2497 6.36503 22.7035C3.43995 22.9404 0.998268 20.4987 1.23514 17.5737C1.68901 11.9771 4.08307 6.64382 7.91971 2.5512ZM15.2137 8.72502C14.9208 8.43219 14.446 8.43231 14.1531 8.72502L10.9705 11.9067L10.9187 11.9643C10.679 12.2587 10.6964 12.6927 10.9705 12.9672C11.2449 13.2417 11.6798 13.2598 11.9744 13.0199L12.031 12.9672L15.2137 9.78557C15.5063 9.49269 15.5064 9.01786 15.2137 8.72502Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M12.0313 12.9682L11.974 13.02C11.6795 13.2599 11.2452 13.2426 10.9707 12.9682C10.6962 12.6937 10.6789 12.2594 10.9189 11.9648L10.9707 11.9075L14.1527 8.72553C14.4456 8.43264 14.9204 8.43264 15.2133 8.72553C15.5062 9.01842 15.5062 9.4933 15.2133 9.78619L12.0313 12.9682Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
