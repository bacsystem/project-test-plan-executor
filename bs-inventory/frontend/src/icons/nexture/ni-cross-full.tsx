import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiCrossFull({ className, variant = "outlined", size = "medium" }: NextureIconsProps) {
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
          d="M4.5003 4.50024L12 12M12 12L19.5 19.5M12 12L19.4997 4.50024M12 12L4.5 19.5"
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
          d="M18.9696 3.97008C19.2625 3.67734 19.7373 3.67724 20.0302 3.97008C20.3229 4.26294 20.3229 4.73777 20.0302 5.03063L13.0604 12.0004L20.0302 18.9701L20.0819 19.0267C20.3221 19.3213 20.3047 19.7561 20.0302 20.0306C19.7556 20.3051 19.3208 20.3226 19.0263 20.0824L18.9696 20.0306L11.9999 13.0609L5.03016 20.0306C4.7373 20.3234 4.26248 20.3234 3.96962 20.0306C3.67676 19.7378 3.67683 19.263 3.96962 18.9701L10.9393 12.0004L3.96962 5.03063L3.91883 4.97399C3.67829 4.67946 3.69505 4.2448 3.96962 3.97008C4.26246 3.67724 4.73726 3.67734 5.03016 3.97008L11.9999 10.9398L18.9696 3.97008Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
