import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { EditableText } from '@/components/cms';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Nav />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              About
            </h1>
            <p className="text-xl text-zinc-400">
              Full-stack TypeScript developer from Orlando, FL
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Background</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <EditableText 
                  pageId="about"
                  sectionKey="intro"
                  initialContent="I'm Boyce Poleon Jr., a full-stack TypeScript developer passionate about building scalable web applications and AI-powered solutions. Currently based in Orlando, Florida, I work at the intersection of traditional software development and cutting-edge AI automation."
                />
                
                <EditableText 
                  pageId="about"
                  sectionKey="career"
                  initialContent="At Finfrock Industries, I develop and maintain complex web applications using modern TypeScript frameworks. Before that, I gained valuable experience in startup culture at Trellist, where I learned to move fast and build products that scale."
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Projects</h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <EditableText 
                  pageId="about"
                  sectionKey="luminon"
                  initialContent="I founded Luminon Gaming in May 2024, building it into a top 4 Halo Infinite esports organization. We compete at the highest level and run community tournaments, growing the competitive gaming scene."
                />
                
                <EditableText 
                  pageId="about"
                  sectionKey="agentbolt"
                  initialContent="Currently building AgentBolt, a platform for creating AI-powered operator teams for businesses. The vision is to help companies automate complex workflows using intelligent agents that can handle everything from customer support to content creation."
                />
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Interests</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Technology</h3>
                <EditableText 
                  pageId="about"
                  sectionKey="tech"
                  initialContent="Passionate about AI automation, cloud infrastructure, and self-hosted solutions. I believe in owning your stack and building systems that scale."
                />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Gaming</h3>
                <EditableText 
                  pageId="about"
                  sectionKey="gaming"
                  initialContent="Competitive Halo player and esports entrepreneur. I love the strategic depth and teamwork required at the highest levels of competition."
                />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Philosophy</h3>
                <EditableText 
                  pageId="about"
                  sectionKey="philosophy"
                  initialContent="I believe in building products that solve real problems and creating systems that work autonomously. The future is about intelligent automation, not just automation."
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}