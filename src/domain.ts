import type { DomainConfig } from "./automation";

export const domainConfig: DomainConfig = {
  "slug": "01-ai-lead-routing-crm-copilot",
  "title": "AI Lead Routing CRM Copilot",
  "tagline": "Scores inbound leads, routes them to the right owner, writes CRM notes, and drafts follow-up.",
  "workflow": "Lead routing and CRM follow-up",
  "audience": "B2B founders, agencies, and sales teams",
  "itemNoun": "lead",
  "itemPlural": "leads",
  "primaryAction": "Route lead",
  "accent": "#2563eb",
  "businessGoal": "Reply to qualified leads in under 5 minutes and keep CRM records clean.",
  "integrations": [
    "HubSpot",
    "Salesforce",
    "Zapier",
    "Make",
    "n8n",
    "Google Sheets"
  ],
  "routes": [
    "Enterprise AE",
    "SMB Closer",
    "Founder inbox",
    "Nurture campaign"
  ],
  "categories": [
    {
      "name": "Enterprise opportunity",
      "keywords": [
        "enterprise",
        "security",
        "procurement",
        "budget",
        "team"
      ],
      "route": "Enterprise AE",
      "boost": 30
    },
    {
      "name": "Urgent demo request",
      "keywords": [
        "demo",
        "today",
        "urgent",
        "call",
        "asap"
      ],
      "route": "SMB Closer",
      "boost": 25
    },
    {
      "name": "Partnership",
      "keywords": [
        "partner",
        "reseller",
        "affiliate",
        "agency"
      ],
      "route": "Founder inbox",
      "boost": 12
    },
    {
      "name": "Low intent research",
      "keywords": [
        "pricing",
        "curious",
        "maybe",
        "student"
      ],
      "route": "Nurture campaign",
      "boost": -8
    }
  ],
  "positiveKeywords": [
    "budget",
    "approved",
    "launch",
    "decision",
    "signed",
    "urgent",
    "demo",
    "integration"
  ],
  "riskKeywords": [
    "competitor",
    "refund",
    "angry",
    "spam",
    "student"
  ],
  "outputLabels": [
    "CRM note",
    "Follow-up email",
    "Routing payload"
  ],
  "sampleItems": [
    {
      "id": "lead-1042",
      "title": "Series B SaaS wants CRM automation demo",
      "source": "Website form",
      "customer": "Northstar Analytics",
      "owner": "Maya Chen",
      "value": 42000,
      "urgency": 86,
      "description": "We have budget approved and need a demo this week for a Salesforce and Slack integration. Security review starts next month.",
      "tags": [
        "salesforce",
        "demo",
        "budget",
        "security"
      ],
      "receivedAt": "2026-04-29T08:15:00Z"
    },
    {
      "id": "lead-1043",
      "title": "Agency asks about partner program",
      "source": "LinkedIn DM",
      "customer": "BrightPath Studio",
      "owner": "Unassigned",
      "value": 12000,
      "urgency": 52,
      "description": "We manage three clients that need Zapier and Make automations. Curious about reseller or affiliate options.",
      "tags": [
        "partner",
        "agency",
        "make"
      ],
      "receivedAt": "2026-04-29T09:40:00Z"
    },
    {
      "id": "lead-1044",
      "title": "Student researching pricing",
      "source": "Chat widget",
      "customer": "Individual",
      "owner": "Unassigned",
      "value": 300,
      "urgency": 18,
      "description": "I am a student researching tools and maybe need pricing for a class project.",
      "tags": [
        "pricing",
        "research"
      ],
      "receivedAt": "2026-04-29T10:05:00Z"
    }
  ],
  "demo": {
    "beforeTitle": "Manual lead routing and CRM follow-up",
    "beforeState": [
      "Leads arrive from HubSpot, Salesforce, Zapier and are reviewed one by one.",
      "The team copies details between tools, decides priority manually, and writes repetitive notes or replies from scratch.",
      "High-value or risky leads can sit in the same queue as low-value work, so follow-up quality depends on who notices first."
    ],
    "whatWeProvide": [
      "A deployable React and Express workflow app tailored to B2B founders, agencies, and sales teams.",
      "An AI scoring and routing engine for leads, with deterministic fallback mode and optional live OpenAI Responses API review.",
      "Human-in-loop approval screens, generated drafts, audit-friendly timeline, and mock adapters for HubSpot, Salesforce, Zapier, Make, n8n, Google Sheets.",
      "Production-ready handoff assets: Dockerfile, Render config, environment template, tests, and integration payload examples."
    ],
    "afterTitle": "Automated lead routing and CRM follow-up",
    "afterState": [
      "Leads are classified, scored, routed to Enterprise AE, and prepared for review in seconds.",
      "The operator receives draft outputs, next-best actions, and integration payloads before anything is sent externally.",
      "Approved work is pushed to HubSpot and Salesforce, keeping the source workflow and downstream records aligned."
    ],
    "demoFlow": [
      "Open the dashboard and show the client the incoming leads queue.",
      "Select the highest-value sample lead and explain the before state: manual review, copy/paste, and slow routing.",
      "Click \"Route lead\" to run deterministic AI automation, or enable live OpenAI review if an API key is configured.",
      "Review the score, route, confidence, timeline, and generated outputs with the client.",
      "Click a mock integration button to show exactly what would be sent to HubSpot, Zapier, Make, n8n, or the client tool stack.",
      "Close with the after state: faster response time, cleaner records, and a human approval lane for sensitive work."
    ],
    "successMetrics": [
      "Manual review steps reduced",
      "Average response time improved",
      "High-priority items routed faster",
      "Records updated consistently",
      "Human approval preserved for risky cases"
    ],
    "clientOffer": "I will replace the demo data and mock adapters with your real HubSpot, Salesforce, Zapier setup, connect the API credentials, tune the routing rules, and deploy the workflow for your team."
  }
};
