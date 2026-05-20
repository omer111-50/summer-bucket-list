import { useState } from "react";
import { ACTIVITIES } from "../lib/activities";
import type { Activity } from "../types";

export function useDeepLink() {
  const [initialActivity] = useState<Activity | null>(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    return id ? (ACTIVITIES.find((a) => a.id === id) ?? null) : null;
  });
  return { initialActivity };
}
