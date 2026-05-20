import { CATS } from "../../lib/constants";
import type { CatOrAll } from "../../types";

interface CategoryChipsProps {
  value: CatOrAll;
  onChange: (c: CatOrAll) => void;
}

export function CategoryChips({ value, onChange }: CategoryChipsProps) {
  return (
    <div className="cats">
      {CATS.map((c) => (
        <button
          key={c.id}
          className={`cat${value === c.id ? " on" : ""}`}
          onClick={() => onChange(c.id)}
        >
          {c.e} {c.label}
        </button>
      ))}
    </div>
  );
}
