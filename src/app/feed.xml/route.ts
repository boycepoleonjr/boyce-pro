export async function GET() {
  const posts = [
    {
      title: 'Why I built an 8-agent AI team instead of hiring',
      slug: 'why-i-built-an-8-agent-ai-team-instead-of-hiring',
      description: 'I run two businesses with zero employees. Here\'s how an AI team of 8 specialized agents handles everything from development to customer support.',
      date: '2025-02-25',
      pubDate: new Date('2025-02-25').toUTCString(),
    }
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Boyce Poleon Jr. - Blog</title>
  <description>Thoughts on AI automation, building scalable systems, and the future of work</description>
  <link>https://boyce.pro</link>
  <atom:link href="https://boyce.pro/feed.xml" rel="self" type="application/rss+xml" />
  <language>en-US</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <managingEditor>boyce@agentbolt.ai (Boyce Poleon Jr.)</managingEditor>
  <webMaster>boyce@agentbolt.ai (Boyce Poleon Jr.)</webMaster>
  <category>Technology</category>
  <category>AI</category>
  <category>Development</category>
  <category>Automation</category>
  
  ${posts.map(post => `
  <item>
    <title>${post.title}</title>
    <description><![CDATA[${post.description}]]></description>
    <link>https://boyce.pro/blog/${post.slug}</link>
    <guid>https://boyce.pro/blog/${post.slug}</guid>
    <pubDate>${post.pubDate}</pubDate>
    <author>boyce@agentbolt.ai (Boyce Poleon Jr.)</author>
    <category>AI</category>
    <category>Business</category>
  </item>
  `).join('')}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}