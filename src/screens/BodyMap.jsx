import React from "react";
import { Info, ChevronRight } from "lucide-react";
import { styles } from "../ui/styles";
import { Badge, Card } from "../ui/kit";

export default function BodyMap({
  selectedBody,
  setSelectedBody,
  sensations,
  toggleSensation,
  intensity,
  setIntensity,
  onContinue,
}) {
  const regions = [
    { key: "Head", x: 155, y: 52, w: 90, h: 70 },
    { key: "Shoulder/Neck", x: 120, y: 125, w: 160, h: 70 },
    { key: "Chest", x: 138, y: 205, w: 124, h: 92 },
    { key: "Abdomen", x: 142, y: 305, w: 116, h: 100 },
    { key: "Limbs", x: 86, y: 430, w: 230, h: 120 },
  ];
  const options = ["tight", "heavy", "burning", "numb", "restless", "other"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Card title="Tap a body area" right={<Badge accent icon={<Info size={14} />}>Embodied input</Badge>}>
        <div style={{ fontSize: 12, color: "#6B7280" }}>
          Express by location first, then refine with sensations.
        </div>

        <div
          style={{
            marginTop: 10,
            position: "relative",
            width: 310,
            height: 560,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 26,
            border: "1px solid #E5E7EB",
            background: "linear-gradient(180deg, #FAFAFF 0%, #EEF2FF 100%)",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 40, width: 80, height: 80, borderRadius: 999, background: "#D1D5DB" }} />
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 130, width: 144, height: 290, borderRadius: 44, background: "#D1D5DB" }} />
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 420, width: 192, height: 120, borderRadius: 34, background: "#D1D5DB" }} />

          {regions.map((r) => {
            const active = selectedBody === r.key;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => setSelectedBody(r.key)}
                style={{
                  position: "absolute",
                  left: r.x,
                  top: r.y,
                  width: r.w,
                  height: r.h,
                  borderRadius: 18,
                  border: active ? "2px solid #4F46E5" : "2px solid transparent",
                  background: active ? "rgba(79,70,229,0.12)" : "transparent",
                  cursor: "pointer",
                }}
                aria-label={r.key}
                title={r.key}
              />
            );
          })}

          <div style={{ position: "absolute", bottom: 10, left: 12, right: 12, display: "flex", justifyContent: "space-between", fontSize: 11, color: "#4B5563" }}>
            <div>
              Selected: <span style={{ fontWeight: 900, color: "#111827" }}>{selectedBody}</span>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Info size={12} /> Proposed
            </div>
          </div>
        </div>
      </Card>

      <Card title={`Selected: ${selectedBody}`} right={<Badge accent icon={null}>Intensity {intensity}/10</Badge>}>
        <div style={{ fontSize: 12, color: "#6B7280" }}>Choose sensations</div>
        <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {options.map((s) => {
            const on = sensations.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleSensation(s)}
                style={{ ...styles.chip, ...(on ? styles.chipOn : {}) }}
              >
                {s}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6B7280" }}>
            <span>Intensity</span>
            <span>{intensity}</span>
          </div>
          <input
            style={{ width: "100%", marginTop: 6 }}
            type="range"
            min={0}
            max={10}
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value, 10))}
          />
        </div>
      </Card>

      <button style={styles.btnPrimary} onClick={onContinue}>
        Save & continue to Journal <ChevronRight size={16} style={{ verticalAlign: "middle" }} />
      </button>
    </div>
  );
}
