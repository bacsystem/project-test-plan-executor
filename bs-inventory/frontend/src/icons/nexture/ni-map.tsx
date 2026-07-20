import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiMap({
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
          d="M6.43987 3.78006L4.21115 4.89443C2.85601 5.572 2 6.95705 2 8.47214V17.7639C2 19.2507 3.56463 20.2177 4.89443 19.5528L6.43987 18.7801C7.43472 18.2826 8.59176 18.2219 9.63322 18.6125L14.3668 20.3875C15.4082 20.7781 16.5653 20.7174 17.5601 20.2199L19.7889 19.1056C21.144 18.428 22 17.043 22 15.5279V6.23607C22 4.7493 20.4354 3.78231 19.1056 4.44721L17.5601 5.21993C16.5653 5.71736 15.4082 5.77809 14.3668 5.38754L9.63322 3.61246C8.59176 3.22191 7.43472 3.28264 6.43987 3.78006Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path opacity={oneTone ? 1 : 0.6} d="M8 3V18" stroke="currentColor" strokeWidth={iconStrokeWidth} />
        <path opacity={oneTone ? 1 : 0.6} d="M16 5.5V20.5" stroke="currentColor" strokeWidth={iconStrokeWidth} />
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
          d="M18.7705 3.77734C20.5988 2.86343 22.7496 4.19246 22.75 6.23633V15.5283C22.7498 17.3273 21.7331 18.9728 20.124 19.7773L17.8955 20.8916C17.529 21.0748 17.1437 21.2071 16.75 21.29V4.74121C16.9119 4.69011 17.0708 4.62671 17.2246 4.5498L18.7705 3.77734Z"
          fill="currentColor"
        />
        <path d="M13.748 4.35449V20.957L10.252 19.6455V3.04395L13.748 4.35449Z" fill="currentColor" />
        <path
          d="M7.25 19.2578C7.08796 19.3089 6.92939 19.3742 6.77539 19.4512L5.22949 20.2246C3.40129 21.1382 1.25035 19.8084 1.25 17.7646V8.47266C1.25013 6.67368 2.26695 5.0292 3.87598 4.22461L6.10449 3.11035C6.47103 2.92709 6.85623 2.79387 7.25 2.71094V19.2578Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M16.75 21.2894C16.2571 21.3932 15.7508 21.4179 15.25 21.3627V4.848C15.7511 4.92951 16.2648 4.89377 16.75 4.74058V21.2894Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M7.25 2.71031C7.74285 2.60652 8.24924 2.58182 8.75 2.63707V19.1498C8.24908 19.0684 7.73502 19.1051 7.25 19.2582V2.71031Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
