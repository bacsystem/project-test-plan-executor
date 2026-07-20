import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiGerm({
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
          d="M18.5996 11.9984C18.5996 17.3003 15.0326 21.5983 11.2035 21.5983C9.3428 21.5983 7.37846 20.2501 7.1998 18.5983C6.96447 16.4226 8.10472 16.0567 7.47484 13.1984C7.02146 11.141 5.61387 10.7984 5.74602 7.19841C5.83438 4.79131 8.17544 2.39844 11.5497 2.39844C15.3789 2.39844 18.5996 5.62982 18.5996 11.9984Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          d="M5.39999 9L3 9"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.19979 15L4.7998 15"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.0001 9L18.6001 9"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.0001 15L18.6001 15"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.7999 4.2008L18.497 2.50375"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.09695 4.09548L5.3999 2.39844"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.50315 21.4978L7.2002 19.8008"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.8972 21.4978L16.2002 19.8008"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M11.4001 10.2015C12.3942 10.2015 13.2001 9.39566 13.2001 8.40155C13.2001 7.40745 12.3942 6.60156 11.4001 6.60156C10.406 6.60156 9.6001 7.40745 9.6001 8.40155C9.6001 9.39566 10.406 10.2015 11.4001 10.2015Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12.8 16.6C13.7941 16.6 14.6 15.7941 14.6 14.8C14.6 13.8059 13.7941 13 12.8 13C11.8059 13 11 13.8059 11 14.8C11 15.7941 11.8059 16.6 12.8 16.6Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
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
          d="M11.5498 1.64844C13.3517 1.64858 15.0362 2.29607 16.376 3.56348L17.9668 1.97363C18.2597 1.68078 18.7344 1.68086 19.0273 1.97363C19.3201 2.26654 19.3202 2.74133 19.0273 3.03418L17.3633 4.69727C18.0584 5.66953 18.5913 6.85779 18.9297 8.25H21C21.414 8.25022 21.75 8.58592 21.75 9C21.75 9.41392 21.4148 9.74952 21.001 9.75H19.207C19.2994 10.4571 19.3496 11.2067 19.3496 11.998C19.3496 12.7708 19.2755 13.5242 19.1416 14.25H21C21.414 14.2502 21.75 14.5859 21.75 15C21.75 15.4139 21.4148 15.7495 21.001 15.75H18.7646C18.342 17.0677 17.7104 18.2574 16.9268 19.251C16.8952 19.291 16.8603 19.3287 16.8281 19.3682L18.4277 20.9678C18.7203 21.2607 18.7204 21.7355 18.4277 22.0283C18.1349 22.3211 17.6601 22.3209 17.3672 22.0283L15.793 20.4541C14.4783 21.6262 12.8868 22.3485 11.2031 22.3486C10.1018 22.3484 8.99232 21.9532 8.12891 21.3242C7.86491 21.1318 7.61602 20.911 7.39453 20.666L6.0332 22.0283C5.74029 22.3209 5.26545 22.3211 4.97266 22.0283C4.67986 21.7355 4.68005 21.2607 4.97266 20.9678L6.59961 19.3398C6.5286 19.1278 6.47881 18.9071 6.4541 18.6787C6.31942 17.433 6.58947 16.6574 6.75684 15.9756C6.775 15.9016 6.79206 15.8266 6.80859 15.75H4.7998C4.3857 15.7499 4.0498 15.4141 4.0498 15C4.0498 14.5859 4.3857 14.2501 4.7998 14.25H6.88867C6.86221 13.9873 6.81581 13.6935 6.74219 13.3594C6.54151 12.4492 6.17788 12.0378 5.71875 11.1094C5.5223 10.7121 5.34526 10.276 5.21484 9.75H3C2.58579 9.75 2.25 9.41421 2.25 9C2.25 8.58579 2.58579 8.25 3 8.25H5.00293C4.98543 7.92056 4.98171 7.56263 4.99609 7.1709C5.03533 6.10212 5.43877 5.06347 6.12207 4.18066L4.86914 2.92871C4.57661 2.63586 4.57653 2.16097 4.86914 1.86816C5.16203 1.57527 5.63777 1.57527 5.93066 1.86816L7.17969 3.11719C8.31592 2.21952 9.82718 1.64853 11.5498 1.64844ZM12.7998 12.25C11.3918 12.2503 10.2501 13.3918 10.25 14.7998C10.25 16.2079 11.3918 17.3493 12.7998 17.3496C14.2079 17.3494 15.3496 16.208 15.3496 14.7998C15.3495 13.3917 14.2079 12.2502 12.7998 12.25ZM11.4004 5.85156C9.9924 5.85188 8.84971 6.99333 8.84961 8.40137C8.84961 9.80949 9.99234 10.9509 11.4004 10.9512C12.8083 10.9507 13.9502 9.80937 13.9502 8.40137C13.9501 6.99345 12.8082 5.85207 11.4004 5.85156Z"
          fill="currentColor"
        />
        <g opacity={oneTone ? 0 : 0.4}>
          <path
            d="M12.7998 12.25C14.2081 12.25 15.3495 13.3916 15.3496 14.7998C15.3496 16.2081 14.2081 17.3496 12.7998 17.3496C11.3916 17.3495 10.25 16.2081 10.25 14.7998C10.2501 13.3916 11.3916 12.2501 12.7998 12.25Z"
            fill="currentColor"
          />
          <path
            d="M11.4004 5.85156C12.8084 5.85183 13.9501 6.99329 13.9502 8.40137C13.9502 9.80952 12.8085 10.9509 11.4004 10.9512C9.99216 10.9511 8.84961 9.80963 8.84961 8.40137C8.84971 6.99319 9.99222 5.85166 11.4004 5.85156Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
}
