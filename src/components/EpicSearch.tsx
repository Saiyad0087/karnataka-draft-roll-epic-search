import { FormEvent, useState } from "react";

interface EpicSearchProps {
  onSearch: (rawEpic: string) => void;
}

export function EpicSearch({ onSearch }: EpicSearchProps) {
  const [value, setValue] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!value.trim()) {
      setValidationError("Enter your EPIC number to search.");
      return;
    }

    setValidationError(null);
    onSearch(value);
  }

  return (
    <div className="bg-white border border-line rounded-card p-5 sm:p-6 shadow-[0_1px_2px_rgba(27,36,48,0.04)]">
      <form onSubmit={handleSubmit} noValidate>
        <label
          htmlFor="epic-input"
          className="block text-xs font-semibold uppercase tracking-wide text-inkSoft mb-2"
        >
          EPIC Number
        </label>
        <input
          id="epic-input"
          name="epic"
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="Enter EPIC Number"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (validationError) setValidationError(null);
          }}
          aria-invalid={validationError ? true : undefined}
          aria-describedby={validationError ? "epic-error" : undefined}
          className="w-full font-mono text-lg tracking-wider uppercase border border-line rounded-lg px-4 py-3 text-ink placeholder:text-inkSoft/50 placeholder:tracking-normal placeholder:font-body placeholder:text-base focus:border-teal focus:ring-0 transition-colors"
        />

        {validationError && (
          <p id="epic-error" role="alert" className="mt-2 text-sm text-brick">
            {validationError}
          </p>
        )}

        <button
          type="submit"
          className="mt-4 w-full bg-teal hover:bg-teal-dark active:bg-teal-dark text-white font-semibold text-[15px] rounded-lg py-3 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
}
