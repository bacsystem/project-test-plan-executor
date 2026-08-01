import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCrosshair({
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
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={iconStrokeWidth} />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M19 5L15 9"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M8.99996 15L4.99996 19"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M9 9L4.99998 5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
          strokeLinecap="round"
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M19 19L15 15"
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
          d="M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25ZM15.4736 14.418C15.1791 14.1779 14.7443 14.1952 14.4697 14.4697C14.1952 14.7443 14.1779 15.1791 14.418 15.4736L14.4697 15.5303L18.4697 19.5303C18.7626 19.8232 19.2374 19.8232 19.5303 19.5303C19.8232 19.2374 19.8232 18.7626 19.5303 18.4697L15.5303 14.4697L15.4736 14.418ZM9.53027 14.4697C9.23737 14.1771 8.76254 14.1769 8.46973 14.4697L4.46973 18.4697L4.41797 18.5264C4.17772 18.8209 4.19535 19.2557 4.46973 19.5303C4.74432 19.8049 5.17906 19.8223 5.47363 19.582L5.53027 19.5303L9.53027 15.5303C9.82314 15.2374 9.82314 14.7626 9.53027 14.4697ZM5.47363 4.41797C5.17906 4.17785 4.74426 4.1952 4.46973 4.46973C4.1952 4.74426 4.17785 5.17906 4.41797 5.47363L4.46973 5.53027L8.46973 9.53027C8.76262 9.82316 9.23738 9.82316 9.53027 9.53027C9.82317 9.23738 9.82317 8.76262 9.53027 8.46973L5.53027 4.46973L5.47363 4.41797ZM19.5303 4.46973C19.2374 4.17704 18.7626 4.1769 18.4697 4.46973L14.4697 8.46973L14.418 8.52637C14.1777 8.82087 14.1953 9.25566 14.4697 9.53027C14.7443 9.80487 15.1791 9.82232 15.4736 9.58203L15.5303 9.53027L19.5303 5.53027C19.8232 5.23738 19.8232 4.76262 19.5303 4.46973Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M14.4698 14.4698C14.7443 14.1952 15.1791 14.1779 15.4737 14.418L15.5303 14.4698L19.5303 18.4698C19.8232 18.7626 19.8232 19.2374 19.5303 19.5303C19.2374 19.8232 18.7627 19.8232 18.4698 19.5303L14.4698 15.5303L14.418 15.4737C14.1779 15.1791 14.1952 14.7443 14.4698 14.4698Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M8.46976 14.4698C8.76258 14.177 9.2374 14.1771 9.5303 14.4698C9.82317 14.7626 9.82317 15.2374 9.5303 15.5303L5.5303 19.5303L5.47366 19.5821C5.17909 19.8223 4.74435 19.8049 4.46976 19.5303C4.19535 19.2557 4.17774 18.8209 4.418 18.5264L4.46976 18.4698L8.46976 14.4698Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M4.46976 4.46976C4.7443 4.19522 5.17909 4.17785 5.47366 4.418L5.5303 4.46976L9.5303 8.46976C9.8232 8.76265 9.8232 9.23741 9.5303 9.5303C9.23741 9.82319 8.76265 9.82319 8.46976 9.5303L4.46976 5.5303L4.418 5.47366C4.17785 5.17909 4.19522 4.7443 4.46976 4.46976Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 0 : 0.4}
          d="M18.4698 4.46976C18.7626 4.17692 19.2374 4.17704 19.5303 4.46976C19.8232 4.76265 19.8232 5.23741 19.5303 5.5303L15.5303 9.5303L15.4737 9.58206C15.1791 9.82235 14.7444 9.8049 14.4698 9.5303C14.1953 9.25569 14.1777 8.82091 14.418 8.5264L14.4698 8.46976L18.4698 4.46976Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
