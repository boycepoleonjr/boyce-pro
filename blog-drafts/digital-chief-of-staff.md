---
title: "I built an AI chief of staff that runs my mornings"
date: "2026-03-02"
description: "How I configured OpenClaw to handle email triage, calendar briefings, and daily automation for about $10/day. Full config included."
tags: ["ai", "automation", "productivity", "openclaw"]
author: "Boyce Poleon Jr"
---

# I built an AI chief of staff that runs my mornings

I run an esports org (Luminon Gaming, top 4 in Halo Infinite) and work full-time as a developer at Finfrock Industries. Between those two jobs, plus building AgentBolt on the side, I was checking email on my phone during standups, forgetting calendar events, and cycling through WhatsApp → Telegram → Discord → Gmail about 20 times a day.

I wasn't doing work. I was triaging notifications.

Two weeks ago I stopped. I configured an AI agent called Gina to do all of that for me, and now I wake up to a WhatsApp message that tells me what matters today.

## What actually changed

Every weekday at 7:30am, I get a message like this:

> **Morning brief — March 2**
>
> 🚨 Cursor payment failed ($20, 3am). Fix payment method.
>
> Calendar: Two focus blocks today (10am-12pm, 4-6pm). Otherwise open.
>
> Email: Nothing urgent. Promo stuff from Lyft and LinkedIn.
>
> Luminon email down — OAuth token expired, needs re-auth.

That's a real briefing from this morning. Not a demo. I didn't open Gmail, didn't check my calendar app, didn't scroll through notifications. It was just there when I picked up my phone.

At 9pm, I get an evening wrap-up: what happened today, what's tomorrow, anything I still need to deal with. The loop closes without me thinking about it.

## How it works

I'm using [OpenClaw](https://github.com/openclaw/openclaw), an open-source agent platform that runs locally. The agent (Gina) is Claude Opus 4 for direct conversation, with Claude Sonnet handling background tasks like the morning briefing. This two-tier setup matters because Opus is about 5x more expensive than Sonnet, and most automated tasks don't need the expensive model.

The key pieces:

**Persistent memory.** Gina reads a set of markdown files at the start of every session — long-term memory, daily notes, user preferences. She knows my schedule, my projects, my communication style. This is what separates an assistant from a chatbot. Chatbots are goldfish. Assistants remember that you hate when people say "circle back."

**Scheduled automation.** OpenClaw has cron jobs and heartbeats. Cron runs tasks at specific times (morning briefing at 7:30am). Heartbeats poll every 30 minutes to check for anything that needs attention. Both run on Sonnet to keep costs down.

**Multi-channel.** Gina reaches me on WhatsApp (primary), monitors 9 Telegram groups, and has Discord available. She meets me where I already am instead of making me go to her.

**Sub-agents.** When I ask Gina to do something complex — build three versions of a landing page, for example — she spawns worker agents that run in parallel. I had 4 coding agents building simultaneously yesterday. She coordinates them and reports back when they're done.

## The config

Everything goes in `~/.openclaw/openclaw.json`. Here's what the important parts look like:

### Model with fallbacks

```json
{
  "model": {
    "primary": "anthropic/claude-opus-4-6",
    "fallbacks": [
      "anthropic/claude-sonnet-4-20250514",
      "openai/gpt-5.2",
      "google/gemini-3.1-pro-preview"
    ]
  }
}
```

If Anthropic goes down or hits rate limits, OpenClaw automatically tries the next provider. No dead air.

### Heartbeat with active hours

```json
{
  "heartbeat": {
    "every": "30m",
    "activeHours": {
      "start": "06:30",
      "end": "23:30",
      "timezone": "America/New_York"
    },
    "model": "anthropic/claude-sonnet-4-20250514"
  }
}
```

No reason to burn tokens at 3am. Heartbeats run on Sonnet because checking email doesn't require genius-level reasoning.

### Sub-agents on cheaper models

```json
{
  "subagents": {
    "maxConcurrent": 8,
    "model": "anthropic/claude-sonnet-4-20250514"
  }
}
```

Eight parallel workers, all on Sonnet. Yesterday I had them building three website redesigns and a marketing funnel simultaneously. Total cost for all four: maybe $3.

### Morning briefing cron

