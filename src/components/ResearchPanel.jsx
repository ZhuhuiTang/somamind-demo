// src/components/ResearchPanel.jsx
import React from "react";
import { styles } from "../ui/styles";
import { Badge, Card } from "../ui/kit";
import { Info } from "lucide-react";

const GUIDE = {
  dashboard: {
    title: "Dashboard（研究说明）",
    aim: [
      "展示多模态/可穿戴数据的“中性状态标签”，避免过度诊断式语言。",
      "让用户先看到趋势与不确定性，再进入具身表达。",
    ],
    actions: ["点击底部导航 Home / Body / Journal / Insights", "点击“Reset”可回到首页"],
    observe: ["用户是否理解中性标签含义？", "是否会被“指标”引发焦虑？"],
    data: ["HRV proxy / EDA proxy（示意）", "自评强度（0–10）", "交互日志（点击/停留）"],
  },
  body: {
    title: "Body Map（研究说明）",
    aim: [
      "用“身体部位 → 感受词 → 强度”的顺序降低词汇搜索负担。",
      "支持心理痛苦的具身化表达（somatic-first）。",
    ],
    actions: ["点击身体区域", "点 sensation chip", "拖动 intensity slider", "点继续进入 Journal"],
    observe: ["身体部位选择是否更快？", "感受词是否需要本地化/个体化？"],
    data: ["区域选择分布", "感受词选择", "强度变化轨迹"],
  },
  journal: {
    title: "Journal（研究说明）",
    aim: [
      "用短结构化提示收集情境线索（context），避免治疗性承诺。",
      "把“身体输入”与“生活事件/行为”对齐。",
    ],
    actions: ["编辑文本框", "点击 Generate Insights"],
    observe: ["用户写作负担是否过重？", "提示语是否引导过强？"],
    data: ["文本长度", "关键词（非敏感化处理）", "提交频率"],
  },
  insights: {
    title: "Insights（研究说明）",
    aim: [
      "用可解释链路（简化因果链）解释建议来源，而不是黑箱输出。",
      "显式呈现不确定性（confidence）并提供纠错入口。",
    ],
    actions: ["点击 View trends", "点击 This doesn’t match me 进入 Feedback"],
    observe: ["用户是否信任解释？", "哪里最常被标为“不匹配”？"],
    data: ["不匹配原因", "建议接受率", "纠错后满意度变化"],
  },
  feedback: {
    title: "Feedback（研究说明）",
    aim: [
      "构建“用户教系统”的校准回路（calibration loop），让模型更贴合个体。",
      "避免把系统定位为临床判断者。",
    ],
    actions: ["选择 Helpful/Not/Unsure", "填写 teach/pref", "保存回到 Dashboard"],
    observe: ["用户是否愿意提供纠错信息？", "纠错文本是否可被简化为选项？"],
    data: ["反馈分布", "纠错内容主题", "保存后回访行为"],
  },
  history: {
    title: "History（研究说明）",
    aim: [
      "给用户一个低负担的回顾视图，支持自我反思与模式识别。",
      "未来可替换为真实图表/截图或更严谨的数据视图。",
    ],
    actions: ["点击 Back 返回 Insights"],
    observe: ["用户是否理解趋势含义？", "是否需要注释/对照事件？"],
    data: ["趋势查看频率", "查看时长", "回看后是否进入 Feedback"],
  },
};

export default function ResearchPanel({ screen }) {
  const g = GUIDE[screen] || GUIDE.dashboard;

  return (
    <div style={styles.sideCard}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 900 }}>{g.title}</div>
          <div style={{ ...styles.small, marginTop: 4 }}>
            这部分是给你录屏/自检用的研究提示；默认可隐藏，避免给导师造成“杂讯”。
          </div>
        </div>
        <Badge accent icon={<Info size={14} />}>Guide</Badge>
      </div>

      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
        <Card title="Research aim（研究目标）">
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.5, color: "#374151" }}>
            {g.aim.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Card>

        <Card title="How to operate（操作指导）">
          <ol style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.5, color: "#374151" }}>
            {g.actions.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
        </Card>

        <Card title="What to observe（评估关注点）">
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.5, color: "#374151" }}>
            {g.observe.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Card>

        <Card title="Proposed data/measures（数据/指标）">
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.5, color: "#374151" }}>
            {g.data.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
