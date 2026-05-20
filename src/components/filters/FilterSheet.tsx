import type React from "react";
import { useRef } from "react";
import { LuCar, LuClock, LuFootprints, LuWallet } from "react-icons/lu";
import { BUDGET_O, CATS, DRIVE_O, DUR_O, EFFORT_O } from "../../lib/constants";
import type { BudgetId, CatOrAll, DriveId, DurId, EffortOrAny } from "../../types";
import { FilterRow } from "./FilterRow";
import { HalalToggle } from "./HalalToggle";

interface FilterSheetProps {
  cat: CatOrAll;
  setCat: (c: CatOrAll) => void;
  drive: DriveId;
  setDrive: (d: DriveId) => void;
  effort: EffortOrAny;
  setEffort: (e: EffortOrAny) => void;
  budget: BudgetId;
  setBudget: (b: BudgetId) => void;
  dur: DurId;
  setDur: (d: DurId) => void;
  halal: boolean;
  setHalal: (h: boolean) => void;
  filteredCount: number;
  clearAll: () => void;
  onClose: () => void;
}

export function FilterSheet({
  cat,
  setCat,
  drive,
  setDrive,
  effort,
  setEffort,
  budget,
  setBudget,
  dur,
  setDur,
  halal,
  setHalal,
  filteredCount,
  clearAll,
  onClose,
}: FilterSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const swipeEligible = useRef(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
    const rect = sheetRef.current?.getBoundingClientRect();
    if (rect) {
      swipeEligible.current =
        e.touches[0].clientY >= rect.top && e.touches[0].clientY <= rect.top + rect.height * 0.2;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.changedTouches[0].clientY - touchStartY.current > 60 && swipeEligible.current) {
      onClose();
    }
  };

  return (
    <div
      className="ov"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="sh" ref={sheetRef} onClick={(e) => e.stopPropagation()}>
        <div className="sh-hdl" />
        <div className="sh-body">
          <div className="filter-sheet-section">
            <span className="sh-nlbl">Category</span>
            <div className="filter-sheet-cats">
              {CATS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`cat${cat === c.id ? " on" : ""}`}
                  onClick={() => setCat(c.id)}
                >
                  {c.e} {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-sheet-divider" />

          <div className="filter-sheet-section">
            <span className="sh-nlbl">Filters</span>
            <FilterRow
              label={
                <>
                  <LuCar size={12} /> Drive
                </>
              }
              options={DRIVE_O}
              value={drive}
              onChange={setDrive}
            />
            <FilterRow
              label={
                <>
                  <LuFootprints size={12} /> Effort
                </>
              }
              options={EFFORT_O}
              value={effort}
              onChange={setEffort}
            />
            <FilterRow
              label={
                <>
                  <LuWallet size={12} /> Budget
                </>
              }
              options={BUDGET_O}
              value={budget}
              onChange={setBudget}
            />
            <FilterRow
              label={
                <>
                  <LuClock size={12} /> Time
                </>
              }
              options={DUR_O}
              value={dur}
              onChange={setDur}
            />
            <HalalToggle value={halal} onChange={setHalal} />
          </div>
        </div>

        <div className="filter-sheet-footer">
          <button
            type="button"
            className="filter-clear-btn"
            onClick={() => {
              clearAll();
              onClose();
            }}
          >
            Clear all
          </button>
          <button type="button" className="filter-show-btn" onClick={onClose}>
            Show {filteredCount} {filteredCount === 1 ? "activity" : "activities"}
          </button>
        </div>
      </div>
    </div>
  );
}
