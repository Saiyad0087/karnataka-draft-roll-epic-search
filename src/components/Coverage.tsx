import { COVERED_PARTS, PART_TO_WARD } from "../config/pdfLinks";
import { TOTAL_RECORDS } from "../utils/searchByEpic";

export function Coverage() {
  return (
    <section
      aria-labelledby="coverage-heading"
      className="mt-8 bg-white border border-line rounded-card p-5 sm:p-6"
    >
      <div className="flex items-baseline justify-between mb-4">
        <h2
          id="coverage-heading"
          className="text-xs font-semibold uppercase tracking-wide text-inkSoft"
        >
          SIR Draft Roll Coverage
        </h2>

        <span className="font-mono text-xs text-inkSoft">
          {COVERED_PARTS.length} Parts • {TOTAL_RECORDS.toLocaleString()} records
        </span>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {COVERED_PARTS.map((part) => (
          <li
            key={part}
            className="flex items-center justify-between rounded-lg bg-paper px-3 py-2 text-sm"
          >
            <span className="text-ink">Part {part}</span>

            <span className="font-mono text-inkSoft">
              Ward {String(PART_TO_WARD[part]).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
