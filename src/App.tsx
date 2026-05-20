import type React from "react";
import { useEffect, useState } from "react";
import { LuCar, LuClock, LuFootprints, LuWallet } from "react-icons/lu";
import { ActivityCard } from "./components/activity/ActivityCard";
import { ActivitySheet } from "./components/activity/ActivitySheet";
import { FilterRow } from "./components/filters/FilterRow";
import { HalalToggle } from "./components/filters/HalalToggle";
import { Header } from "./components/layout/Header";
import { EmptyState } from "./components/ui/EmptyState";
import { useDeepLink } from "./hooks/useDeepLink";
import { useFilters } from "./hooks/useFilters";
import { usePersistence } from "./hooks/usePersistence";
import { ACTIVITIES } from "./lib/activities";
import { BUDGET_O, DRIVE_O, DUR_O, EFFORT_O } from "./lib/constants";
import { doShare } from "./lib/utils";
import type { Activity } from "./types";

export default function App() {
  const { favs, done, toggleFav, toggleDone } = usePersistence();
  const f = useFilters(favs, done);
  const { initialActivity } = useDeepLink();

  const [sel, setSel] = useState<Activity | null>(initialActivity);
  const [surp, setSurp] = useState<Activity | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    document.title = "The Summer Bucket List";
  }, []);

  const handleShare = async (a: Activity, e?: React.SyntheticEvent) => {
    if (await doShare(a, e)) {
      setCopied(a.id);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const handleSurprise = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    const pool = f.filtered.filter((a) => !done.includes(a.id));
    if (!pool.length) return;
    setSurp(pool[Math.floor(Math.random() * pool.length)]);
  };

  const poolCount = f.filtered.filter((a) => !done.includes(a.id)).length;

  return (
    <>
      <Header
        filteredCount={f.filtered.length}
        view={f.view}
        setView={f.setView}
        favsCount={favs.length}
        doneCount={done.length}
        cat={f.cat}
        setCat={f.setCat}
        pool={poolCount}
        onSurprise={handleSurprise}
      />

      <section className="filters" aria-label="Filter options">
        <FilterRow
          label={
            <>
              <LuCar size={12} /> Drive
            </>
          }
          options={DRIVE_O}
          value={f.drive}
          onChange={f.setDrive}
        />
        <FilterRow
          label={
            <>
              <LuFootprints size={12} /> Effort
            </>
          }
          options={EFFORT_O}
          value={f.effort}
          onChange={f.setEffort}
        />
        <FilterRow
          label={
            <>
              <LuWallet size={12} /> Budget
            </>
          }
          options={BUDGET_O}
          value={f.budget}
          onChange={f.setBudget}
        />
        <FilterRow
          label={
            <>
              <LuClock size={12} /> Time
            </>
          }
          options={DUR_O}
          value={f.dur}
          onChange={f.setDur}
        />
        <HalalToggle value={f.halal} onChange={f.setHalal} />
      </section>

      {f.fCount > 0 && (
        <div className="fmeta">
          <span className="fmeta-txt">
            Showing {f.filtered.length} of {ACTIVITIES.length}
          </span>
          <button className="clr" onClick={f.clearAll}>
            Clear {f.fCount} filter{f.fCount !== 1 ? "s" : ""}
          </button>
        </div>
      )}

      <main className="cards">
        {f.filtered.length === 0 ? (
          <EmptyState view={f.view} />
        ) : (
          f.filtered.map((a, i) => (
            <ActivityCard
              key={a.id}
              a={a}
              index={i}
              isFav={favs.includes(a.id)}
              isDone={done.includes(a.id)}
              copied={copied}
              onOpen={setSel}
              onToggleFav={toggleFav}
              onToggleDone={toggleDone}
              onShare={handleShare}
            />
          ))
        )}
      </main>

      {sel && (
        <ActivitySheet
          a={sel}
          isSurprise={false}
          isFav={favs.includes(sel.id)}
          isDone={done.includes(sel.id)}
          copied={copied}
          onClose={() => setSel(null)}
          onToggleFav={toggleFav}
          onToggleDone={toggleDone}
          onReroll={handleSurprise}
          onShare={handleShare}
        />
      )}
      {surp && (
        <ActivitySheet
          a={surp}
          isSurprise={true}
          isFav={favs.includes(surp.id)}
          isDone={done.includes(surp.id)}
          copied={copied}
          onClose={() => setSurp(null)}
          onToggleFav={toggleFav}
          onToggleDone={toggleDone}
          onReroll={handleSurprise}
          onShare={handleShare}
        />
      )}
    </>
  );
}
