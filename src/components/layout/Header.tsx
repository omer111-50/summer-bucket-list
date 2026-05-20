import type React from "react";
import { LuCheck, LuHeart, LuMap, LuShuffle } from "react-icons/lu";
import { CategoryChips } from "../filters/CategoryChips";
import type { CatOrAll, View } from "../../types";

interface HeaderProps {
  filteredCount: number;
  view: View;
  setView: (v: View) => void;
  favsCount: number;
  doneCount: number;
  cat: CatOrAll;
  setCat: (c: CatOrAll) => void;
  pool: number;
  onSurprise: (e: React.MouseEvent) => void;
}

export function Header({
  filteredCount,
  view,
  setView,
  favsCount,
  doneCount,
  cat,
  setCat,
  pool,
  onSurprise,
}: HeaderProps) {
  return (
    <header className="hdr">
      <div className="logo-row">
        <div className="logo">
          <img
            className="logo-mark"
            src={`${import.meta.env.BASE_URL}apple-touch-icon.png`}
            alt="Summer Bucket List"
          />
          <div>
            <h1 className="logo-name">SUMMER BUCKET LIST</h1>
            <span className="logo-tag">Manchester & NW</span>
          </div>
        </div>
        <div className="hdr-rhs">
          <div className="result-pill">
            <span className="result-num">{filteredCount}</span>
            <span className="result-lbl">{filteredCount === 1 ? "activity" : "activities"}</span>
          </div>
          <button
            className="surp-ico"
            onClick={onSurprise}
            disabled={pool === 0}
            title="Surprise me"
          >
            <LuShuffle size={16} />
          </button>
        </div>
      </div>
      <div className="tabs">
        <button
          className={`tab${view === "browse" ? " on" : ""}`}
          onClick={() => setView("browse")}
        >
          <LuMap size={14} /> Browse
        </button>
        <button className={`tab${view === "favs" ? " on" : ""}`} onClick={() => setView("favs")}>
          <LuHeart size={14} style={view === "favs" ? { fill: "currentColor" } : undefined} /> Saved{" "}
          {favsCount > 0 && <span className="bdg">{favsCount}</span>}
        </button>
        <button className={`tab${view === "done" ? " on" : ""}`} onClick={() => setView("done")}>
          <LuCheck size={14} /> Done {doneCount > 0 && <span className="bdg">{doneCount}</span>}
        </button>
      </div>
      <CategoryChips value={cat} onChange={setCat} />
    </header>
  );
}
