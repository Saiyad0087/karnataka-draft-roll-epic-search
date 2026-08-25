// Shape of each entry in src/data/epicLookup.json (the verified source-of-truth dataset).
export interface EpicRecord {
  part_no: number;
  serial_no: number;
  ward: number;
  pdf_page: number;
  pdf_file: string;
}

export type EpicLookupTable = Record<string, EpicRecord>;

// Result of a search — discriminated union so consumers must check `found`.
export type SearchResult =
  | {
      found: true;
      epic: string;
      partNo: number;
      serialNo: number;
      ward: number;
      pdfPage: number;
      pdfFile: string;
    }
  | {
      found: false;
    };
