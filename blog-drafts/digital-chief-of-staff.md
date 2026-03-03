---
title: "I Replaced My Morning Routine With an AI Chief of Staff — Here's the Exact Setup"
date: "2026-03-02"
description: "How I built a 24/7 AI executive assistant using OpenClaw and Claude that handles my email, calendar, and daily briefings for $300/month. Complete technical breakdown with copy-pastable configs."
tags: ["ai", "automation", "productivity", "openclaw", "claude", "typescript"]
author: "Boyce Poleon Jr"
---

# I Replaced My Morning Routine With an AI Chief of Staff — Here's the Exact Setup

Six months ago, I was drowning in digital chaos. Thirty browser tabs open, unread emails piling up, switching between WhatsApp, Telegram, Discord, and Gmail all day. I'd check email manually, forget calendar events, and had zero system for daily triage.

The breaking point came when I missed a critical investor call because I forgot to check my calendar that morning. That's when I realized something: chatbots answer questions. A Chief of Staff anticipates them.

So I built one.

## The Problem: Death by a Thousand Notifications

As CEO of Luminon Gaming (currently ranked top 4 globally in Halo Infinite) and a full-stack developer at Finfrock Industries, context-switching was killing my productivity. My morning routine was basically digital whack-a-mole:

- Check Gmail (personal + 3 business accounts)
- Scan WhatsApp for urgent messages
- Review Telegram groups for project updates
- Check Discord for team communications
- Look at calendar to see what I'm supposed to be doing
- Check Asana for task updates
- Repeat this cycle 47 times throughout the day

I was a human notification center, not an executive.

## The Realization: Infrastructure vs Intelligence

Most people think the AI revolution is about smarter models. That's wrong. The revolution is about infrastructure.

A chatbot waits for you to ask questions. A Chief of Staff knows what you need before you ask.

The difference isn't the brain (Claude Opus vs GPT-4 vs whatever) — it's the body. The infrastructure that lets an AI:

1. **Remember** your preferences and context across sessions
2. **Work proactively** while you sleep
3. **Meet you** where you already are (WhatsApp, Telegram, email)
4. **Delegate** work to specialized workers
5. **Actually do things** beyond just generating text

I needed to stop thinking about AI as a conversation partner and start thinking about it as an employee.

## Building Gina: My Digital Chief of Staff

I used OpenClaw, an open-source AI agent platform I've been contributing to. Unlike hosted solutions that trap you in their ecosystem, OpenClaw runs locally and gives you complete control over your agent's capabilities.

Meet Gina (☘️): Claude Opus 4 with persistent memory, proactive scheduling, and access to 19 specialized skills including Gmail, Calendar, GitHub, weather, image generation, and TTS.

### Core Architecture Decisions

**The model is the brain. OpenClaw is the body.**

I configured Gina with a two-tier thinking architecture:

- **Opus** (expensive, strategic) for direct conversation, decisions, and review
- **Sonnet** (5x cheaper) for all worker tasks: research, coding, content generation

This setup runs me about $10-15/day for a 24/7 executive assistant. Less than a coffee budget.

## Technical Implementation

Here's exactly how I configured Gina. All of these snippets go in your `openclaw.json`:

### 1. Identity Declaration

Your agent needs to know who it is:

```json
{
  "identity": {
    "name": "Gina",
    "emoji": "☘️",
    "avatar": "avatars/gina.jpg"
  }
}
```

### 2. Model Fallback Chain

Never go dark. If Opus is down, fall back to Sonnet:

```json
{
  "model": {
    "primary": "anthropic/claude-opus-4-6",
    "fallbacks": ["anthropic/claude-sonnet-4-20250514"]
  }
}
```

### 3. Heartbeat Active Hours

This is where the magic happens. Gina checks in every 30 minutes during active hours, but stays quiet at night. Heartbeats run on the cheaper Sonnet model to control costs:

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

### 4. Sub-agent Cost Control

When Gina needs to delegate work, all sub-agents use Sonnet by default:

```json
{
  "subagents": {
    "maxConcurrent": 8,
    "model": "anthropic/claude-sonnet-4-20250514"
  }
}
```

This is like hiring 8 interns that work at machine speed for pennies.

