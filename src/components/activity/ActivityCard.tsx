import type React from "react";
import {
  LuCar,
  LuCheck,
  LuClock,
  LuFootprints,
  LuHeart,
  LuMapPin,
  LuShare2,
  LuSquare,
  LuStar,
  LuUtensils,
  LuWallet,
} from "react-icons/lu";
import { CAT_CLR, COST_LBL, EFF_CLR, EFF_LBL } from "../../lib/constants";
import { catInfo, durStr } from "../../lib/utils";
import type { Activity } from "../../types";

interface ActivityCardProps {
  a: Activity;
  index: number;
  isFav: boolean;
  isDone: boolean;
  copied: string | null;
  onOpen: (a: Activity) => void;
  onToggleFav: (id: string, e: React.MouseEvent) => void;
  onToggleDone: (id: string, e: React.MouseEvent) => void;
  onShare: (a: Activity, e: React.MouseEvent) => void;
}

export function ActivityCard({
  a,
  index,
  isFav,
  isDone,
  copied,
  onOpen,
  onToggleFav,
  onToggleDone,
  onShare,
}: ActivityCardProps) {
  const cc = CAT_CLR[a.category] ?? "#e9a020";
  const cInfo = catInfo(a.category);
  const dStr = durStr(a);
  return (
    <article
      className={`card${isDone ? " done" : ""}`}
      style={
        {
          "--cc": cc,
          animationDelay: `${Math.min(index * 35, 280)}ms`,
        } as React.CSSProperties
      }
      onClick={() => onOpen(a)}
    >
      <div className="ctop">
        <div className="badges">
          <span className="b-cat">
            {cInfo.e} {cInfo.label}
          </span>
          <span className="b-sub">{a.subcategory}</span>
        </div>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <LuStar
              key={n}
              size={11}
              style={{
                fill: "currentColor",
                opacity: n <= a.engagement ? 1 : 0.13,
              }}
            />
          ))}
        </div>
      </div>
      <div className="cname">{a.name}</div>
      <div className="cloc">
        <LuMapPin size={13} /> {a.location}
      </div>
      <div className="cdesc">{a.desc}</div>
      <div className="cmeta">
        <span className="mc">
          <LuCar size={12} /> {a.drive} min
        </span>
        <span className="mc">
          <LuClock size={12} /> {dStr}
        </span>
        <span className="mc" style={{ color: EFF_CLR[a.effort] }}>
          <LuFootprints size={12} /> {EFF_LBL[a.effort]}
        </span>
        <span className="mc">
          <LuWallet size={12} /> {COST_LBL[a.cost]}
        </span>
        {a.halal && (
          <span className="mc" style={{ color: "#4ade80" }}>
            <LuUtensils size={12} /> Halal
          </span>
        )}
      </div>
      <div className="cacts" onClick={(e) => e.stopPropagation()}>
        <button className={`abtn${isFav ? " fav" : ""}`} onClick={(e) => onToggleFav(a.id, e)}>
          <LuHeart size={13} style={isFav ? { fill: "currentColor" } : undefined} />{" "}
          {isFav ? "Saved" : "Save"}
        </button>
        <button className={`abtn${isDone ? " dne" : ""}`} onClick={(e) => onToggleDone(a.id, e)}>
          {isDone ? <LuCheck size={13} /> : <LuSquare size={13} />} {isDone ? "Done!" : "Done"}
        </button>
        <button className={`abtn${copied === a.id ? " cp" : ""}`} onClick={(e) => onShare(a, e)}>
          {copied === a.id ? <LuCheck size={13} /> : <LuShare2 size={13} />}{" "}
          {copied === a.id ? "Copied" : "Share"}
        </button>
      </div>
    </article>
  );
}
