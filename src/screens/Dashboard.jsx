import React from "react";
import { Info, ChevronRight } from "lucide-react";
import { styles } from "../ui/styles";
import { Badge, Card, LabelValue, Sparkline } from "../ui/kit";

export default function Dashboard({ statusPills, intensity, selectedBody, onGoBody, onGoJournal, onGoInsights }) {
  const spark = [3, 4, 3, 5, 6, 6, intensity];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Card
        title="Today Summary"
        right={<Badge accent icon={<Info size={14} />}>Wearable + self-report (Proposed)</Badge>}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <LabelValue label="Sleep" value="6h 10m ↓" />
          <LabelValue label="Stress index (HRV proxy)" value="High" />
          <LabelValue label="Arousal (EDA proxy)" value={intensity >= 7 ? "↑↑" : intensity >= 4 ? "↑" : "—"} />
        </div>

        <div
          style={{
            marginTop: 10,
            borderRadius: 14,
            border: "1px solid #C7D2FE",
            background: "#EEF2FF",
            padding: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: "#3730A3", fontWeight: 800 }}>7-day arousal trend (mock)</div>
            <div style={{ fontSize: 13, color: "#312E81", fontWeight: 900 }}>{statusPills[0]}</div>
          </div>
          <Sparkline values={spark} />
        </div>
      </Card>

      <Card
        title="Neutral State Labels"
        right={<button style={styles.btnSmall} onClick={onGoInsights}>Why?</button>}
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {statusPills.map((p) => (
            <span key={p} style={styles.badge}>{p}</span>
          ))}
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: "#6B7280" }}>
          Labels are intentionally neutral to avoid over-pathologizing.
        </div>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button style={styles.btnPrimary} onClick={onGoBody}>
          Map it on Body Map <ChevronRight size={16} style={{ verticalAlign: "middle" }} />
        </button>
        <button style={styles.btnSecondary} onClick={onGoJournal}>
          Write a quick note
        </button>
      </div>

      <div style={{ ...styles.card, background: "rgba(255,255,255,0.95)" }}>
        <div style={{ fontSize: 12, color: "#6B7280" }}>Last selection</div>
        <div style={{ marginTop: 4, fontSize: 13, fontWeight: 900 }}>
          {selectedBody} · intensity {intensity}/10
        </div>
        <div style={{ marginTop: 6, fontSize: 12, color: "#6B7280" }}>
          Supports somatic-first expression and reduces word-search burden.
        </div>
      </div>
    </div>
  );
}
