import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiSignalLeftRight({
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
          d="M8 15C6.66667 13.0731 6.66636 10.9269 7.9997 9"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M16 15C17.3333 13.0731 17.3336 10.9269 16.0003 9"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M3.9998 17C1.99987 13.6843 2.00017 10 4.00009 7"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M20 17C21.8332 13.8421 21.8334 10.1579 20.0001 7"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12.4243 12.4243C12.1899 12.6586 11.8101 12.6586 11.5757 12.4243V12.4243C11.3414 12.1899 11.3414 11.8101 11.5757 11.5757V11.5757C11.8101 11.3414 12.1899 11.3414 12.4243 11.5757V11.5757C12.6586 11.8101 12.6586 12.1899 12.4243 12.4243V12.4243Z"
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
          d="M7.38267 15.4265C5.87188 13.243 5.87171 10.7566 7.38267 8.57298C7.61837 8.23237 8.086 8.14686 8.42662 8.38255C8.74585 8.60345 8.84049 9.02826 8.65708 9.36106L8.61607 9.42649L8.41294 9.74095C7.46497 11.3216 7.53356 13.0072 8.61705 14.573C8.85256 14.9136 8.76716 15.3813 8.42662 15.6169C8.08602 15.8524 7.61832 15.767 7.38267 15.4265Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M16.6173 15.4265C18.1281 13.243 18.1283 10.7566 16.6173 8.57298C16.3816 8.23237 15.914 8.14686 15.5734 8.38255C15.2541 8.60345 15.1595 9.02826 15.3429 9.36106L15.3839 9.42649L15.5871 9.74095C16.535 11.3216 16.4664 13.0072 15.383 14.573C15.1474 14.9136 15.2328 15.3813 15.5734 15.6169C15.914 15.8524 16.3817 15.767 16.6173 15.4265Z"
          fill="currentColor"
        />
        <path
          d="M3.16321 17.0535C1.28497 13.7079 1.26768 9.99288 3.17883 6.8914L3.3761 6.58378L3.422 6.52226C3.66371 6.22886 4.09302 6.16041 4.41614 6.37577C4.76079 6.60553 4.85391 7.07116 4.62415 7.41581C2.80002 10.1521 2.77803 13.5219 4.64173 16.6121L4.67884 16.6805C4.84096 17.0241 4.71922 17.4419 4.38684 17.6424C4.03228 17.8559 3.57143 17.7419 3.35755 17.3875L3.16321 17.0535Z"
          fill="currentColor"
        />
        <path
          d="M20.6483 17.377C22.5551 14.0923 22.6146 10.2622 20.827 6.94337L20.6483 6.62306L20.6063 6.5586C20.3831 6.25132 19.9595 6.15691 19.6239 6.35157C19.2656 6.55953 19.1434 7.01874 19.3514 7.37696C21.0492 10.3018 21.0492 13.6982 19.3514 16.6231C19.1435 16.9812 19.265 17.4404 19.6229 17.6484C19.981 17.8563 20.4402 17.7349 20.6483 17.377Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11.045 11.0465C11.5722 10.5193 12.4278 10.5193 12.955 11.0465C13.4489 11.5407 13.4798 12.3228 13.0475 12.8529L12.9543 12.9558L12.8521 13.0484C12.322 13.4807 11.5399 13.4498 11.0457 12.9558L10.9525 12.8529C10.5202 12.3228 10.5511 11.5407 11.045 11.0465Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
