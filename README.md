# AI Lead Routing CRM Copilot

Scores inbound leads, routes them to the right owner, writes CRM notes, and drafts follow-up.

## Client Value

Reply to qualified leads in under 5 minutes and keep CRM records clean.

This is a deployable portfolio demo for B2B founders, agencies, and sales teams. It shows a complete AI automation workflow: intake, deterministic scoring, AI-assisted drafting, human approval, and mock publishing to common business systems.

## Demo Features

- React operations dashboard for leads
- Express API with health, analysis, and publish endpoints
- OpenAI Responses API integration when `OPENAI_API_KEY` is configured
- Deterministic fallback mode so the demo works without paid API access
- Mock adapters for HubSpot, Salesforce, Zapier, Make, n8n, Google Sheets
- Human-in-loop review controls for risky or high-priority items
- Vitest coverage for classification, scoring, and publish payload behavior
- Dockerfile and Render deploy configuration

## Local Setup

```bash
npm install
npm run dev
```

Frontend: http://localhost:5173  
API: http://localhost:8787

## Production Build

```bash
npm run build
npm start
```

## Optional OpenAI Configuration

```bash
cp .env.example .env
export OPENAI_API_KEY="your_api_key"
export OPENAI_MODEL="gpt-5.2"
```

Without an API key, the app uses a deterministic demo engine so clients can still click through the workflow.

## Deployment

Render can use the included `render.yaml`.

Docker:

```bash
docker build -t 01-ai-lead-routing-crm-copilot .
docker run -p 8787:8787 --env-file .env 01-ai-lead-routing-crm-copilot
```

## Upwork Pitch

I can adapt this demo to your real stack by replacing the mock adapters with your CRM, inbox, spreadsheet, calendar, support desk, or ecommerce API. The build can start as a focused workflow automation and grow into a full internal tool.
