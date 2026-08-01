import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiShield({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M17.2473 2.89928C18.611 3.26294 19.6216 4.41197 19.8081 5.81096L20.2059 8.79417C20.4009 10.2565 20.3767 11.7398 20.1342 13.1951V13.1951C19.7296 15.6227 18.3382 17.7745 16.2904 19.1397L13.2099 21.1934C12.4772 21.6818 11.5228 21.6818 10.7901 21.1934L7.70956 19.1397C5.66181 17.7745 4.27045 15.6227 3.86584 13.1951V13.1951C3.6233 11.7398 3.59913 10.2565 3.79411 8.79417L4.19187 5.81096C4.3784 4.41197 5.38898 3.26294 6.75269 2.89928L7.00296 2.83254C10.2771 1.95944 13.7229 1.95944 16.997 2.83254L17.2473 2.89928Z"
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
          d="M6.80962 2.10686C10.2103 1.20002 13.7898 1.20009 17.1905 2.10686L17.4405 2.17425C19.097 2.616 20.3251 4.012 20.5518 5.71136L20.9493 8.69476C21.1541 10.2308 21.1288 11.7892 20.8741 13.3178C20.4354 15.9497 18.9271 18.2829 16.7071 19.7631L13.626 21.8168C12.6414 22.4732 11.3587 22.4732 10.3741 21.8168L7.294 19.7631C5.07392 18.2829 3.56469 15.9498 3.12603 13.3178C2.87132 11.7892 2.84605 10.2308 3.05083 8.69476L3.44829 5.71136C3.67503 4.01201 4.9031 2.61603 6.55962 2.17425L6.80962 2.10686Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
