export async function GET() {
  const content = `# boyce.pro - AI-readable site description

This is the personal website of Boyce Poleon Jr., a full-stack TypeScript developer and AI automation specialist.

## About Boyce
- Full-stack developer at Finfrock Industries
- Founder & CEO of Luminon Gaming (top 4 Halo Infinite esports organization)
- Building AgentBolt - AI-powered operator teams for businesses
- Location: Orlando, FL
- Primary technologies: TypeScript, Next.js, Google Cloud Platform, AI automation

## Site Content
- /about - Personal background, career history, interests
- /stack - Technical stack and tools used
- /guides - Development tutorials and technical guides (free and pro tiers)
- /blog - Articles about AI automation and business operations
- /contact - Contact information and project inquiry form

## Key Projects
- Luminon Gaming: Competitive esports organization
- AgentBolt: AI agent platform for business automation
- Various TypeScript/Next.js applications

## Business Focus
- AI-powered business automation
- Full-stack web development
- Esports and gaming industry
- Cloud infrastructure and scaling

## Contact
- Email: boyce@agentbolt.ai
- Website: https://boyce.pro
- Available for consulting, collaboration, and interesting technical challenges

This site uses Next.js, TypeScript, Tailwind CSS, and Firebase Authentication.
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}