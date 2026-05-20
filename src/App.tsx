import type React from "react";
import { useEffect, useState } from "react";
import { ActivityCard } from "./components/activity/ActivityCard";
import { ActivitySheet } from "./components/activity/ActivitySheet";
import { FilterSheet } from "./components/filters/FilterSheet";
import { Header } from "./components/layout/Header";
import { EmptyState } from "./components/ui/EmptyState";
import { useDeepLink } from "./hooks/useDeepLink";
import { useFilters } from "./hooks/useFilters";
import { usePersistence } from "./hooks/usePersistence";
import { doShare } from "./lib/utils";
import type { Activity } from "./types";

export default function App() {
  const { favs, done, toggleFav, toggleDone } = usePersistence();
  const f = useFilters(favs, done);
  const { initialActivity } = useDeepLink();

  const [sel, setSel] = useState<Activity | null>(initialActivity);
  const [surp, setSurp] = useState<Activity | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

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
        pool={poolCount}
        onSurprise={handleSurprise}
        cat={f.cat}
        fCount={f.fCount}
        onOpenFilters={() => setIsFilterSheetOpen(true)}
      />

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
      {isFilterSheetOpen && (
        <FilterSheet
          cat={f.cat}
          setCat={f.setCat}
          drive={f.drive}
          setDrive={f.setDrive}
          effort={f.effort}
          setEffort={f.setEffort}
          budget={f.budget}
          setBudget={f.setBudget}
          dur={f.dur}
          setDur={f.setDur}
          halal={f.halal}
          setHalal={f.setHalal}
          filteredCount={f.filtered.length}
          clearAll={f.clearAll}
          onClose={() => setIsFilterSheetOpen(false)}
        />
      )}
    </>
  );
}
