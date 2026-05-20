import { LuChevronDown, LuSlidersHorizontal } from "react-icons/lu";
import type { CatOrAll } from "../../types";
import { catInfo } from "../../lib/utils";

interface FilterBarProps {
  cat: CatOrAll;
  fCount: number;
  onOpen: () => void;
}

export function FilterBar({ cat, fCount, onOpen }: FilterBarProps) {
  const meta = catInfo(cat);
  const catText = cat === "all" ? "All Categories" : `${meta.e} ${meta.label}`;
  const filterText = fCount === 0 ? "No filters" : `${fCount} filter${fCount === 1 ? "" : "s"}`;
  const isActive = fCount > 0;

  return (
    <button
      type="button"
      className={`filter-bar-btn${isActive ? " is-active" : ""}`}
      onClick={onOpen}
    >
      <span className="filter-bar-text">
        <LuSlidersHorizontal size={14} />
        {catText} · {filterText}
      </span>
      <LuChevronDown size={16} />
    </button>
  );
}
