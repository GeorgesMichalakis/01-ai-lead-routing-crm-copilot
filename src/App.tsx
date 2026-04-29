import { useEffect, useMemo, useState } from "react";
import { buildAutomationRun, type AutomationRun } from "./automation";
import { domainConfig } from "./domain";
import "./styles.css";

const demoSteps = [
  { label: "New message", detail: "Someone asks about your service." },
  { label: "Quick check", detail: "The app looks for clues like budget, urgency, and topic." },
  { label: "Pick a person", detail: "It chooses who should handle the message." },
  { label: "Write draft", detail: "It prepares a note and a reply you can edit." },
  { label: "You approve", detail: "Nothing is sent until a person checks it." },
  { label: "Saved", detail: "The approved work is ready for your sales tool." }
];

const sampleItems = domainConfig.sampleItems;

export default function App() {
  const firstRun = useMemo(() => buildAutomationRun(sampleItems[0], domainConfig), []);
  const [selectedId, setSelectedId] = useState(firstRun.item.id);
  const [activeRun, setActiveRun] = useState<AutomationRun>(firstRun);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setStep((current) => (current + 1) % demoSteps.length);
    }, 1800);

    return () => window.clearInterval(timer);
  }, [playing]);

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

  const followUpDraft = activeRun.draftOutputs.find((draft) => draft.label === "Follow-up email")?.content ?? "";
  const statusText = saved ? "Saved for follow-up" : activeRun.priority === "critical" ? "Needs a person to review" : "Ready to review";

  return (
    <main className="simple-shell" style={{ "--accent": domainConfig.accent } as React.CSSProperties}>
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Simple lead triage demo</p>
          <h1>Turn a new customer message into a ready-to-send reply.</h1>
          <p>
            This demo shows one useful job: read an incoming message, decide who should handle it,
            and draft the follow-up so the team can respond faster.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary" disabled={busy} onClick={runCheck}>
            {busy ? "Checking..." : "Run the demo"}
          </button>
          <button onClick={() => setPlaying((current) => !current)}>
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      </section>

      <section className="demo-card" aria-label="Animated customer message demo">
        <div className="message-list">
          <div className="section-head">
            <p className="eyebrow">Try a message</p>
            <span>{sampleItems.length} samples</span>
          </div>
          {sampleItems.map((item) => (
            <button
              className={item.id === selectedId ? "message-button active" : "message-button"}
              key={item.id}
              onClick={() => chooseMessage(item.id)}
            >
              <strong>{item.customer}</strong>
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        <div className="animation-area">
          <div className="step-track" aria-hidden="true">
            {demoSteps.map((demoStep, index) => (
              <span className={index <= step ? "step-dot active" : "step-dot"} key={demoStep.label} />
            ))}
          </div>

          <div className={`floating-message step-${step}`}>
            <span>{activeRun.item.source}</span>
            <strong>{activeRun.item.customer}</strong>
            <small>{activeRun.item.description}</small>
          </div>

          <div className="step-copy">
            <span>{demoSteps[step].label}</span>
            <h2>{demoSteps[step].detail}</h2>
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
        </div>

        <aside className="result-panel">
          <div className="panel-badge">{activeRun.priority}</div>
          <dl>
            <div>
              <dt>Suggested owner</dt>
              <dd>{activeRun.route}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{statusText}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{activeRun.category}</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="draft-card">
        <div className="draft-intro">
          <p className="eyebrow">Draft reply</p>
          <h2>What the app prepares</h2>
          <p>The operator can review this before anything is saved.</p>
        </div>
        <pre>{followUpDraft}</pre>
        <button className="primary" disabled={busy} onClick={saveWork}>
          {saved ? "Saved" : "Approve and save"}
        </button>
      </section>
    </main>
  );
}
