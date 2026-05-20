import type React from "react";
import type { Activity, CatOrAll } from "../types";
import { CATS } from "./constants";

export const catInfo = (id: CatOrAll) => CATS.find((c) => c.id === id) ?? CATS[0];

export const durStr = (a: Pick<Activity, "durationMin" | "durationMax">) =>
  a.durationMin === a.durationMax ? `${a.durationMin}h` : `${a.durationMin}–${a.durationMax}h`;

export const doShare = async (a: Activity, e?: React.SyntheticEvent): Promise<boolean> => {
  e?.stopPropagation();
  const url = `${window.location.origin}${window.location.pathname}?id=${a.id}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: a.name, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
    return true;
  } catch {
    return false;
  }
};
