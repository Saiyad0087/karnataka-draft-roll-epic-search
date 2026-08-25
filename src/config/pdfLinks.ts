// Source of truth for original Draft Electoral Roll PDF locations.
// These links were supplied directly and must not be altered or replaced.
export const PDF_LINKS: Record<number, string> = {
  191: "https://drive.google.com/file/d/1GRHGRkL_wc20-2SxDOhtsHINMPUqTdAI/view",
  192: "https://drive.google.com/file/d/1m1E9u5jWml5vj4PpfFWhb_ZHgV3VYGA6/view",
  193: "https://drive.google.com/file/d/1kYO6HHIjtyVrc4Zn1BaV99oAwFbm9poZ/view",
  194: "https://drive.google.com/file/d/1168nbnB0esmg8bxFR3Nr68oMNZW5BekH/view",
  195: "https://drive.google.com/file/d/1BQsyk-SHmKuRSSQsKAHEYAjjn5Rn85L0/view"
};

// Part Number -> Ward Number, per the confirmed mapping.
export const PART_TO_WARD: Record<number, number> = {
  191: 1,
  192: 2,
  193: 3,
  194: 4,
  195: 5
};

export const COVERED_PARTS = [191, 192, 193, 194, 195] as const;

/**
 * Builds the URL to open a specific page of a Drive-hosted PDF.
 * Google Drive's "view" page does not officially guarantee it will honor a
 * #page= fragment for every file/viewer combination, so this is a best-effort
 * deep link. The PDF itself remains the source of truth — see README for
 * the documented limitation.
 */
export function buildPdfUrl(partNo: number, pdfPage: number): string | null {
  const base = PDF_LINKS[partNo];
  if (!base) return null;
  return `${base}#page=${pdfPage}`;
}
