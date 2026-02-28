import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

const stackCategories = [
  {
    title: 'Languages',
    items: [
      { name: 'TypeScript', description: 'Primary language for all projects' },
      { name: 'Python', description: 'AI/ML and automation scripts' },
      { name: 'SQL', description: 'Database queries and optimization' },
    ]
  },
  {
    title: 'Frameworks',
    items: [
      { name: 'Next.js', description: 'Full-stack React framework' },
      { name: 'React', description: 'Frontend component library' },
      { name: 'Node.js', description: 'Server-side JavaScript runtime' },
      { name: 'Express', description: 'Web application framework' },
    ]
  },
  {
    title: 'Infrastructure',
    items: [
      { name: 'Google Cloud Platform', description: 'Cloud provider of choice' },
      { name: 'Cloudflare', description: 'DNS, CDN, and edge computing' },
      { name: 'Docker', description: 'Containerization and deployment' },
      { name: 'WireGuard', description: 'Secure VPN tunneling' },
    ]
  },
  {
    title: 'AI & Automation',
    items: [
      { name: 'Claude', description: 'Advanced reasoning and coding assistance' },
      { name: 'OpenClaw', description: 'Agent orchestration platform' },
      { name: 'Gemini', description: 'Google\'s AI model for various tasks' },
      { name: 'Anthropic API', description: 'Programmatic AI integration' },
    ]
  },
  {
    title: 'DevOps',
    items: [
      { name: 'GitHub Actions', description: 'CI/CD workflows' },
      { name: 'GitLab CI', description: 'Self-hosted automation' },
      { name: 'Terraform', description: 'Infrastructure as code' },
      { name: 'Kubernetes', description: 'Container orchestration' },
    ]
  },
  {
    title: 'Tools',
    items: [
      { name: 'Obsidian', description: 'Knowledge management and note-taking' },
      { name: 'Asana', description: 'Project and task management' },
      { name: 'Vercel', description: 'Frontend deployment platform' },
      { name: 'VS Code', description: 'Primary code editor' },
    ]
  },
];

export default function Stack() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Nav />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              My Stack
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Tools and technologies I use to build scalable applications and automate complex workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stackCategories.map((category) => (
              <div key={category.title} className="space-y-4">
                <h2 className="text-xl font-bold text-white border-b border-zinc-800 pb-2">
                  {category.title}
                </h2>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <div key={item.name} className="space-y-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-sm text-zinc-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-800 pt-12">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-white">Philosophy</h2>
              <p className="text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                I believe in using the right tool for the job while maintaining consistency across the stack. 
                TypeScript provides type safety and developer experience, while cloud infrastructure ensures 
                scalability and reliability. AI tools amplify productivity, and proper DevOps practices 
                enable rapid iteration without sacrificing quality.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}