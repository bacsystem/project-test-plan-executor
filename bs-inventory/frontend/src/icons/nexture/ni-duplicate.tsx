import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiDuplicate({
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
          d="M7.36986 21.5616C4.84126 21.1402 2.85979 19.1587 2.43836 16.6301V16.6301C2.14812 14.8887 2.14812 13.1113 2.43836 11.3699V11.3699C2.85979 8.84126 4.84126 6.85979 7.36986 6.43836V6.43836C9.11127 6.14812 10.8887 6.14812 12.6301 6.43836V6.43836C15.1587 6.85979 17.1402 8.84126 17.5616 11.3699V11.3699C17.8519 13.1113 17.8519 14.8887 17.5616 16.6301V16.6301C17.1402 19.1587 15.1587 21.1402 12.6301 21.5616V21.5616C10.8887 21.8519 9.11127 21.8519 7.36986 21.5616V21.5616Z"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          opacity={oneTone ? 1 : 0.6}
          d="M18.0002 15.4507C19.8725 14.8681 21.2877 13.2753 21.6167 11.3016C21.8706 9.7779 21.8706 8.22263 21.6167 6.69889C21.2479 4.48637 19.5141 2.75258 17.3016 2.38383C15.7779 2.12987 14.2226 2.12987 12.6989 2.38383C10.7252 2.71278 9.13243 4.12796 8.5498 6.00024"
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
          d="M7.24687 5.69804C9.06972 5.3943 10.9309 5.39425 12.7537 5.69804C15.5982 6.17229 17.8274 8.40235 18.3016 11.2469C18.6053 13.0697 18.6054 14.9309 18.3016 16.7537C17.8273 19.5981 15.5981 21.8273 12.7537 22.3016C10.9309 22.6054 9.06973 22.6053 7.24687 22.3016C4.40234 21.8274 2.17229 19.5982 1.69804 16.7537C1.39425 14.9309 1.3943 13.0697 1.69804 11.2469C2.17218 8.40223 4.40223 6.17218 7.24687 5.69804Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M12.5752 1.64303C14.1805 1.37549 15.8195 1.37551 17.4248 1.64303C19.9532 2.06443 21.9347 4.04643 22.3564 6.57467C22.624 8.17983 22.6239 9.81911 22.3564 11.4243C22.093 13.0047 21.2184 14.3692 19.9834 15.2749C20.0832 13.849 20.0168 12.4141 19.7812 11.0005C19.2018 7.5242 16.4776 4.7981 13.001 4.21822C11.5868 3.98254 10.151 3.91515 8.72461 4.0151C9.63011 2.78027 10.9951 1.90646 12.5752 1.64303Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
