import { useMemo, useState } from "react";
import { ACTIVITIES } from "../lib/activities";
import { DRIVE_O } from "../lib/constants";
import type { Activity, BudgetId, CatOrAll, DriveId, DurId, EffortOrAny, View } from "../types";

export function useFilters(favs: string[], done: string[]) {
  const [view, setView] = useState<View>("browse");
  const [cat, setCat] = useState<CatOrAll>("all");
  const [drive, setDrive] = useState<DriveId>("any");
  const [effort, setEffort] = useState<EffortOrAny>("any");
  const [budget, setBudget] = useState<BudgetId>("any");
  const [dur, setDur] = useState<DurId>("any");
  const [halal, setHalal] = useState(false);

  const driveMax = DRIVE_O.find((d) => d.id === drive)?.mx ?? 999;

  const filtered = useMemo<Activity[]>(() => {
    let L: Activity[] = [...ACTIVITIES];
    if (view === "favs") L = L.filter((a) => favs.includes(a.id));
    if (view === "done") L = L.filter((a) => done.includes(a.id));
    if (cat !== "all") L = L.filter((a) => a.category === cat);
    if (drive !== "any") L = L.filter((a) => a.drive <= driveMax);
    if (effort !== "any") L = L.filter((a) => a.effort === effort);
    if (budget !== "any") L = L.filter((a) => a.cost <= parseInt(budget));
    if (dur === "short") L = L.filter((a) => a.durationMax <= 2);
    else if (dur === "half") L = L.filter((a) => a.durationMax > 2 && a.durationMax <= 4);
    else if (dur === "long") L = L.filter((a) => a.durationMax > 4 && a.durationMax <= 6);
    else if (dur === "full") L = L.filter((a) => a.durationMax >= 6);
    if (halal) L = L.filter((a) => a.halal);
    return L;
  }, [view, cat, drive, effort, budget, dur, halal, favs, done, driveMax]);

  const fCount = [
    cat !== "all",
    drive !== "any",
    effort !== "any",
    budget !== "any",
    dur !== "any",
    halal,
  ].filter(Boolean).length;

  const clearAll = () => {
    setCat("all");
    setDrive("any");
    setEffort("any");
    setBudget("any");
    setDur("any");
    setHalal(false);
  };

  return {
    view,
    setView,
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
    filtered,
    fCount,
    clearAll,
  };
}
