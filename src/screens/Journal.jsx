import React from "react";
import { MessageSquare, ChevronRight } from "lucide-react";
import { styles } from "../ui/styles";
import { Badge, Card, Bubble } from "../ui/kit";

export default function Journal({ selectedBody, sensations, intensity, note, setNote, onGenerate }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Card
        title="Guided journal"
        right={<Badge accent icon={<MessageSquare size={14} />}>{selectedBody} · {intensity}/10</Badge>}
      >
        <div style={{ fontSize: 12, color: "#6B7280" }}>
          Short, structured prompts to capture context safely.
        </div>

        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          <Bubble side="left" text={`I noticed: ${selectedBody} feels ${sensations.join(", ") || "—"}. What was happening?`} />
          <Bubble side="right" text={note} />
          <Bubble side="left" text="What did you try? Did it help?" />
          <Bubble side="right" text="I scrolled my phone in bed. It didn’t help much." />
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 12, color: "#6B7280" }}>Edit today’s note</div>
          <textarea
            style={{ ...styles.textarea, marginTop: 6 }}
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div style={{ marginTop: 6, fontSize: 11, color: "#6B7280" }}>
            Tip: keep prompts short; avoid therapeutic over-claims.
          </div>
        </div>
      </Card>

      <button style={styles.btnPrimary} onClick={onGenerate}>
        Generate Insights <ChevronRight size={16} style={{ verticalAlign: "middle" }} />
      </button>
    </div>
  );
}
