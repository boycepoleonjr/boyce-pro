import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { ContentGate } from '@/lib/auth';
import { Lock, Calendar } from 'lucide-react';

const guides = [
  {
    id: 'nextjs-firebase-auth',
    title: 'Next.js Firebase Authentication Setup',
    description: 'Complete guide to setting up Firebase Auth with Next.js 15, including protected routes and user management.',
    tier: 'free',
    date: '2025-02-20',
    readTime: '8 min read',
  },
  {
    id: 'ai-agents-business',
    title: 'Building AI Agent Teams for Business Operations',
    description: 'How to design, implement, and deploy AI agent workflows that can handle complex business processes autonomously.',
    tier: 'pro',
    date: '2025-02-15',
    readTime: '15 min read',
  },
];

function GuideCard({ guide }: { guide: typeof guides[0] }) {
  const isPro = guide.tier === 'pro';
  
  return (
    <ContentGate tier={guide.tier as 'free' | 'pro'}>
      <div className="border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded ${
              isPro 
                ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-800' 
                : 'bg-green-900/50 text-green-300 border border-green-800'
            }`}>
              {guide.tier.toUpperCase()}
            </span>
            {isPro && <Lock size={16} className="text-zinc-500" />}
          </div>
          <div className="flex items-center text-sm text-zinc-500 space-x-4">
            <span className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{guide.date}</span>
            </span>
            <span>{guide.readTime}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3">
          {guide.title}
        </h3>
        
        <p className="text-zinc-400 leading-relaxed">
          {guide.description}
        </p>
        
        <div className="mt-4 pt-4 border-t border-zinc-800">
          <button className="text-white hover:text-zinc-300 transition-colors font-medium">
            Read Guide →
          </button>
        </div>
      </div>
    </ContentGate>
  );
}

export default function Guides() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Nav />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Guides
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              In-depth tutorials and guides on modern web development, AI automation, and building scalable systems
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">All Guides</h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-zinc-400">Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-zinc-400">Pro</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {guides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-12 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Want more guides?</h3>
            <p className="text-zinc-400 mb-6">
              Pro members get access to advanced tutorials on AI automation, infrastructure design, and scaling strategies.
            </p>
            <button className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-zinc-100 transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}