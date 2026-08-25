export function NotFound() {
  return (
    <div
      role="status"
      className="animate-fade-up bg-white border border-brick/30 rounded-card p-5 sm:p-6 shadow-[0_2px_8px_rgba(162,59,59,0.06)]"
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          aria-hidden="true"
          className="flex items-center justify-center w-5 h-5 rounded-full bg-brick text-white text-[11px] leading-none"
        >
          ✕
        </span>
        <span className="text-brick font-semibold text-sm tracking-wide">
          Voter Not Found
        </span>
      </div>

      <p className="text-[15px] text-ink leading-relaxed">
        This EPIC number was not found in the 5 covered Parts.
      </p>
      <p className="mt-2 text-sm text-inkSoft leading-relaxed">
        Please check the EPIC number and try again. The search currently
        covers Parts 191–195 only.
      </p>
    </div>
  );
}
