import type { BudgetId, Cat, CatOrAll, Cost, DriveId, DurId, Effort, EffortOrAny } from "../types";

export const CATS: ReadonlyArray<{ id: CatOrAll; label: string; e: string }> = [
  { id: "all", label: "All", e: "🗺️" },
  { id: "hike", label: "Hikes", e: "⛰️" },
  { id: "city", label: "City Trips", e: "🏙️" },
  { id: "nature", label: "Nature", e: "🌿" },
  { id: "bigday", label: "Big Days", e: "🎢" },
  { id: "chill", label: "Chill", e: "😌" },
];

export const CAT_CLR: Record<Cat, string> = {
  hike: "#22d3ee",
  city: "#a78bfa",
  nature: "#4ade80",
  bigday: "#f97316",
  chill: "#fb7185",
};

export const EFF_CLR: Record<Effort, string> = {
  chill: "#4ade80",
  light: "#86efac",
  moderate: "#fbbf24",
  hard: "#f97316",
  "very-hard": "#f87171",
};

export const COST_LBL: Record<Cost, string> = {
  1: "Free / £",
  2: "££",
  3: "£££",
  4: "££££",
};

export const EFF_LBL: Record<Effort, string> = {
  chill: "Easy",
  light: "Light",
  moderate: "Moderate",
  hard: "Hard",
  "very-hard": "Very Hard",
};

export const DRIVE_O: ReadonlyArray<{ id: DriveId; label: string; mx: number }> = [
  { id: "any", label: "Any", mx: 999 },
  { id: "20", label: "≤20 min", mx: 20 },
  { id: "45", label: "≤45 min", mx: 45 },
  { id: "60", label: "≤1 hr", mx: 60 },
  { id: "90", label: "≤1.5 hrs", mx: 90 },
  { id: "120", label: "≤2 hrs", mx: 120 },
];

export const EFFORT_O: ReadonlyArray<{ id: EffortOrAny; label: string }> = [
  { id: "any", label: "Any" },
  { id: "chill", label: "Easy 🌿" },
  { id: "light", label: "Light 🚶" },
  { id: "moderate", label: "Moderate 🥾" },
  { id: "hard", label: "Hard 💪" },
  { id: "very-hard", label: "Very Hard 🔥" },
];

export const BUDGET_O: ReadonlyArray<{ id: BudgetId; label: string }> = [
  { id: "any", label: "Any" },
  { id: "1", label: "Free / £" },
  { id: "2", label: "Up to ££" },
  { id: "3", label: "Up to £££" },
];

export const DUR_O: ReadonlyArray<{ id: DurId; label: string }> = [
  { id: "any", label: "Any" },
  { id: "short", label: "<2 hrs" },
  { id: "half", label: "2–4 hrs" },
  { id: "long", label: "4–6 hrs" },
  { id: "full", label: "6+ hrs" },
];