```json
{
  "name": "Morning Briefing",
  "schedule": {
    "kind": "cron",
    "expr": "30 7 * * 1-5",
    "tz": "America/New_York"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "Check Gmail for urgent unread, calendar for today, Luminon email. Summarize in 3-5 bullets. Flag anything urgent."
  },
  "delivery": {
    "mode": "announce",
    "channel": "whatsapp",
    "to": "+1XXXXXXXXXX"
  }
}
```

That's it. Five lines of schedule config and a plain-English instruction. OpenClaw handles the Gmail OAuth, calendar API calls, and message delivery.

## The full daily schedule

| Time | What happens | Where |
|------|-------------|-------|
| 6:00am | Cost report logged | Silent |
| 7:30am | Morning briefing (email + calendar) | WhatsApp |
| 8:00am | Weather and outfit suggestion | WhatsApp |
| 9:30am | Security audit | Telegram |
| Every 30m | Heartbeat check | Internal |
| Every 6h | Budget check (alerts at $80/day) | Silent |
| 9:00pm | Evening wrap-up | WhatsApp |
| Monday 8am | Weekly tool reliability report | Telegram |

Eight automated jobs. I set them up once. They just run.

## What it costs

About $10-15 per day, broken down roughly:

- Heartbeats (48/day at ~$0.02 each): $1
- Cron jobs (briefings, reports): $1-3
- Direct conversation with Opus: $2-5
- Sub-agent work: $2-5 depending on workload

That's $300-450/month for an assistant that's available 24/7, never forgets anything, and can spin up 8 workers in parallel when I need something done fast.

I'm not going to compare it to hiring a human assistant because it's not the same thing. It's better at some things (never forgets, works at 3am, reads 50 emails in seconds) and worse at others (can't make phone calls, doesn't have judgment about people). It's a tool, not a person. A really good tool.

## The actual insight

Everyone focuses on which model is smartest. Opus vs GPT-5 vs Gemini. That misses the point.

The model is the brain. The infrastructure is the body.

A brain in a jar can't check your email. It can't send you a WhatsApp at 7:30am. It can't remember that you prefer bullet points over paragraphs. It can't hire 8 workers to build things in parallel.

OpenClaw gives the brain a body: persistent memory, scheduled tasks, multi-channel communication, tool access, sub-agent delegation, and security controls. That's what turns a chatbot into a chief of staff.

## Security stuff (don't skip this)

Running an AI agent with access to your email, calendar, and messaging accounts is a real security decision. Here's what I have configured:

- **Allowlist policy** on every channel. Only my phone number can talk to Gina on WhatsApp. Only my Telegram ID on Telegram.
- **Loop detection** enabled. If the agent gets stuck in a tool loop, it breaks out instead of burning tokens.
- **Budget alerts** at $80/day. I know immediately if something goes wrong.
- **Explicit sender permissions** per channel. No open-door policies.

Don't skip security config. An agent with access to your email is an agent that can send emails. Make sure only you can tell it to do that.

## Try it

Minimum config to get started:

```json
{
  "agents": {
    "defaults": {
      "model": "anthropic/claude-sonnet-4-20250514",
      "heartbeat": {
        "every": "60m",
        "activeHours": {
          "start": "07:00",
          "end": "22:00",
          "timezone": "America/New_York"
        }
      }
    }
  },
  "channels": {
    "whatsapp": {
      "enabled": true,
      "dmPolicy": "allowlist",
      "allowFrom": ["+1XXXXXXXXXX"]
    }
  }
}
```

Install OpenClaw (`npm install -g openclaw`), drop that config in `~/.openclaw/openclaw.json`, start the gateway (`openclaw gateway start`), and link your WhatsApp. You'll have a basic assistant in about 10 minutes. Add cron jobs for briefings, connect Gmail with the gog CLI, and build from there.

## What I'm building next

This setup convinced me that most businesses need AI operators, not chatbots. The remodeling company owner who misses calls at 6pm needs an agent that answers, qualifies leads, and books appointments automatically. The freelancer drowning in email needs a morning briefing.

That's [AgentBolt](https://agentbolt-funnel.pages.dev) — we deploy custom AI operator teams for businesses. Same architecture I described here, configured for your specific workflows, deployed in 3-5 days.

If you're interested, reach out at boyce@agentbolt.ai or find me on [X](https://x.com/boycepoleon).

---

*Boyce Poleon Jr builds things at the intersection of AI, esports, and web development. He's the CEO of Luminon Gaming and the founder of AgentBolt.*
