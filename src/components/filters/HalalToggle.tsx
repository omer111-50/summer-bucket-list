import { LuUtensils } from "react-icons/lu";

interface HalalToggleProps {
  value: boolean;
  onChange: (v: boolean) => void;
}

export function HalalToggle({ value, onChange }: HalalToggleProps) {
  return (
    <div className="frow">
      <span className="flbl">
        <LuUtensils size={12} /> Food
      </span>
      <button className={`fc${value ? " on" : ""}`} onClick={() => onChange(!value)}>
        Halal nearby
      </button>
    </div>
  );
}
