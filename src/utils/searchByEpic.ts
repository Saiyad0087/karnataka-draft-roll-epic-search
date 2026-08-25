import epicLookupRaw from "../data/epicLookup.json";
import type { EpicLookupTable, SearchResult } from "../types";

const epicLookupData = epicLookupRaw as unknown as EpicLookupTable;

// Built once, at module load, from the verified JSON dataset. Object property
// lookup on the parsed JSON would already be O(1), but we materialize an
// explicit Map (per spec) so the lookup strategy is independent of how the
// data happens to be shaped on disk, and so the UI never iterates the
// 4,822 records to render anything.
const epicMap: Map<string, EpicLookupTable[string]> = new Map(
  Object.entries(epicLookupData)
);

export const TOTAL_RECORDS = epicMap.size;

/**
 * Normalizes raw user input into a canonical EPIC string:
 * - trims leading/trailing whitespace
 * - removes internal spaces (accidental spaces while typing/pasting)
 * - uppercases (EPIC numbers are case-insensitive in practice)
 */
export function normalizeEpic(raw: string): string {
  return raw.trim().replace(/\s+/g, "").toUpperCase();
}

/**
 * Exact-match EPIC lookup against the in-memory Map.
 * No fuzzy matching, no partial matching, no guessing.
 */
export function searchByEpic(rawEpic: string): SearchResult {
  const epic = normalizeEpic(rawEpic);

  if (!epic) {
    return { found: false };
  }

  const record = epicMap.get(epic);

  if (!record) {
    return { found: false };
  }

  return {
    found: true,
    epic,
    partNo: record.part_no,
    serialNo: record.serial_no,
    ward: record.ward,
    pdfPage: record.pdf_page,
    pdfFile: record.pdf_file
  };
}
