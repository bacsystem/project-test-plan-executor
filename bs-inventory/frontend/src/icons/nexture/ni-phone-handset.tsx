import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPhoneHandset({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M2.59603 3.63669C4.54186 1.69129 7.80413 2.1236 9.17611 4.50876L9.85873 5.69528C10.5672 6.92695 10.3614 8.4815 9.35677 9.4863C9.14878 9.69446 9.06336 9.99607 9.13217 10.2822L9.16244 10.4062C9.63413 12.3671 11.1855 13.8883 13.1556 14.3232C13.4395 14.3857 13.7366 14.2989 13.9417 14.0937C14.9537 13.0823 16.5199 12.8794 17.7562 13.5996L19.0716 14.3662C21.4482 15.7509 21.8709 19.01 19.9261 20.955L19.8138 21.0674C18.7014 22.1796 17.0353 22.5256 15.5716 21.9492C9.18234 19.4322 4.12486 14.3755 1.60775 7.9863C1.03112 6.52254 1.37722 4.85564 2.48959 3.74313L2.59603 3.63669Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
