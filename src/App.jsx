import React, { useMemo, useState } from "react";
import {
  Home,
  Activity,
  MessageSquare,
  Lightbulb,
  History,
  ChevronRight,
  ChevronLeft,
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";

/**
 * SomaMind — research-oriented clickable mobile demo (6 screens)
 * - No "Notes" inside demo (put research notes on your website instead)
 * - Neutral labels + safety boundary language included (avoid overclaim)
 */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "24px",
    background:
      "linear-gradient(180deg, rgba(238,242,255,1) 0%, rgba(255,255,255,1) 45%, rgba(250,250,250,1) 100%)",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
    color: "#111827",
  },
  container: { maxWidth: 1100, margin: "0 auto" },
  headerRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  h1: { fontSize: 22, margin: 0, fontWeight: 800 },
  sub: { margin: "6px 0 0", fontSize: 14, color: "#4B5563" },
  badgeRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid #E5E7EB",
    background: "#F3F4F6",
    color: "#374151",
  },
  badgeAccent: {
    border: "1px solid #C7D2FE",
    background: "#EEF2FF",
    color: "#3730A3",
  },
  grid2: {
    marginTop: 18,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 18,
    alignItems: "start",
  },
  phoneWrap: { display: "flex", justifyContent: "center" },
  phone: {
    position: "relative",
    width: 390,
    height: 844,
    borderRadius: 42,
    border: "1px solid #E5E7EB",
    background: "rgba(255,255,255,0.95)",
    boxShadow: "0 18px 50px rgba(17,24,39,0.12)",
    overflow: "hidden",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    padding: "10px 14px",
    borderBottom: "1px solid #E5E7EB",
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  topTitle: { fontSize: 14, fontWeight: 800, margin: 0 },
  topMeta: { fontSize: 11, color: "#6B7280", marginTop: 2 },
  content: {
    position: "absolute",
    top: 56,
    bottom: 64,
    left: 0,
    right: 0,
    overflowY: "auto",
    padding: 14,
  },
  nav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
    borderTop: "1px solid #E5E7EB",
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(8px)",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    padding: "6px 6px",
  },
  navItem: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: "6px 6px",
    borderRadius: 14,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    color: "#6B7280",
  },
  navItemActive: { color: "#4338CA" },

  sideCard: {
    borderRadius: 20,
    border: "1px solid #E5E7EB",
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(8px)",
    padding: 16,
    boxShadow: "0 8px 18px rgba(17,24,39,0.06)",
  },
  card: {
    borderRadius: 18,
    border: "1px solid #E5E7EB",
    background: "rgba(255,255,255,0.94)",
    padding: 14,
    boxShadow: "0 6px 14px rgba(17,24,39,0.06)",
  },
  cardTitleRow: { display: "flex", justifyContent: "space-between", gap: 10 },
  cardTitle: { fontSize: 13, fontWeight: 800, margin: 0 },
  small: { fontSize: 12, color: "#4B5563" },

  btnPrimary: {
    width: "100%",
    border: "none",
    borderRadius: 14,
    padding: "12px 14px",
    background: "#4F46E5",
    color: "white",
    fontWeight: 800,
    fontSize: 13,
    cursor: "pointer",
    boxShadow: "0 10px 18px rgba(79,70,229,0.22)",
  },
  btnSecondary: {
    width: "100%",
    borderRadius: 14,
    padding: "12px 14px",
    background: "white",
    color: "#111827",
    fontWeight: 800,
    fontSize: 13,
    cursor: "pointer",
    border: "1px solid #E5E7EB",
  },
  btnSmall: {
    borderRadius: 12,
    padding: "8px 10px",
    background: "white",
    color: "#111827",
    fontWeight: 800,
    fontSize: 12,
    cursor: "pointer",
    border: "1px solid #E5E7EB",
  },

  chip: {
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 12,
    border: "1px solid #E5E7EB",
    background: "white",
    cursor: "pointer",
  },
  chipOn: { border: "1px solid #4F46E5", background: "#EEF2FF", color: "#3730A3" },

  bubbleLeft: {
    maxWidth: "78%",
    borderRadius: 16,
    padding: "8px 10px",
    border: "1px solid #E5E7EB",
    background: "white",
    fontSize: 13,
    lineHeight: 1.25,
  },
  bubbleRight: {
    maxWidth: "78%",
    borderRadius: 16,
    padding: "8px 10px",
    border: "1px solid #4F46E5",
    background: "#4F46E5",
    color: "white",
    fontSize: 13,
    lineHeight: 1.25,
  },
  textarea: {
    width: "100%",
    borderRadius: 14,
    border: "1px solid #E5E7EB",
    padding: 10,
    fontSize: 13,
    outline: "none",
    resize: "vertical",
  },
};

