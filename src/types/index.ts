export type Cat = "hike" | "city" | "nature" | "bigday" | "chill";
export type Effort = "chill" | "light" | "moderate" | "hard" | "very-hard";
export type Cost = 1 | 2 | 3 | 4;
export type Engagement = 1 | 2 | 3 | 4 | 5;
export type View = "browse" | "favs" | "done";

export type CatOrAll = Cat | "all";
export type EffortOrAny = Effort | "any";
export type DriveId = "any" | "20" | "45" | "60" | "90" | "120";
export type BudgetId = "any" | "1" | "2" | "3";
export type DurId = "any" | "short" | "half" | "long" | "full";

export interface Activity {
  id: string;
  name: string;
  category: Cat;
  subcategory: string;
  drive: number;
  durationMin: number;
  durationMax: number;
  effort: Effort;
  cost: Cost;
  engagement: Engagement;
  location: string;
  halal: boolean;
  desc: string;
  notes?: string;
}

export interface FilterState {
  cat: CatOrAll;
  drive: DriveId;
  effort: EffortOrAny;
  budget: BudgetId;
  dur: DurId;
  halal: boolean;
}
