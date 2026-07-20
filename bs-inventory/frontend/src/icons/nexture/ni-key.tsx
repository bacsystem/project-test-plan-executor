import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiKey({
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
        <circle cx="15" cy="9" r="7" stroke="currentColor" strokeWidth={iconStrokeWidth} />
        <circle
          opacity={oneTone ? 1 : 0.6}
          cx="15.5"
          cy="8.5"
          r="1.5"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M7.62114 13.2304L2.46065 18.391C2.26694 18.5847 2.16239 18.8517 2.17001 19.1332L2.2106 20.6346C2.22646 21.2209 2.71461 21.7091 3.30093 21.7249L5.24202 21.7774L5.68176 21.7893C6.26807 21.8052 6.73052 21.3427 6.71467 20.7564L6.70278 20.3166L6.69089 19.8769C6.67503 19.2906 7.13748 18.8281 7.7238 18.844L8.16353 18.8559L8.60327 18.8678C9.18959 18.8836 9.65204 18.4212 9.63618 17.8349L9.63592 17.8251C9.6285 17.5506 9.73427 17.2852 9.92842 17.091L10.705 16.3143C11.1084 15.9109 11.0902 15.2388 10.6644 14.813L9.89347 14.042L9.12249 13.271C8.6967 12.8452 8.02452 12.827 7.62114 13.2304Z"
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 1.25C19.2802 1.25 22.75 4.71979 22.75 9C22.75 13.2802 19.2802 16.75 15 16.75C10.7198 16.75 7.25 13.2802 7.25 9C7.25 4.71979 10.7198 1.25 15 1.25ZM15.5 6.25C14.2574 6.25 13.25 7.25736 13.25 8.5C13.25 9.74264 14.2574 10.75 15.5 10.75C16.7426 10.75 17.75 9.74264 17.75 8.5C17.75 7.25736 16.7426 6.25 15.5 6.25Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M7.09001 12.7001C7.81282 11.9773 8.96117 12.0491 9.6525 12.7401L11.1945 14.2821C11.8857 14.9733 11.9581 16.1216 11.2355 16.8446L10.4591 17.621C10.4107 17.6694 10.3841 17.736 10.3859 17.8046V17.8143C10.4134 18.8305 9.59927 19.6443 8.58317 19.6171L7.70329 19.5936C7.61818 19.5914 7.55447 19.6224 7.51188 19.6649C7.46929 19.7075 7.43838 19.7711 7.44059 19.8563L7.46403 20.7362C7.49139 21.7523 6.67743 22.5663 5.66129 22.5389L3.28043 22.4745C2.29597 22.4476 1.48674 21.6387 1.46012 20.6542L1.42008 19.1532C1.40878 18.7325 1.54524 18.3215 1.80973 17.995L1.92985 17.8602L7.09001 12.7001Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