### 5. Link Auto-Fetching

Send Gina a URL and she automatically reads it:

```json
{
  "links": {
    "enabled": true,
    "maxLinks": 3
  }
}
```

### 6. Safety Guardrails

Loop detection prevents runaway automation:

```json
{
  "loopDetection": {
    "enabled": true
  }
}
```

### 7. Security Configuration

All channels use allowlist policy with explicit sender permissions. Here's my WhatsApp setup:

```json
{
  "channels": {
    "whatsapp": {
      "enabled": true,
      "policy": "allowlist",
      "senders": ["+1XXXXXXXXXX"],
      "maxTokens": 1000000
    }
  }
}
```

## The Daily Rhythm: 8 Automated Cron Jobs

Gina runs on a schedule that mirrors my actual day. Here's the complete automation timeline:

| Time | Action | Channel | Model |
|------|--------|---------|--------|
| 6:00 AM | Cost report generated | Silent log | Sonnet |
| 7:30 AM | Morning Briefing | WhatsApp | Sonnet |
| 8:00 AM | Weather + Outfit (M-F) | WhatsApp | Sonnet |
| 9:30 AM | Security Audit Report | Telegram | Sonnet |
| Every 30m | Heartbeat checks | Internal | Sonnet |
| Every 6h | Budget monitoring | Silent/alerts | Sonnet |
| Every 12h | Tool reliability check | Silent/alerts | Sonnet |
| 9:00 PM | Evening wrap-up | WhatsApp | Sonnet |

### Morning Briefing Configuration

This is the cron job that replaced my entire morning routine:

```json
{
  "cron": [
    {
      "name": "Morning Briefing",
      "schedule": {
        "kind": "cron",
        "expr": "30 7 * * 1-5",
        "tz": "America/New_York"
      },
      "payload": {
        "kind": "agentTurn",
        "message": "Morning briefing for Boyce. Check Gmail for urgent unread, calendar for today, Luminon email. Summarize in 3-5 bullets."
      },
      "delivery": {
        "mode": "announce",
        "channel": "whatsapp",
        "to": "+1XXXXXXXXXX"
      }
    }
  ]
}
```

Every weekday at 7:30 AM, I get a WhatsApp message like this:

> ☘️ **Morning Brief - March 2**
> 
> **Email:** 3 urgent (client proposal needs review, Luminon sponsor inquiry, tax doc from accountant)
> 
> **Calendar:** 9:30 standup, 2:00 investor call, 4:30 team practice
> 
> **Weather:** 72°F sunny — good day for the Tesla roof down
> 
> **Priority:** Review that sponsor proposal before investor call

Zero manual checking. Zero missed meetings. Proactive prioritization.

## The Tech Stack

**Infrastructure:**
- OpenClaw (self-hosted on WSL2)
- Qdrant vector database for semantic memory
- Headless Chrome for web automation
- Docker for service management

**AI Models:**
- Claude Opus 4 (primary brain)
- Claude Sonnet 4 (worker model)

**Integrations:**
- Gmail, Calendar, Drive (via gog CLI)
- WhatsApp, Telegram, Discord
- GitHub, Asana, weather APIs
- Text-to-speech, image generation
- 19 specialized skills total

**Persistent Memory System:**
- `MEMORY.md` — curated long-term memory
- `memory/YYYY-MM-DD.md` — daily session logs
- Qdrant semantic search across all memories

Gina wakes up fresh each session but reads her memory files first. Like a human, she maintains context across conversations and learns from past decisions.

## Cost Breakdown: $300-450/Month

Here's the real numbers for running a 24/7 AI Chief of Staff:

**Daily costs (~$10-15/day):**
- Heartbeat checks: 48 × $0.02 = ~$1.00/day
- Morning/evening briefings: ~$0.50/day
- Direct Opus conversations: ~$0.50-2.00/day
- Sub-agent work: ~$2.00-5.00/day
- Cron automations: ~$1.00-3.00/day

**Monthly total: $300-450**

Compare this to hiring a human executive assistant at $3,000-6,000/month. Gina costs less than my coffee budget and never takes vacation.

The key insight: cost control through strategic model usage. Opus for thinking, Sonnet for doing.

