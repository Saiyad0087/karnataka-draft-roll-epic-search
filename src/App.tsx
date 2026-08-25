import { useState } from "react";
import { Header } from "./components/Header";
import { EpicSearch } from "./components/EpicSearch";
import { SearchResult } from "./components/SearchResult";
import { NotFound } from "./components/NotFound";
import { Coverage } from "./components/Coverage";
import { Disclaimer } from "./components/Disclaimer";
import { Footer } from "./components/Footer";
import { searchByEpic } from "./utils/searchByEpic";
import type { SearchResult as SearchResultType } from "./types";

export default function App() {
  const [result, setResult] = useState<SearchResultType | null>(null);

  function handleSearch(rawEpic: string) {
    // Deliberately not logged/persisted anywhere — kept only in transient
    // component state for the duration of this render.
    setResult(searchByEpic(rawEpic));
  }

  return (
    <div className="min-h-screen bg-paper">
      <main className="max-w-xl mx-auto px-5 pb-4">
        <Header />
        <EpicSearch onSearch={handleSearch} />

        {result && (
          <div className="mt-5">
            {result.found ? (
              <SearchResult result={result} />
            ) : (
              <NotFound />
            )}
          </div>
        )}

        <Coverage />
        <Disclaimer />
      </main>
      <Footer />
    </div>
  );
}
