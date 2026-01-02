import React from "react";
import { ChevronLeft } from "lucide-react";
import { styles } from "../ui/styles";
import { Card } from "../ui/kit";

export default function History({ intensity, statusPills, onBackInsights }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Card
        title="7-day trends (mock)"
        right={
          <button style={styles.btnSmall} onClick={onBackInsights}>
            <ChevronLeft size={14} style={{ verticalAlign: "middle" }} /> Back
          </button>
        }
      >
        <div style={{ fontSize: 12, color: "#6B7280" }}>
          Placeholder trend view. Replace with real charts/screenshots later.
        </div>

        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          {[7, 6, 5, 4, 3, 2, 1].map((d) => (
            <div
              key={d}
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: "1px solid #E5E7EB",
                borderRadius: 14,
                background: "#F9FAFB",
                padding: "8px 10px",
              }}
            >
              <div style={{ fontSize: 12, color: "#6B7280" }}>Day -{d}</div>
              <div style={{ fontSize: 12, fontWeight: 900 }}>
                Intensity {Math.max(0, Math.min(10, intensity + (d % 3) - 1))}/10
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div style={styles.card}>
        <div style={{ fontSize: 13, fontWeight: 900 }}>State summary</div>
        <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {statusPills.map((p) => (
            <span key={p} style={styles.badge}>{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
