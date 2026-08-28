export function Footer() {
  return (
    <footer className="mt-10 mb-8 px-5 text-center">
      <p className="text-xs text-inkSoft">
        No searched EPIC numbers are logged or stored.
      </p>

      <div className="mt-4 flex flex-col items-center gap-2">
        <p className="text-sm font-semibold text-ink">
          Saiyad Patel
        </p>

        <a
          href="https://www.instagram.com/syd_patel"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram profile"
          className="text-inkSoft hover:text-ink transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
