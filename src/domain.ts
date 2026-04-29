import type { DomainConfig } from "./automation";

export const domainConfig: DomainConfig = {
  "slug": "01-ai-lead-routing-crm-copilot",
  "title": "AI Lead Routing CRM Copilot",
  "tagline": "Reviews incoming leads, suggests an owner, drafts a reply, and prepares a CRM note.",
  "workflow": "Lead review and follow-up",
  "audience": "B2B founders, agencies, and sales teams",
  "itemNoun": "lead",
  "itemPlural": "leads",
  "primaryAction": "Route lead",
  "accent": "#2563eb",
  "businessGoal": "Help the team respond faster without skipping human review.",
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
      "Leads arrive from different places and someone has to check them one by one.",
      "The team copies details between tools, decides priority manually, and writes the same notes and replies over and over.",
      "Important leads can wait too long when everything lands in the same queue."
    ],
    "whatWeProvide": [
      "A React and Express app that runs the lead-review flow end to end.",
      "Rule-based scoring and routing, with optional OpenAI help for better drafts.",
      "A person still reviews risky items before anything is saved or sent.",
      "Mock CRM payloads, tests, and deploy files are included."
    ],
    "afterTitle": "Automated lead routing and CRM follow-up",
    "afterState": [
      "Each lead gets a quick first pass automatically.",
      "The app suggests the owner and writes the first draft.",
      "A person can review the result before it goes to a CRM or other tool."
    ],
    "demoFlow": [
      "Open the dashboard and show the sample leads.",
      "Pick one lead and explain that this step is often handled manually.",
      "Click \"Run the demo\" to score it and draft the outputs.",
      "Review the suggested owner, status, and reply draft.",
      "Save the result to show the mock CRM handoff.",
      "Explain that the same flow can later connect to a real CRM."
    ],
    "successMetrics": [
      "Less manual triage",
      "Faster first response",
      "Important leads handled sooner",
      "Cleaner records",
      "Human approval kept for risky cases"
    ],
    "clientOffer": "I can swap the sample data and mock payloads for your real CRM, inbox, and routing rules."
  }
};
