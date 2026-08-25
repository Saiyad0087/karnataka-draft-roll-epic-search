import { buildPdfUrl } from "../config/pdfLinks";
import type { SearchResult as SearchResultType } from "../types";

interface SearchResultProps {
  result: Extract<SearchResultType, { found: true }>;
}

export function SearchResult({ result }: SearchResultProps) {
  const pdfUrl = buildPdfUrl(result.partNo, result.pdfPage);
  const wardLabel = String(result.ward).padStart(2, "0");

  return (
    <div
      role="status"
      className="animate-fade-up relative flex bg-white border border-teal/30 rounded-card overflow-hidden shadow-[0_2px_8px_rgba(14,110,92,0.08)]"
    >
      {/* Main details */}
      <div className="flex-1 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <span
            aria-hidden="true"
            className="flex items-center justify-center w-5 h-5 rounded-full bg-teal text-white text-[11px] leading-none"
          >
            ✓
          </span>
          <span className="text-teal font-semibold text-sm tracking-wide">
            Voter Found
          </span>
        </div>

        <dl className="space-y-3">
          <div className="flex items-baseline justify-between">
            <dt className="text-xs uppercase tracking-wide text-inkSoft">
              Part No.
            </dt>
            <dd className="font-mono text-xl font-semibold text-ink">
              {result.partNo}
            </dd>
          </div>
          <div className="flex items-baseline justify-between">
            <dt className="text-xs uppercase tracking-wide text-inkSoft">
              Serial No.
            </dt>
            <dd className="font-mono text-xl font-semibold text-ink">
              {result.serialNo}
            </dd>
          </div>
          <div className="flex items-baseline justify-between">
            <dt className="text-xs uppercase tracking-wide text-inkSoft">
              Ward
            </dt>
            <dd className="font-mono text-xl font-semibold text-ink">
              {wardLabel}
            </dd>
          </div>
        </dl>

        <p className="mt-5 text-sm text-inkSoft leading-relaxed">
          Please verify your details in the official Draft Electoral Roll.
        </p>

        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-ink hover:bg-ink/90 text-white font-semibold text-[15px] rounded-lg py-3 transition-colors"
          >
            Open Original Draft Roll
          </a>
        )}
      </div>

      {/* Perforated stub tab, styled after a physical EPIC card */}
      <div className="relative w-16 sm:w-20 shrink-0 bg-teal-light flex flex-col items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 border-l-2 border-dashed border-white"
        />
        <span className="font-mono text-[10px] uppercase tracking-wider text-teal-dark/70 rotate-180 [writing-mode:vertical-rl] mb-2">
          Ward
        </span>
        <span className="font-mono text-2xl font-semibold text-teal-dark">
          {wardLabel}
        </span>
      </div>
    </div>
  );
}
