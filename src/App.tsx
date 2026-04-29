import { useEffect, useMemo, useState } from "react";
import { buildAutomationRun, buildDashboard, formatCurrency, type AutomationRun } from "./automation";
import { domainConfig } from "./domain";
import "./styles.css";

const demoSteps = [
  { label: "New message", detail: "A new lead comes in from the website, chat, or inbox." },
  { label: "Quick check", detail: "The app looks for useful signals like urgency, budget, and topic." },
  { label: "Pick owner", detail: "It suggests the person or queue that should handle the lead." },
  { label: "Draft reply", detail: "It prepares a note and follow-up that can be reviewed." },
  { label: "Human review", detail: "Important or risky leads still need a person to approve them." },
  { label: "Save result", detail: "The final output is ready to send to a CRM or automation tool." }
];

const sampleItems = domainConfig.sampleItems;

const priorityLabel: Record<AutomationRun["priority"], string> = {
  critical: "Needs review",
  high: "High priority",
  medium: "Normal queue",
  low: "Low priority"
};

export default function App() {
  const firstRun = useMemo(() => buildAutomationRun(sampleItems[0], domainConfig), []);
  const dashboard = useMemo(() => buildDashboard(sampleItems, domainConfig), []);
  const [selectedId, setSelectedId] = useState(firstRun.item.id);
  const [activeRun, setActiveRun] = useState<AutomationRun>(firstRun);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedOutput, setSelectedOutput] = useState(firstRun.draftOutputs[1]?.label ?? firstRun.draftOutputs[0]?.label ?? "");

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setStep((current) => (current + 1) % demoSteps.length);
    }, 1800);

    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    setSelectedOutput(activeRun.draftOutputs[1]?.label ?? activeRun.draftOutputs[0]?.label ?? "");
  }, [activeRun]);

  const chooseMessage = (itemId: string) => {
    const item = sampleItems.find((candidate) => candidate.id === itemId);
    if (!item) return;
    setSelectedId(item.id);
    setActiveRun(buildAutomationRun(item, domainConfig));
    setStep(0);
    setSaved(false);
    setPlaying(true);
  };

  const runCheck = async () => {
    setBusy(true);
    setSaved(false);
    setPlaying(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: selectedId, liveMode: false })
      });
      const data = await response.json();
      setActiveRun(data.run ?? buildAutomationRun(activeRun.item, domainConfig));
      setStep(3);
    } finally {
      setBusy(false);
    }
  };

  const saveWork = async () => {
    setBusy(true);
    try {
      await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: selectedId, integration: "HubSpot" })
      });
      setSaved(true);
      setStep(5);
      setPlaying(false);
    } finally {
      setBusy(false);
    }
  };

  const selectedDraft =
    activeRun.draftOutputs.find((draft) => draft.label === selectedOutput)?.content ?? activeRun.draftOutputs[0]?.content ?? "";
  const statusText = saved ? "Saved to mock CRM payload" : priorityLabel[activeRun.priority];
  const scoreTone = activeRun.priority === "critical" ? "critical" : activeRun.priority === "high" ? "high" : "normal";

  return (
    <main className="app-shell" style={{ "--accent": domainConfig.accent } as React.CSSProperties}>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Lead triage demo</p>
          <h1>Review a lead, suggest the owner, and draft the follow-up in one place.</h1>
          <p className="hero-text">
            This page is built to feel like a practical internal tool. Pick a sample lead, run the check,
            review the output, and save the result when it looks right.
          </p>
          <div className="hero-actions">
            <button className="primary" disabled={busy} onClick={runCheck}>
              {busy ? "Checking..." : "Run the demo"}
            </button>
            <button onClick={() => setPlaying((current) => !current)}>
              {playing ? "Pause flow" : "Play flow"}
            </button>
          </div>
        </div>

        <div className="hero-stats">
          {dashboard.kpis.slice(0, 4).map((kpi) => (
            <article className="stat-card" key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.label === "Value in queue" ? formatCurrency(Number(activeRun.item.value + sampleItems[1].value + sampleItems[2].value)) : kpi.value}</strong>
              <small>{kpi.helper}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="workspace">
        <aside className="panel inbox-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Inbox</p>
              <h2>Sample leads</h2>
            </div>
            <span className="mini-badge">{sampleItems.length} items</span>
          </div>

          <div className="message-list">
            {sampleItems.map((item) => {
              const run = buildAutomationRun(item, domainConfig);
              return (
                <button
                  className={item.id === selectedId ? "message-button active" : "message-button"}
                  key={item.id}
                  onClick={() => chooseMessage(item.id)}
                >
                  <div className="message-topline">
                    <strong>{item.customer}</strong>
                    <span className={`pill ${run.priority}`}>{run.priority}</span>
                  </div>
                  <span>{item.title}</span>
                  <small>{item.source} · {formatCurrency(item.value)}</small>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="panel flow-panel" aria-label="Lead routing flow">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Workflow</p>
              <h2>How this lead moves</h2>
            </div>
            <span className="mini-badge">{demoSteps[step].label}</span>
          </div>

          <div className="flow-stage">
            <div className="lead-card">
              <span>{activeRun.item.source}</span>
              <strong>{activeRun.item.customer}</strong>
              <p>{activeRun.item.description}</p>
              <div className="lead-tags">
                {activeRun.item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="flow-copy">
              <div className="step-track" aria-hidden="true">
                {demoSteps.map((demoStep, index) => (
                  <span className={index <= step ? "step-dot active" : "step-dot"} key={demoStep.label} />
                ))}
              </div>
              <h3>{demoSteps[step].label}</h3>
              <p>{demoSteps[step].detail}</p>
            </div>
          </div>

          <div className="step-buttons">
            {demoSteps.map((demoStep, index) => (
              <button
                className={index === step ? "step-button active" : "step-button"}
                key={demoStep.label}
                onClick={() => {
                  setPlaying(false);
                  setStep(index);
                }}
              >
                {demoStep.label}
              </button>
            ))}
          </div>
        </section>

        <aside className="panel summary-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Decision</p>
              <h2>Current result</h2>
            </div>
            <span className={`score-chip ${scoreTone}`}>{activeRun.score}/100</span>
          </div>

          <div className="summary-grid">
            <article>
              <span>Suggested owner</span>
              <strong>{activeRun.route}</strong>
            </article>
            <article>
              <span>Status</span>
              <strong>{statusText}</strong>
            </article>
            <article>
              <span>Confidence</span>
              <strong>{activeRun.confidence}%</strong>
            </article>
            <article>
              <span>Category</span>
              <strong>{activeRun.category}</strong>
            </article>
          </div>

          <div className="summary-block">
            <h3>Why it landed here</h3>
            <div className="token-list">
              {activeRun.matchedKeywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
          </div>

          <div className="summary-block">
            <h3>Next actions</h3>
            <ul className="plain-list">
              {activeRun.nextBestActions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="lower-grid">
        <section className="panel outputs-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Outputs</p>
              <h2>What the app prepares</h2>
            </div>
            <button className="primary" disabled={busy} onClick={saveWork}>
              {saved ? "Saved" : "Approve and save"}
            </button>
          </div>

          <div className="output-tabs">
            {activeRun.draftOutputs.map((draft) => (
              <button
                className={draft.label === selectedOutput ? "output-tab active" : "output-tab"}
                key={draft.label}
                onClick={() => setSelectedOutput(draft.label)}
              >
                {draft.label}
              </button>
            ))}
          </div>

          <pre>{selectedDraft}</pre>
        </section>

        <section className="panel timeline-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Timeline</p>
              <h2>Run history</h2>
            </div>
          </div>

          <div className="timeline-list">
            {activeRun.timeline.map((entry) => (
              <article className="timeline-item" key={`${entry.at}-${entry.event}`}>
                <span>{entry.at}</span>
                <div>
                  <strong>{entry.event}</strong>
                  <p>{entry.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
