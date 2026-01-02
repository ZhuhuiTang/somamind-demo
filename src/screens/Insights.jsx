import React from "react";
import { Lightbulb, Info } from "lucide-react";
import { styles } from "../ui/styles";
import { Badge, Card, Node } from "../ui/kit";

function Arrow() {
  return (
    <div style={{ display: "flex", justifyContent: "center", color: "#6366F1" }}>
      <span style={{ fontWeight: 900 }}>→</span>
    </div>
  );
}

export default function Insights({
  selectedBody,
  sensations,
  intensity,
  note,
  statusPills,
  confidence,
  onMismatch,
  onGoHistory,
}) {
  const trigger = note.toLowerCase().includes("work") ? "Late work" : "Day stress";
  const mechanism = intensity >= 6 ? "Hyperarousal" : "Rumination";
  const somatic = `${selectedBody}: ${sensations.join(", ") || "—"}`;
  const outcome = intensity >= 6 ? "Poor sleep" : "Low mood";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Card title="Your current pattern" right={<Badge accent icon={<Lightbulb size={14} />}>Confidence: {confidence}</Badge>}>
        <div style={{ fontSize: 13, fontWeight: 900 }}>
          {statusPills[0]} · {statusPills[1]} · {statusPills[2]}
        </div>
        <div style={{ marginTop: 6, fontSize: 12, color: "#6B7280" }}>
          Not a diagnosis — a tentative summary to support reflection and safer suggestions.
        </div>
      </Card>

      <Card title="Why this suggestion?" right={<Badge accent icon={<Info size={14} />}>Explainable</Badge>}>
        <div style={{ fontSize: 12, color: "#6B7280" }}>Simplified causal chain (proposed)</div>
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          <Node label="Trigger" value={trigger} />
          <Arrow />
          <Node label="Mechanism" value={mechanism} />
          <Arrow />
          <Node label="Somatic expression" value={somatic} />
          <Arrow />
          <Node label="Outcome" value={outcome} />
        </div>

        <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
          <button style={styles.btnSmall} onClick={onGoHistory}>View trends</button>
          <button style={styles.btnSmall} onClick={onMismatch}>This doesn’t match me</button>
        </div>
      </Card>

      <Card title="Try now (Soma-Anchor)" right={<Badge icon={<Info size={14} />}>3 min</Badge>}>
        <div style={{ fontSize: 13, fontWeight: 900 }}>3-min breathing + body scan</div>
        <div style={{ marginTop: 6, fontSize: 12, color: "#6B7280" }}>
          Ask for quick feedback to improve fit (calibration loop).
        </div>
        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <button style={styles.btnPrimary} onClick={() => {}}>Start</button>
          <button style={styles.btnSecondary} onClick={() => {}}>Not now</button>
        </div>
      </Card>

      <div style={{ borderRadius: 18, border: "1px solid #FDE68A", background: "#FFFBEB", padding: 12, color: "#92400E" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 900 }}>
          <Info size={16} /> Safety boundary
        </div>
        <div style={{ marginTop: 6, fontSize: 12, lineHeight: 1.35 }}>
          Research demo only. Not medical advice. For severe distress, seek professional help.
        </div>
      </div>
    </div>
  );
}
