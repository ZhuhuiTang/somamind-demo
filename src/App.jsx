import React, { useMemo, useState } from "react";
import { Home, Activity, MessageSquare, Lightbulb, History as HistoryIcon } from "lucide-react";

import { styles } from "./ui/styles";
import { Badge, NavItem, titleOf } from "./ui/kit";

import ResearchPanel from "./components/ResearchPanel";

import Dashboard from "./screens/Dashboard";
import BodyMap from "./screens/BodyMap";
import Journal from "./screens/Journal";
import Insights from "./screens/Insights";
import Feedback from "./screens/Feedback";
import History from "./screens/History";

export default function App() {
  const [screen, setScreen] = useState("dashboard");

  // ✅ 默认不显示右侧研究说明（避免给导师造成杂讯）
  const [showGuide, setShowGuide] = useState(false);

  // lightweight in-demo “state”
  const [selectedBody, setSelectedBody] = useState("Chest");
  const [sensations, setSensations] = useState(["tight", "heavy"]);
  const [intensity, setIntensity] = useState(6);
  const [journalNote, setJournalNote] = useState("Late work. Felt pressure in my chest around 11pm.");
  const [feedback, setFeedback] = useState(null);
  const [teach, setTeach] = useState(
    "When my chest feels tight, it's usually work stress + fear of missing deadlines."
  );
  const [pref, setPref] = useState("Short breathing + a 2-min shoulder/neck stretch helps me most.");

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

  function reset() {
    setScreen("dashboard");
    setSelectedBody("Chest");
    setSensations(["tight", "heavy"]);
    setIntensity(6);
    setJournalNote("Late work. Felt pressure in my chest around 11pm.");
    setFeedback(null);
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.h1}>SomaMind — research demo (6 screens)</h1>
            <p style={styles.sub}>
              Clickable interaction concept (not a clinical product). For the teacher: demo only.
            </p>
          </div>

          <div style={styles.badgeRow}>
            <Badge accent>Status: Proposed</Badge>
            <button style={styles.btnSmall} onClick={() => setShowGuide((v) => !v)}>
              {showGuide ? "Hide Guide" : "Guide (for me)"}
            </button>
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
                <button style={styles.btnSmall} onClick={reset}>
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
                  <History
                    intensity={intensity}
                    statusPills={statusPills}
                    onBackInsights={() => setScreen("insights")}
                  />
                )}
              </div>

              <div style={styles.nav}>
                <NavItem icon={<Home size={18} />} label="Home" active={screen === "dashboard"} onClick={() => setScreen("dashboard")} />
                <NavItem icon={<Activity size={18} />} label="Body" active={screen === "body"} onClick={() => setScreen("body")} />
                <NavItem icon={<MessageSquare size={18} />} label="Journal" active={screen === "journal"} onClick={() => setScreen("journal")} />
                <NavItem icon={<Lightbulb size={18} />} label="Insights" active={screen === "insights"} onClick={() => setScreen("insights")} />
                <NavItem icon={<HistoryIcon size={18} />} label="History" active={screen === "history"} onClick={() => setScreen("history")} />
              </div>
            </div>
          </div>

          {/* ✅ 右侧研究说明：默认隐藏；你自己需要才打开 */}
          {showGuide ? <ResearchPanel screen={screen} /> : <div />}
        </div>
      </div>
    </div>
  );
}
