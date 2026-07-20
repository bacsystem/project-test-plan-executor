import { cn } from "@/lib/utils";

function RadiobuttonSmallEmpty({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("contained", className)}
    >
      <rect width="18" height="18" rx="9" fill="currentColor" />
    </svg>
  );
}

function RadiobuttonSmallEmptyOutlined({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("outlined", className)}
    >
      <rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="currentColor" />
    </svg>
  );
}

function RadiobuttonSmallChecked({ className }: { className?: string }) {
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
        d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM9 14C11.7614 14 14 11.7614 14 9C14 6.23858 11.7614 4 9 4C6.23858 4 4 6.23858 4 9C4 11.7614 6.23858 14 9 14Z"
        fill="currentColor"
      />
    </svg>
  );
}

function RadiobuttonMediumEmpty({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("contained", className)}
    >
      <rect width="22" height="22" rx="11" fill="currentColor" />
    </svg>
  );
}

function RadiobuttonMediumEmptyOutlined({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("outlined", className)}
    >
      <rect x="0.5" y="0.5" width="21" height="21" rx="10.5" stroke="currentColor" />
    </svg>
  );
}

function RadiobuttonMediumChecked({ className }: { className?: string }) {
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
        d="M11 22C17.0751 22 22 17.0751 22 11C22 4.92493 17.0751 0 11 0C4.92487 0 0 4.92493 0 11C0 17.0751 4.92487 22 11 22ZM11 18C14.866 18 18 14.866 18 11C18 7.13403 14.866 4 11 4C7.134 4 4 7.13403 4 11C4 14.866 7.134 18 11 18Z"
        fill="currentColor"
      />
    </svg>
  );
}

export {
  RadiobuttonSmallEmpty,
  RadiobuttonSmallEmptyOutlined,
  RadiobuttonSmallChecked,
  RadiobuttonMediumEmpty,
  RadiobuttonMediumEmptyOutlined,
  RadiobuttonMediumChecked,
};