function Badge({ icon, children, accent }) {
  return (
    <span style={{ ...styles.badge, ...(accent ? styles.badgeAccent : {}) }}>
      {icon}
      {children}
    </span>
  );
}

function Card({ title, right, children }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTitleRow}>
        <div style={styles.cardTitle}>{title}</div>
        {right}
      </div>
      <div style={{ marginTop: 10 }}>{children}</div>
    </div>
  );
}

function LabelValue({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
      <div style={{ fontSize: 12, color: "#6B7280" }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{value}</div>
    </div>
  );
}

function Sparkline({ values }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 120;
      const y = 36 - ((v - min) / Math.max(1e-6, max - min)) * 32;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width="120" height="36" viewBox="0 0 120 36">
      <polyline points={pts} fill="none" stroke="#4F46E5" strokeWidth="2.5" />
    </svg>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ ...styles.navItem, ...(active ? styles.navItemActive : {}) }}
      aria-label={label}
      title={label}
    >
      {icon}
      <div style={{ fontSize: 11, fontWeight: active ? 800 : 700 }}>{label}</div>
      <div
        style={{
          height: 4,
          width: 28,
          borderRadius: 99,
          background: active ? "#4F46E5" : "transparent",
        }}
      />
    </button>
  );
}

export default function App() {
  const [screen, setScreen] = useState("dashboard");

  // lightweight in-demo “state”
  const [selectedBody, setSelectedBody] = useState("Chest");
  const [sensations, setSensations] = useState(["tight", "heavy"]);
  const [intensity, setIntensity] = useState(6);
  const [journalNote, setJournalNote] = useState(
    "Late work. Felt pressure in my chest around 11pm."
  );
  const [feedback, setFeedback] = useState(null);
  const [teach, setTeach] = useState(
    "When my chest feels tight, it's usually work stress + fear of missing deadlines."
  );
  const [pref, setPref] = useState(
    "Short breathing + a 2-min shoulder/neck stretch helps me most."
  );

  const statusPills = useMemo(() => {
    const arousal =
      intensity >= 7 ? "High arousal" : intensity >= 4 ? "Elevated arousal" : "Stable arousal";
    const recovery = intensity >= 6 ? "Low recovery" : "Moderate recovery";
    const load = journalNote.toLowerCase().includes("work") ? "Cognitive overload" : "Balanced load";
    return [arousal, recovery, load];
  }, [intensity, journalNote]);

  const confidence = useMemo(() => {
    const n = sensations.length + (journalNote.trim().length > 0 ? 1 : 0);
    if (n >= 4) return "High";
    if (n >= 3) return "Medium";
    return "Low";
  }, [sensations, journalNote]);

  function toggleSensation(s) {
    setSensations((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.h1}>SomaMind — research demo (6 screens)</h1>
            <p style={styles.sub}>
              Clickable interaction concept (not a clinical product). Neutral labels + safety boundary.
            </p>
          </div>
          <div style={styles.badgeRow}>
            <Badge accent icon={<Info size={14} />}>Status: Proposed</Badge>
            <Badge icon={<CheckCircle2 size={14} />}>
              Flow: Dashboard → Body → Journal → Insights → Feedback
            </Badge>
          </div>
        </div>

        <div style={styles.grid2}>
          <div style={styles.phoneWrap}>
            <div style={styles.phone}>
              <div style={styles.topBar}>
                <div>
                  <div style={styles.topTitle}>{titleOf(screen)}</div>
                  <div style={styles.topMeta}>
                    Confidence: {confidence} · {selectedBody} {intensity}/10
                  </div>
                </div>
                <button style={styles.btnSmall} onClick={() => setScreen("dashboard")}>
                  Reset
                </button>
              </div>

              <div style={styles.content}>
                {screen === "dashboard" && (
                  <Dashboard
                    statusPills={statusPills}
                    intensity={intensity}
                    selectedBody={selectedBody}
                    onGoBody={() => setScreen("body")}
                    onGoJournal={() => setScreen("journal")}
                    onGoInsights={() => setScreen("insights")}
                  />
                )}

                {screen === "body" && (
                  <BodyMap
                    selectedBody={selectedBody}
                    setSelectedBody={setSelectedBody}
                    sensations={sensations}
                    toggleSensation={toggleSensation}
                    intensity={intensity}
                    setIntensity={setIntensity}
                    onContinue={() => setScreen("journal")}
                  />
                )}

                {screen === "journal" && (
                  <Journal
                    selectedBody={selectedBody}
                    sensations={sensations}
                    intensity={intensity}
                    note={journalNote}
                    setNote={setJournalNote}
                    onGenerate={() => setScreen("insights")}
                  />
                )}

                {screen === "insights" && (
                  <Insights
                    selectedBody={selectedBody}
                    sensations={sensations}
                    intensity={intensity}
                    note={journalNote}
                    statusPills={statusPills}
                    confidence={confidence}
                    onMismatch={() => setScreen("feedback")}
                    onGoHistory={() => setScreen("history")}
                  />
                )}

                {screen === "feedback" && (
                  <Feedback
                    feedback={feedback}
                    setFeedback={setFeedback}
                    teach={teach}
                    setTeach={setTeach}
                    pref={pref}
                    setPref={setPref}
                    onSave={() => setScreen("dashboard")}
                  />
                )}

                {screen === "history" && (
                  <HistoryScreen
                    intensity={intensity}
                    statusPills={statusPills}
                    onBackInsights={() => setScreen("insights")}
                  />
                )}
              </div>

              <div style={styles.nav}>
                <NavItem
                  icon={<Home size={18} />}
                  label="Home"
                  active={screen === "dashboard"}
                  onClick={() => setScreen("dashboard")}
                />
                <NavItem
                  icon={<Activity size={18} />}
                  label="Body"
                  active={screen === "body"}
                  onClick={() => setScreen("body")}
                />
                <NavItem
                  icon={<MessageSquare size={18} />}
                  label="Journal"
                  active={screen === "journal"}
                  onClick={() => setScreen("journal")}
                />
                <NavItem
                  icon={<Lightbulb size={18} />}
                  label="Insights"
                  active={screen === "insights"}
                  onClick={() => setScreen("insights")}
                />
                <NavItem
                  icon={<History size={18} />}
                  label="History"
                  active={screen === "history"}
                  onClick={() => setScreen("history")}
                />
              </div>
            </div>
          </div>

          <div style={styles.sideCard}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 900 }}>How to present (更有信服性)</div>
                <div style={{ ...styles.small, marginTop: 4 }}>
                  把 Purpose / Data / Measures 放在你的网站页面里（demo 下方或侧边），而不是塞进 demo。
                </div>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ ...styles.card, background: "#EEF2FF", border: "1px solid #C7D2FE" }}>
                <div style={{ fontWeight: 900, color: "#312E81" }}>One-line boundary</div>
                <div style={{ marginTop: 6, fontSize: 13, color: "#312E81", lineHeight: 1.3 }}>
                  “This is a proposed interaction prototype; backend reasoning and clinical validation are future work.”
                </div>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={styles.card}>
                <div style={{ fontWeight: 900 }}>60–90s walkthrough script</div>
                <ol style={{ marginTop: 8, paddingLeft: 18, color: "#374151", fontSize: 13, lineHeight: 1.5 }}>
                  <li>Dashboard: neutral state labels from wearables</li>
                  <li>Body Map: tap region + sensation + intensity</li>
                  <li>Journal: add context</li>
                  <li>Insights: causal chain + uncertainty + suggestion</li>
                  <li>Feedback: teach system (calibration loop)</li>
                </ol>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ ...styles.card, background: "#FFFBEB", border: "1px solid #FDE68A" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 900, color: "#92400E" }}>
                  <Info size={16} /> Safety boundary
                </div>
                <div style={{ marginTop: 6, fontSize: 13, color: "#92400E", lineHeight: 1.35 }}>
                  Research demo only. Not medical advice. For severe distress, seek professional help.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12, fontSize: 12, color: "#6B7280" }}>
          Next: running locally works → then we deploy to GitHub Pages.
        </div>
      </div>
    </div>
  );
}

