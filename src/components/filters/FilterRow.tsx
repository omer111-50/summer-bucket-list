import type { ReactNode } from "react";

interface Option {
  id: string;
  label: string;
}

interface FilterRowProps<T extends string> {
  label: ReactNode;
  options: readonly (Option & { id: T })[];
  value: T;
  onChange: (id: T) => void;
}

export function FilterRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: FilterRowProps<T>) {
  return (
    <div className="frow">
      <span className="flbl">{label}</span>
      {options.map((o) => (
        <button
          key={o.id}
          className={`fc${value === o.id ? " on" : ""}`}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
