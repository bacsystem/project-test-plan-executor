import { NextureIconsProps, sizeHelper, strokeSizeHelper } from "../nexture-icons";

export default function NiBookmark({
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
          opacity={oneTone ? 1 : 0.6}
          d="M12.4 2L12.9115 9.67222C12.9422 10.1329 12.3855 10.3855 12.059 10.059L10.3536 8.35355C10.1583 8.15829 9.84171 8.15829 9.64645 8.35355L7.93507 10.0649C7.60933 10.3907 7.05375 10.14 7.08249 9.68019L7.5 3"
          stroke="currentColor"
          strokeWidth={iconStrokeWidth}
        />
        <path
          d="M3.36984 8.67144C3.73938 5.34558 6.39015 2.70123 9.71063 2.28617V2.28617C11.2181 2.09774 12.7819 2.09774 14.2894 2.28617V2.28617C17.6099 2.70123 20.2606 5.34558 20.6302 8.67144V8.67144C20.876 10.8837 20.876 13.1163 20.6302 15.3286V15.3286C20.2606 18.6544 17.6099 21.2988 14.2894 21.7138V21.7138C12.7819 21.9023 11.2181 21.9023 9.71063 21.7138V21.7138C6.39015 21.2988 3.73938 18.6544 3.36984 15.3286V15.3286C3.12404 13.1163 3.12404 10.8837 3.36984 8.67144V8.67144Z"
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
          d="M13.1127 1.42773C13.5385 1.45213 13.9626 1.48954 14.3823 1.54199C18.0405 1.99953 20.9666 4.91175 21.3754 8.58789C21.6273 10.855 21.6273 13.1441 21.3754 15.4111C20.9668 19.0875 18.0407 22.0005 14.3823 22.458C12.8132 22.6541 11.1857 22.6541 9.61664 22.458C5.95844 22.0003 3.03212 19.0873 2.62347 15.4111C2.3716 13.1441 2.3716 10.8549 2.62347 8.58789C2.91878 5.9319 4.52852 3.67492 6.77875 2.4541L6.7514 2.95215L6.33343 9.63281C6.26193 10.7819 7.65101 11.4089 8.46527 10.5947L9.99945 9.05957L11.5278 10.5889C12.3185 11.3795 13.6501 10.811 13.6625 9.72754L13.6596 9.62109L13.1127 1.42773Z"
          fill="currentColor"
        />
        <path
          opacity={oneTone ? 1 : 0.4}
          d="M11.6509 2.0459L12.1187 9.05469L10.8833 7.82129C10.3951 7.33355 9.60375 7.33331 9.11572 7.82129L7.87256 9.06348L8.24854 3.04492L8.31592 1.81445C8.73651 1.68895 9.17117 1.59676 9.6167 1.54102C10.2734 1.45893 10.9403 1.41181 11.6089 1.39844L11.6509 2.0459Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
