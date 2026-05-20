import type { View } from "../../types";

export function EmptyState({ view }: { view: View }) {
  return (
    <div className="empty">
      <div className="ei">{view === "favs" ? "❤️" : view === "done" ? "✅" : "🏔️"}</div>
      <div className="et">
        {view === "favs"
          ? "Nothing saved yet"
          : view === "done"
            ? "Nothing ticked off yet"
            : "No matches"}
      </div>
      <div className="es">
        {view === "favs"
          ? "Tap the heart on any card to save it"
          : view === "done"
            ? "Mark activities as done to track your summer"
            : "Try loosening a filter above"}
      </div>
    </div>
  );
}
