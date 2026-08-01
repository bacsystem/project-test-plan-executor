import { cn } from "@/lib/utils";

function CheckboxSmallEmpty({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("contained", className)}
    >
      <rect width="18" height="18" rx="6" fill="currentColor" />
    </svg>
  );
}

function CheckboxSmallEmptyOutlined({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("outlined", className)}
    >
      <rect x="0.5" y="0.5" width="17" height="17" rx="5.5" stroke="currentColor" />
    </svg>
  );
}

function CheckboxSmallChecked({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("contained", className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 0C2.68629 0 0 2.68628 0 6V12C0 15.3137 2.68629 18 6 18H12C15.3137 18 18 15.3137 18 12V6C18 2.68628 15.3137 0 12 0H6ZM8.38373 12.6768L14.5303 6.53033C14.8232 6.23743 14.8232 5.76257 14.5303 5.46967C14.2374 5.17676 13.7626 5.17676 13.4697 5.46967L7.49986 11.4394L5.03035 8.96967C4.73747 8.67676 4.26259 8.67676 3.9697 8.96967C3.67679 9.26251 3.67677 9.73743 3.96965 10.0303L6.61594 12.6768C7.10408 13.165 7.89555 13.165 8.38373 12.6768Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckboxSmallIndeterminate({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("contained", className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 0C2.68629 0 0 2.68629 0 6V12C0 15.3137 2.68629 18 6 18H12C15.3137 18 18 15.3137 18 12V6C18 2.68629 15.3137 0 12 0H6ZM12 9.75C12.4142 9.75 12.75 9.41421 12.75 9C12.75 8.58579 12.4142 8.25 12 8.25H6C5.58579 8.25 5.25 8.58579 5.25 9C5.25 9.41421 5.58579 9.75 6 9.75H12Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckboxMediumEmpty({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("outlined", className)}
    >
      <rect width="22" height="22" rx="8" fill="currentColor" />
    </svg>
  );
}

function CheckboxMediumEmptyOutlined({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("outlined", className)}
    >
      <rect x="0.5" y="0.5" width="21" height="21" rx="7.5" stroke="currentColor" />
    </svg>
  );
}

function CheckboxMediumChecked({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("contained", className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.58173 0 0 3.58173 0 8V14C0 18.4183 3.58173 22 8 22H14C18.4183 22 22 18.4183 22 14V8C22 3.58173 18.4183 0 14 0H8ZM9.97212 14.7653L16.1187 8.61871C16.4604 8.27704 16.4604 7.72302 16.1187 7.38129C15.777 7.03955 15.223 7.03955 14.8813 7.38129L8.99986 13.2626L6.61874 10.8813C6.27705 10.5396 5.72302 10.5396 5.3813 10.8813C5.03958 11.223 5.03957 11.777 5.38126 12.1187L8.02754 14.7652C8.5645 15.3022 9.43513 15.3022 9.97212 14.7653Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckboxMediumIndeterminate({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("contained", className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.58172 0 0 3.58172 0 8V14C0 18.4183 3.58172 22 8 22H14C18.4183 22 22 18.4183 22 14V8C22 3.58172 18.4183 0 14 0H8ZM14 11.875C14.4832 11.875 14.875 11.4832 14.875 11C14.875 10.5168 14.4832 10.125 14 10.125H8C7.51675 10.125 7.125 10.5168 7.125 11C7.125 11.4832 7.51675 11.875 8 11.875H14Z"
        fill="currentColor"
      />
    </svg>
  );
}

export {
  CheckboxSmallEmpty,
  CheckboxSmallEmptyOutlined,
  CheckboxSmallChecked,
  CheckboxSmallIndeterminate,
  CheckboxMediumEmpty,
  CheckboxMediumEmptyOutlined,
  CheckboxMediumChecked,
  CheckboxMediumIndeterminate,
};