## What Changed: Proactive vs Reactive

**Before Gina:**
- Check email manually 15+ times per day
- Constantly context-switching between platforms
- Miss calendar events and deadlines
- Reactive fire-fighting mode
- Decision fatigue from endless micro-tasks

**After Gina:**
- Email summaries delivered to WhatsApp
- Calendar events flagged proactively
- Weather/outfit recommendations
- Automatic task triage and prioritization
- Focus time protected from interruptions

The biggest change isn't time saved — it's cognitive load reduced. I'm no longer a human notification center. I'm back to doing executive work.

## Key Technical Insights

**1. Heartbeats > Webhooks**
Most people think real-time webhooks are the answer. Wrong. Batched heartbeat checks every 30 minutes are more efficient and less fragile.

**2. Model Routing Saves Money**
Using Opus for strategy and Sonnet for execution cuts costs by 80% without sacrificing quality.

**3. Memory Architecture Matters**
The difference between a chatbot and an assistant is persistent memory. Gina remembers decisions, preferences, and context across sessions.

**4. Multi-Channel is Essential**
Your assistant needs to meet you where you are. WhatsApp for urgent stuff, Telegram for team updates, email for formal communications.

**5. Security First**
Allowlist policies, explicit sender permissions, and loop detection are non-negotiable for autonomous operation.

## Try It Yourself: Minimum Viable Config

Want to build your own AI Chief of Staff? Here's the simplest config to get started:

```json
{
  "identity": {
    "name": "YourAssistant",
    "emoji": "🤖"
  },
  "model": {
    "primary": "anthropic/claude-sonnet-4-20250514"
  },
  "heartbeat": {
    "every": "60m",
    "activeHours": {
      "start": "07:00",
      "end": "22:00",
      "timezone": "Your/Timezone"
    }
  },
  "channels": {
    "whatsapp": {
      "enabled": true,
      "policy": "allowlist",
      "senders": ["+1XXXXXXXXXX"]
    }
  },
  "cron": [
    {
      "name": "Morning Brief",
      "schedule": {
        "kind": "cron",
        "expr": "0 8 * * 1-5",
        "tz": "Your/Timezone"
      },
      "payload": {
        "kind": "agentTurn",
        "message": "Give me a morning briefing: check email and calendar for today."
      },
      "delivery": {
        "mode": "announce",
        "channel": "whatsapp",
        "to": "+1XXXXXXXXXX"
      }
    }
  ],
  "skills": ["github", "weather", "web-search"]
}
```

Start with this, then add Gmail integration, more cron jobs, and additional skills as needed.

**Installation:**
1. Install OpenClaw: `npm install -g @openclaw/cli`
2. Run setup: `openclaw setup`
3. Configure your agent with the above JSON
4. Start the gateway: `openclaw gateway start`

## What's Next: AgentBolt

Building Gina taught me that most businesses need AI operators, not AI chatbots. They need systems that work proactively, remember context, and integrate with existing workflows.

That's why I'm launching AgentBolt — managed AI operator teams for businesses. We deploy and maintain OpenClaw agents that handle customer support, sales qualification, content creation, and internal operations.

Instead of spending months configuring your own setup, you get a custom AI workforce deployed in 48 hours.

If you're running a business and drowning in operational tasks like I was, AgentBolt can build you a team of AI operators that work 24/7 for less than the cost of one junior employee.

**Interested?** Email me at boyce@agentbolt.ai or DM me on X [@boycepoleon](https://x.com/boycepoleon).

## The Bottom Line

I haven't checked email manually in four months. I never miss calendar events. My stress levels dropped, my focus time increased, and I'm running Luminon Gaming more effectively than ever.

The infrastructure exists today. The models are ready. The only question is: are you going to keep being a human notification center, or are you ready to hire your first AI employee?

Gina handles the noise so I can focus on the signal. Best hiring decision I ever made.

---

*Boyce Poleon Jr is the Founder/CEO of Luminon Gaming and a full-stack TypeScript developer. He's building AgentBolt to help other businesses deploy AI operator teams. Follow him on X [@boycepoleon](https://x.com/boycepoleon) for more technical breakdowns and AI infrastructure insights.*