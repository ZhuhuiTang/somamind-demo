import React from "react";
import { CheckCircle2, XCircle, HelpCircle, ChevronRight } from "lucide-react";
import { styles } from "../ui/styles";
import { Badge, Card } from "../ui/kit";

export default function Feedback({ feedback, setFeedback, teach, setTeach, pref, setPref, onSave }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Card title="Was this helpful?" right={<Badge accent icon={<CheckCircle2 size={14} />}>Calibration</Badge>}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          <button
            onClick={() => setFeedback("helpful")}
            style={btnChoice(feedback === "helpful")}
          >
            <CheckCircle2 size={18} /> <div>Helpful</div>
          </button>

          <button
            onClick={() => setFeedback("not")}
            style={btnChoice(feedback === "not")}
          >
            <XCircle size={18} /> <div>Not</div>
          </button>

          <button
            onClick={() => setFeedback("unsure")}
            style={btnChoice(feedback === "unsure")}
          >
            <HelpCircle size={18} /> <div>Unsure</div>
          </button>
        </div>
      </Card>

      {feedback === "not" && (
        <div style={styles.card}>
          <div style={{ fontSize: 13, fontWeight: 900 }}>Why not?</div>
          <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Not my situation", "Timing wrong", "Too intense", "Doesn’t match my body"].map((x) => (
              <span key={x} style={styles.badge}>{x}</span>
            ))}
          </div>
        </div>
      )}

      <div style={styles.card}>
        <div style={{ fontSize: 13, fontWeight: 900 }}>Teach SomaMind</div>
        <div style={{ marginTop: 6, fontSize: 12, color: "#6B7280" }}>
          Use your own words. This becomes a learning signal.
        </div>

        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 12, color: "#6B7280" }}>When I feel this, it usually means…</div>
          <textarea
            style={{ ...styles.textarea, marginTop: 6 }}
            rows={3}
            value={teach}
            onChange={(e) => setTeach(e.target.value)}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 12, color: "#6B7280" }}>A suggestion I prefer is…</div>
          <textarea
            style={{ ...styles.textarea, marginTop: 6 }}
            rows={2}
            value={pref}
            onChange={(e) => setPref(e.target.value)}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <button style={styles.btnPrimary} onClick={onSave}>
            Save & update dashboard <ChevronRight size={16} style={{ verticalAlign: "middle" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

function btnChoice(active) {
  return {
    borderRadius: 14,
    border: active ? "1px solid #4F46E5" : "1px solid #E5E7EB",
    background: active ? "#EEF2FF" : "white",
    padding: 10,
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 12,
    color: active ? "#3730A3" : "#111827",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    alignItems: "center",
  };
}
