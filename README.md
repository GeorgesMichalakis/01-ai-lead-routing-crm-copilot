# AI Lead Routing CRM Copilot

A small demo app that reviews incoming leads, chooses who should handle them, drafts a reply, and prepares a mock CRM update.

## What This Repo Does

This project is a portfolio demo built with React and Express.

You pick one of the sample leads in the UI, click a button, and the app:

- scores the lead with simple rules
- chooses a route such as `Enterprise AE` or `Founder inbox`
- drafts a follow-up email and CRM note
- requires human review for riskier cases
- returns a mock payload showing what could be sent to tools like HubSpot or Salesforce

By default, everything works without an API key. If `OPENAI_API_KEY` is set, the server can also ask OpenAI to improve the draft outputs.

See [BEFORE_AFTER_DEMO.md](./BEFORE_AFTER_DEMO.md) for a short demo script in plain English.

## Why It Exists

This is useful as:

- a portfolio piece
- a starter template for a real lead-routing workflow
- a simple demo for showing clients how an approval-based AI flow could work before connecting real systems

## Demo Features

- React front end with sample leads and a simple animated flow
- Express API with `health`, `analyze`, and `publish` endpoints
- Rule-based scoring and routing
- Optional OpenAI draft improvement
- Mock integrations for HubSpot, Salesforce, Zapier, Make, `n8n`, and Google Sheets
- Human approval step for critical or risky leads
- Tests for scoring, dashboard data, and mock publish behavior
- Dockerfile and Render config for deployment

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

Without an API key, the app stays in rule-based demo mode.

## Deployment

Render can use the included `render.yaml`.

Docker:

```bash
docker build -t 01-ai-lead-routing-crm-copilot .
docker run -p 8787:8787 --env-file .env 01-ai-lead-routing-crm-copilot
```
