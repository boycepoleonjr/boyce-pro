import Link from 'next/link';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { ArrowRight, Building2, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Nav />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              Boyce Poleon Jr.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto">
              Full-stack developer. Founder. Building AI-powered teams.
            </p>
          </div>

          {/* Brief intro */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-zinc-400">
                  <Building2 size={20} />
                  <span className="text-sm uppercase tracking-wide">Current</span>
                </div>
                <p className="text-white">
                  Full-stack developer at Finfrock Industries, building robust TypeScript solutions.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-zinc-400">
                  <Zap size={20} />
                  <span className="text-sm uppercase tracking-wide">Founder</span>
                </div>
                <p className="text-white">
                  CEO of Luminon Gaming, a top 4 Halo Infinite esports organization.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-zinc-400">
                  <ArrowRight size={20} />
                  <span className="text-sm uppercase tracking-wide">Building</span>
                </div>
                <p className="text-white">
                  AgentBolt — AI-powered operator teams for businesses.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <Link 
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-zinc-100 transition-colors"
              >
                Read the blog
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-zinc-700 text-white rounded-lg font-medium hover:border-zinc-600 hover:bg-zinc-900/50 transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}