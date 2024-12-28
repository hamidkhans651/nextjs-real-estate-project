export function LoaderIcon({ className = "" }: { className?: string }) {
    return (
      <svg
        className={`w-5 h-5 text-white ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l1.086-.326A4 4 0 014 12H0c0 2.21.895 4.21 2.343 5.657l1.414-1.414a8.012 8.012 0 01-.757-4.376zm6 5.292v-4c1.657 0 3-1.343 3-3h4a8.001 8.001 0 01-7 7zm0-4a4 4 0 004-4h4c0 2.21-.895 4.21-2.343 5.657l-1.414-1.414a8.012 8.012 0 01-.757-4.376z"
        />
      </svg>
    );
  }
  