function titleOf(screen) {
  switch (screen) {
    case "dashboard":
      return "Dashboard";
    case "body":
      return "Body Map";
    case "journal":
      return "Journal";
    case "insights":
      return "Insights";
    case "feedback":
      return "Feedback";
    case "history":
      return "History";
    default:
      return "SomaMind";
  }
}

function Dashboard({ statusPills, intensity, selectedBody, onGoBody, onGoJournal, onGoInsights }) {
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
          <LabelValue
            label="Arousal (EDA proxy)"
            value={intensity >= 7 ? "↑↑" : intensity >= 4 ? "↑" : "—"}
          />
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

      <Card title="Neutral State Labels" right={<button style={styles.btnSmall} onClick={onGoInsights}>Why?</button>}>
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
        <button style={styles.btnSecondary} onClick={onGoJournal}>Write a quick note</button>
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

function BodyMap({ selectedBody, setSelectedBody, sensations, toggleSensation, intensity, setIntensity, onContinue }) {
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

function Bubble({ side, text }) {
  const wrap = { display: "flex", justifyContent: side === "left" ? "flex-start" : "flex-end" };
  return (
    <div style={wrap}>
      <div style={side === "left" ? styles.bubbleLeft : styles.bubbleRight}>{text}</div>
    </div>
  );
}

function Journal({ selectedBody, sensations, intensity, note, setNote, onGenerate }) {
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

function Node({ label, value }) {
  return (
    <div style={{ borderRadius: 16, border: "1px solid #E5E7EB", background: "linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)", padding: 10 }}>
      <div style={{ fontSize: 11, color: "#6B7280" }}>{label}</div>
      <div style={{ marginTop: 4, fontSize: 13, fontWeight: 900 }}>{value}</div>
    </div>
  );
}

function Arrow() {
  return (
    <div style={{ display: "flex", justifyContent: "center", color: "#6366F1" }}>
      <ChevronRight size={18} />
    </div>
  );
}

function Insights({ selectedBody, sensations, intensity, note, statusPills, confidence, onMismatch, onGoHistory }) {
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

function Feedback({ feedback, setFeedback, teach, setTeach, pref, setPref, onSave }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Card title="Was this helpful?" right={<Badge accent icon={<CheckCircle2 size={14} />}>Calibration</Badge>}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          <button
            onClick={() => setFeedback("helpful")}
            style={{
              borderRadius: 14,
              border: feedback === "helpful" ? "1px solid #4F46E5" : "1px solid #E5E7EB",
              background: feedback === "helpful" ? "#EEF2FF" : "white",
              padding: 10,
              cursor: "pointer",
              fontWeight: 900,
              fontSize: 12,
              color: feedback === "helpful" ? "#3730A3" : "#111827",
            }}
          >
            <CheckCircle2 size={18} /> <div>Helpful</div>
          </button>

          <button
            onClick={() => setFeedback("not")}
            style={{
              borderRadius: 14,
              border: feedback === "not" ? "1px solid #4F46E5" : "1px solid #E5E7EB",
              background: feedback === "not" ? "#EEF2FF" : "white",
              padding: 10,
              cursor: "pointer",
              fontWeight: 900,
              fontSize: 12,
              color: feedback === "not" ? "#3730A3" : "#111827",
            }}
          >
            <XCircle size={18} /> <div>Not</div>
          </button>

          <button
            onClick={() => setFeedback("unsure")}
            style={{
              borderRadius: 14,
              border: feedback === "unsure" ? "1px solid #4F46E5" : "1px solid #E5E7EB",
              background: feedback === "unsure" ? "#EEF2FF" : "white",
              padding: 10,
              cursor: "pointer",
              fontWeight: 900,
              fontSize: 12,
              color: feedback === "unsure" ? "#3730A3" : "#111827",
            }}
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
          <textarea style={{ ...styles.textarea, marginTop: 6 }} rows={3} value={teach} onChange={(e) => setTeach(e.target.value)} />
        </div>

        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 12, color: "#6B7280" }}>A suggestion I prefer is…</div>
          <textarea style={{ ...styles.textarea, marginTop: 6 }} rows={2} value={pref} onChange={(e) => setPref(e.target.value)} />
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

function HistoryScreen({ intensity, statusPills, onBackInsights }) {
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
            <div key={d} style={{ display: "flex", justifyContent: "space-between", border: "1px solid #E5E7EB", borderRadius: 14, background: "#F9FAFB", padding: "8px 10px" }}>
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
