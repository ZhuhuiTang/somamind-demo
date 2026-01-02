// src/ui/kit.jsx
import React from "react";
import { styles } from "./styles";

export function Badge({ icon, children, accent }) {
  return (
    <span style={{ ...styles.badge, ...(accent ? styles.badgeAccent : {}) }}>
      {icon}
      {children}
    </span>
  );
}

export function Card({ title, right, children }) {
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

export function LabelValue({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
      <div style={{ fontSize: 12, color: "#6B7280" }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{value}</div>
    </div>
  );
}

export function Sparkline({ values }) {
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

export function NavItem({ icon, label, active, onClick }) {
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

export function Bubble({ side, text }) {
  const wrap = { display: "flex", justifyContent: side === "left" ? "flex-start" : "flex-end" };
  return (
    <div style={wrap}>
      <div style={side === "left" ? styles.bubbleLeft : styles.bubbleRight}>{text}</div>
    </div>
  );
}

export function Node({ label, value }) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid #E5E7EB",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)",
        padding: 10,
      }}
    >
      <div style={{ fontSize: 11, color: "#6B7280" }}>{label}</div>
      <div style={{ marginTop: 4, fontSize: 13, fontWeight: 900 }}>{value}</div>
    </div>
  );
}

export function titleOf(screen) {
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
