export function Disclaimer() {
  return (
    <section className="mt-6 rounded-card border border-amber/30 bg-amber-light/60 p-5 sm:p-6 text-sm text-ink leading-relaxed">
      <p className="font-semibold">
        Independent community search utility. Not an official Election
        Commission website.
      </p>
      <p className="mt-2 text-inkSoft">
        Always verify your details in the original Draft Electoral Roll.
      </p>
      <p className="mt-2 text-inkSoft">
        This tool only helps locate the Part and Serial Number using an EPIC
        number. The original Draft Electoral Roll remains the source for
        verification.
      </p>
    </section>
  );
}
