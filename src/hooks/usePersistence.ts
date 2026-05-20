import type React from "react";
import { useEffect, useState } from "react";

const store = {
  get: <T>(k: string, fb: T): T => {
    try {
      const v = localStorage.getItem(k);
      return v ? (JSON.parse(v) as T) : fb;
    } catch {
      return fb;
    }
  },
  set: <T>(k: string, v: T) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {
      /* empty */
    }
  },
};

export function usePersistence() {
  const [favs, setFavs] = useState<string[]>(() => store.get<string[]>("sbl-favs", []));
  const [done, setDone] = useState<string[]>(() => store.get<string[]>("sbl-done", []));

  useEffect(() => store.set("sbl-favs", favs), [favs]);
  useEffect(() => store.set("sbl-done", done), [done]);

  const toggleFav = (id: string, e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    setFavs((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };
  const toggleDone = (id: string, e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    setDone((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  return { favs, done, toggleFav, toggleDone };
}
