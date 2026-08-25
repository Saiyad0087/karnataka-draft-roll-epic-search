# 2026 Draft Roll — EPIC Search

Independent community utility: enter an EPIC number, get back the Part
Number and Serial Number from the verified 5-Part / 4,822-record dataset,
then open the original Draft Electoral Roll PDF to verify.

No personal voter information (name, age, gender, address, etc.) is
stored in the dataset or displayed by this app.

## Project structure

```
src/
  components/
    Header.tsx        Title + tagline
    EpicSearch.tsx     Input field, validation, submit (Enter-to-search)
    SearchResult.tsx   "Voter Found" card: Part/Serial/Ward + PDF link
    NotFound.tsx       "Voter Not Found" message
    Coverage.tsx       Currently-covered Parts/Wards summary
    Disclaimer.tsx     Independence + verification notices
    Footer.tsx
  data/
    epicLookup.json    Verified dataset (SIR_EPIC_LOOKUP.json, unmodified)
  utils/
    searchByEpic.ts    normalizeEpic() + searchByEpic() + in-memory Map
  config/
    pdfLinks.ts         PDF_LINKS, PART_TO_WARD, buildPdfUrl()
  types.ts               EpicRecord / SearchResult types
  App.tsx
  main.tsx
```

## 1. Dataset loading

`src/data/epicLookup.json` is a byte-for-byte copy of the uploaded
`SIR_EPIC_LOOKUP.json` — nothing was added, removed, or renamed. It is
imported at build time (`resolveJsonModule` in `tsconfig.json`) so Vite
bundles it as a static asset; no network request or database is needed
at runtime.

## 2. EPIC lookup

`src/utils/searchByEpic.ts` builds a `Map<epic, record>` **once**, when the
module first loads, from the imported JSON object:

```ts
const epicMap = new Map(Object.entries(epicLookupData));
```

`searchByEpic(rawEpic)`:
1. Normalizes input — `normalizeEpic()` trims whitespace, strips internal
   spaces, uppercases.
2. Does an exact `Map.get()` — O(1), no fuzzy or partial matching, nothing
   is inferred or guessed.
3. Returns a discriminated union: `{ found: true, partNo, serialNo, ward,
   pdfPage, pdfFile, epic }` or `{ found: false }`.

The UI never renders or iterates all 4,822 records — only the single
matched record (if any) is ever touched after a search.

No EPIC number is logged, printed to console, or persisted anywhere
(checked: no `console.log`, `localStorage`, or analytics calls touch the
search value).

## 3. Google Drive PDF links

Configured in one place, `src/config/pdfLinks.ts`, exactly as supplied —
unaltered:

```ts
export const PDF_LINKS = {
  191: "https://drive.google.com/file/d/1GRHGRkL_wc20-2SxDOhtsHINMPUqTdAI/view",
  192: "https://drive.google.com/file/d/1m1E9u5jWml5vj4PpfFWhb_ZHgV3VYGA6/view",
  193: "https://drive.google.com/file/d/1kYO6HHIjtyVrc4Zn1BaV99oAwFbm9poZ/view",
  194: "https://drive.google.com/file/d/1168nbnB0esmg8bxFR3Nr68oMNZW5BekH/view",
  195: "https://drive.google.com/file/d/1BQsyk-SHmKuRSSQsKAHEYAjjn5Rn85L0/view",
};
```

## 4. PDF page navigation — and its limitation

`buildPdfUrl(partNo, pdfPage)` appends `#page=<pdf_page>` to the Drive
"view" URL, e.g. `.../view#page=3`.

**Documented limitation:** Google Drive's own PDF viewer does not
officially guarantee it will jump to that page for every account, browser,
or embed context — it works in most modern desktop/mobile browsers when the
built-in Drive preview is used, but Drive can occasionally ignore the
fragment (e.g. if it opens in a different viewer, or the file is opened via
"Download" instead of preview). Because of this, **the button always still
opens the correct PDF file**; the page jump is best-effort, and the
original PDF — not this page number — remains the source of truth. The
result card also always shows the Part/Serial/Ward so a person can find
their entry by hand if the page anchor doesn't land exactly right.

## 5. Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## 6. Build for production

```bash
npm run build
npm run preview   # optional: serve the production build locally
```

Output goes to `dist/` — a static site with no server-side component.

## 7. Deploy

Because this is a fully static site (no backend, no database), it can be
deployed to any static host, e.g.:

- **Vercel / Netlify**: connect the repo, build command `npm run build`,
  output directory `dist`.
- **GitHub Pages**: run `npm run build`, publish the `dist/` folder (set
  `base` in `vite.config.ts` if served from a subpath).
- Any static file host / CDN / S3 bucket + CloudFront, etc.

## 8. Testing performed

Verified against the real dataset (see also `TESTING.md`):

| # | Case | Result |
|---|------|--------|
| 1 | `SWV5584701` | Part 191, Serial 1, Ward 01 ✅ |
| 2 | `SWV5071196` | Part 191, Serial 50, Ward 01 ✅ |
| 3 | Lowercase input | Matches ✅ |
| 4 | Leading/trailing/internal spaces | Matches ✅ |
| 5 | Invalid EPIC | "Voter Not Found" ✅ |
| 6 | Empty input | Validation message, no search performed ✅ |
| 7 | Enter key | Submits the form (native `<form onSubmit>`) ✅ |
| 8–10 | PDF button per Part | Opens `PDF_LINKS[partNo]#page=pdfPage` ✅ |
| 11–12 | Mobile / desktop | Single-column, max-width container, fluid ✅ |
| 13 | No personal info rendered | Only Part/Serial/Ward ever displayed ✅ |
