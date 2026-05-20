import type React from "react";
import { useRef } from "react";
import {
  LuCar,
  LuCheck,
  LuClock,
  LuFootprints,
  LuHeart,
  LuMapPin,
  LuPin,
  LuShare2,
  LuSquare,
  LuStar,
  LuUtensils,
  LuWallet,
} from "react-icons/lu";
import { CAT_CLR, CATS, COST_LBL, EFF_CLR, EFF_LBL } from "../../lib/constants";
import { durStr } from "../../lib/utils";
import type { Activity } from "../../types";

interface ActivitySheetProps {
  a: Activity;
  isSurprise: boolean;
  isFav: boolean;
  isDone: boolean;
  copied: string | null;
  onClose: () => void;
  onToggleFav: (id: string, e?: React.SyntheticEvent) => void;
  onToggleDone: (id: string, e?: React.SyntheticEvent) => void;
  onReroll: (e?: React.SyntheticEvent) => void;
  onShare: (a: Activity, e?: React.SyntheticEvent) => void;
}

export function ActivitySheet({
  a,
  isSurprise,
  isFav,
  isDone,
  copied,
  onClose,
  onToggleFav,
  onToggleDone,
  onReroll,
  onShare,
}: ActivitySheetProps) {
  const cc = CAT_CLR[a.category] ?? "#e9a020";
  const dStr = durStr(a);
  const cMeta = CATS.find((c) => c.id === a.category);
  const sheetRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const swipeEligible = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    const rect = sheetRef.current?.getBoundingClientRect();
    if (rect) {
      swipeEligible.current =
        e.touches[0].clientY >= rect.top && e.touches[0].clientY <= rect.top + rect.height * 0.2;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches[0].clientY - touchStartY.current > 60 && swipeEligible.current) {
      onClose();
    }
  };

  return (
    <div
      className="ov"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="sh" ref={sheetRef} onClick={(e) => e.stopPropagation()}>
        <div className="sh-hdl" />
        {isSurprise && (
          <div className="surp-hdr">
            <div className="surp-eye">THIS WEEKEND YOU'RE GOING TO:</div>
          </div>
        )}
        <div className="sh-body">
          <div className="sh-crow">
            <span className="sh-cbdg" style={{ background: `${cc}18`, color: cc }}>
              {cMeta?.e} {cMeta?.label}
            </span>
            <span className="sh-csub">{a.subcategory}</span>
          </div>
          <div className="sh-name">{a.name}</div>
          <div className="sh-loc">
            <LuMapPin size={14} /> {a.location}
          </div>
          <div className="sh-meta">
            <div className="sh-mc">
              <LuCar size={14} /> <strong>{a.drive} min</strong> from Oldham
            </div>
            <div className="sh-mc">
              <LuClock size={14} /> <strong>{dStr}</strong>
            </div>
            <div className="sh-mc" style={{ color: EFF_CLR[a.effort] }}>
              <LuFootprints size={14} /> <strong>{EFF_LBL[a.effort]}</strong>
            </div>
            <div className="sh-mc">
              <LuWallet size={14} /> <strong>{COST_LBL[a.cost]}</strong>
            </div>
            <div className="sh-mc">
              <LuStar size={14} style={{ fill: "currentColor" }} />{" "}
              <strong>{a.engagement}/5</strong>
            </div>
            {a.halal && (
              <div className="sh-mc" style={{ color: "#4ade80" }}>
                <LuUtensils size={14} /> <strong>Halal nearby</strong>
              </div>
            )}
          </div>
          <p className="sheet-rating-note">
            <LuStar size={11} style={{ fill: "currentColor", verticalAlign: "middle" }} />{" "}
            Engagement rating — how memorable and group-friendly the experience is, regardless of
            effort or cost
          </p>
          <div className="sh-desc">{a.desc}</div>
          {a.notes && (
            <div className="sh-notes">
              <span className="sh-nlbl">
                <LuPin size={12} /> Practical notes
              </span>
              {a.notes}
            </div>
          )}
          {isSurprise && (
            <button className="reroll" onClick={onReroll}>
              Reroll — pick another
            </button>
          )}
          <div className="sh-acts" style={{ marginTop: isSurprise ? 8 : 0 }}>
            <button className={`sbtn${isFav ? " fav" : ""}`} onClick={() => onToggleFav(a.id)}>
              <LuHeart size={14} style={isFav ? { fill: "currentColor" } : undefined} />{" "}
              {isFav ? "Saved" : "Save"}
            </button>
            {!isSurprise && (
              <button className={`sbtn${isDone ? " dne" : ""}`} onClick={() => onToggleDone(a.id)}>
                {isDone ? <LuCheck size={14} /> : <LuSquare size={14} />}{" "}
                {isDone ? "Done!" : "Mark done"}
              </button>
            )}
            <button
              className={`sbtn${copied === a.id ? " cp" : ""}`}
              onClick={(e) => onShare(a, e)}
            >
              {copied === a.id ? <LuCheck size={14} /> : <LuShare2 size={14} />}{" "}
              {copied === a.id ? "Copied" : "Share"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
