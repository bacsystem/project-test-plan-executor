import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiTriangleRight({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
  const iconSize = sizeHelper(size);
  const iconStrokeWidth = strokeSizeHelper(iconSize);

  if (variant === "outlined") {
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.7208 13.5816C16.671 12.737 16.6787 11.2548 15.7373 10.4004L15.0967 9.81906C13.7856 8.62909 12.1743 7.81982 10.4369 7.47859V7.47859C9.09961 7.21596 7.80783 8.10402 7.57412 9.44662L7.53709 9.65937C7.26748 11.2083 7.26749 12.7921 7.53711 14.3409L7.57492 14.5581C7.80794 15.8967 9.09811 16.7804 10.4305 16.514V16.514C12.1131 16.1775 13.676 15.3993 14.9585 14.2593L15.7208 13.5816Z"
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
          d="M6.83484 9.31795C7.14074 7.56137 8.83132 6.3995 10.5809 6.74275C12.4522 7.11027 14.1882 7.98173 15.6005 9.26326L16.2411 9.84432C17.5128 10.9984 17.5022 13.0013 16.2186 14.1422L15.4569 14.8199C14.0749 16.0483 12.3902 16.886 10.577 17.2486C8.83148 17.5973 7.1411 16.4399 6.83581 14.6861L6.79773 14.4693C6.51337 12.8356 6.5134 11.1646 6.79773 9.53084L6.83484 9.31795Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
