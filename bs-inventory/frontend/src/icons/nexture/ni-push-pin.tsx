import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiPushPin({
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
          d="M9.04791 2.59042C10.9967 2.20067 13.0033 2.20067 14.9521 2.59042V2.59042C15.9596 2.79192 16.4736 3.92123 15.9638 4.81329L15.2635 6.03885C15.0908 6.34105 15 6.68308 15 7.03113L15 8.4873C15 8.81558 15.1304 9.13041 15.3625 9.36253L16.8469 10.8469C18.2346 12.2346 17.5779 14.6055 15.674 15.0815V15.0815C13.2618 15.6846 10.7382 15.6846 8.326 15.0815V15.0815C6.42214 14.6055 5.76542 12.2346 7.15308 10.8469L8.63747 9.36253C8.86959 9.13041 9 8.81558 9 8.4873L9 7.03113C9 6.68308 8.90917 6.34105 8.73649 6.03885L8.03617 4.81329C7.52641 3.92123 8.04042 2.79192 9.04791 2.59042V2.59042Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M12 16L12 22"
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
          d="M8.90115 1.85466C10.9468 1.44559 13.0538 1.44558 15.0994 1.85466C16.6087 2.15664 17.3785 3.84926 16.615 5.18572L15.9148 6.4113C15.8071 6.6 15.7498 6.81412 15.7498 7.03142V8.48747C15.7498 8.6165 15.8013 8.74084 15.8924 8.8322L17.3767 10.3166C19.1765 12.1164 18.3254 15.1912 15.8562 15.8088C13.3247 16.4416 10.6759 16.4416 8.14431 15.8088C5.67513 15.1912 4.82302 12.1164 6.62283 10.3166L8.1072 8.8322C8.19857 8.7408 8.24971 8.61671 8.24978 8.48747V7.03142C8.24971 6.81421 8.19339 6.59994 8.08572 6.4113L7.38455 5.18572C6.62121 3.84929 7.39193 2.15661 8.90115 1.85466Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11.25 22V16C11.25 15.5858 11.5858 15.25 12 15.25C12.4142 15.25 12.75 15.5858 12.75 16V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
