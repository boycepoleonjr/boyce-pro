"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { 
  Atom, Bitcoin, Gamepad2, Rocket, Code, Lightbulb, X, Github, Linkedin, Disc, Instagram, ArrowRight, ChevronDown
} from 'lucide-react';
import { useState } from 'react';

// Animated typing effect (placeholder for now, actual implementation would involve a useEffect and state)
const Typewriter = ({ text }: { text: string }) => {
  return <span className="font-mono">{text}</span>;
};

// Accordion component
const Accordion = ({ title, content }: { title: string; content: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden">
      <button
        className="flex justify-between items-center w-full px-6 py-4 text-left text-white bg-zinc-900 hover:bg-zinc-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold">{title}</h3>
        <ChevronDown className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-zinc-950 text-zinc-300">
          {content}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <Nav />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Hero Section */}
        <section id="hero" className="text-center space-y-8 pt-16 scroll-mt-16">
          <div className="flex justify-center mb-8">
            <Image
              src="https://avatars.githubusercontent.com/u/17016723?v=4"
              alt="Boyce Poleon Jr. Profile"
              width={200}
              height={200}
              className="rounded-full border-4 border-[#f7931a] shadow-lg"
            />
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-tight">
            Boyce Poleon Jr.
          </h1>
          <p className="text-2xl md:text-3xl text-zinc-300 max-w-3xl mx-auto">
            <Typewriter text="Full-stack TypeScript dev. Founder. Building AI operator teams." />
          </p>
        </section>

        {/* "What I Believe In" - Passion Cards */}
        <section id="beliefs" className="space-y-12 scroll-mt-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white">What I Believe In</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 space-y-4 text-center hover:shadow-2xl hover:border-[#f7931a] transition-all duration-300">
              <div className="flex justify-center">
                <Atom size={48} className="text-[#f7931a]" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Artificial Intelligence</h3>
              <p className="text-zinc-400">Building autonomous agent teams that redefine business operations and unlock unprecedented efficiency.</p>
            </div>
            {/* Bitcoin Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 space-y-4 text-center hover:shadow-2xl hover:border-[#f7931a] transition-all duration-300">
              <div className="flex justify-center">
                <Bitcoin size={48} className="text-[#f7931a]" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Financial Sovereignty</h3>
              <p className="text-zinc-400">Advocating for Bitcoin as the bedrock of a fair, transparent, and censorship-resistant global financial system.</p>
            </div>
            {/* eSports Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 space-y-4 text-center hover:shadow-2xl hover:border-[#f7931a] transition-all duration-300">
              <div className="flex justify-center">
                <Gamepad2 size={48} className="text-[#f7931a]" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Esports as Sport</h3>
              <p className="text-zinc-400">Elevating competitive gaming to its rightful place as a legitimate, thrilling, and strategic athletic endeavor.</p>
            </div>
          </div>
        </section>

        {/* "What I'm Building" - Expandable Cards (Accordions) */}
        <section id="building" className="space-y-12 scroll-mt-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white">What I'm Building</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            <Accordion 
              title="AgentBolt: AI Operator Teams" 
              content={
                <p>AgentBolt is at the forefront of AI innovation, creating autonomous agent teams designed to handle complex business processes. From customer support to data analysis, these AI operators work together seamlessly, enhancing efficiency and enabling businesses to scale faster than ever before.</p>
              } 
            />
            <Accordion 
              title="Luminon Gaming: Esports Organization" 
              content={
                <p>As Founder/CEO, I lead Luminon Gaming, a top 4 Halo Infinite esports organization. We're dedicated to fostering competitive talent, building a vibrant community, and pushing the boundaries of what's possible in professional gaming.</p>
              } 
            />
            <Accordion 
              title="boyce.pro: Personal Website" 
              content={
                <p>This very website is a platform to share my journey, insights, and projects. Built with Next.js 16 and Tailwind CSS v4, it reflects my passion for clean design, robust development, and effective communication.</p>
              } 
            />
          </div>
        </section>

        {/* "My Perspective" - Quote-style blocks */}
        <section id="perspective" className="space-y-12 scroll-mt-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white">My Perspective</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 relative overflow-hidden">
              <QuoteIcon className="absolute -top-4 -left-4 text-zinc-700 opacity-20" size={100} />
              <p className="relative z-10 text-xl italic text-zinc-300 leading-relaxed">
                "The future of AI isn't about replacing humans, but augmenting our capabilities and automating the mundane, freeing us to innovate."
              </p>
              <p className="relative z-10 mt-4 text-right text-zinc-500">- On AI Future</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 relative overflow-hidden">
              <QuoteIcon className="absolute -top-4 -left-4 text-zinc-700 opacity-20" size={100} />
              <p className="relative z-10 text-xl italic text-zinc-300 leading-relaxed">
                "Bitcoin is more than just a digital currency; it's a movement towards true financial empowerment and a necessary evolution of trust."
              </p>
              <p className="relative z-10 mt-4 text-right text-zinc-500">- On Bitcoin Adoption</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 relative overflow-hidden">
              <QuoteIcon className="absolute -top-4 -left-4 text-zinc-700 opacity-20" size={100} />
              <p className="relative z-10 text-xl italic text-zinc-300 leading-relaxed">
                "Esports demands the same dedication, strategy, and mental fortitude as traditional sports. Its growth is inevitable and well-deserved."
              </p>
              <p className="relative z-10 mt-4 text-right text-zinc-500">- On Esports Growth</p>
            </div>
          </div>
        </section>

        {/* Social Proof / Connect */}
        <section id="connect" className="space-y-12 scroll-mt-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white">Connect With Me</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="https://twitter.com/boycepoleonjr" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white hover:border-[#f7931a] hover:text-[#f7931a] transition-all duration-300">
              <X size={24} />
              <span className="font-medium">X (@boycepoleonjr)</span>
            </Link>
            <Link href="https://github.com/boycepoleonjr" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white hover:border-[#f7931a] hover:text-[#f7931a] transition-all duration-300">
              <Github size={24} />
              <span className="font-medium">GitHub</span>
            </Link>
            <Link href="https://linkedin.com/in/boycepoleonjr" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white hover:border-[#f7931a] hover:text-[#f7931a] transition-all duration-300">
              <Linkedin size={24} />
              <span className="font-medium">LinkedIn</span>
            </Link>
            <Link href="https://discord.gg/luminongg" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white hover:border-[#f7931a] hover:text-[#f7931a] transition-all duration-300">
              <Disc size={24} />
              <span className="font-medium">Discord (luminongg)</span>
            </Link>
            <Link href="https://instagram.com/boycepoleonjr" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white hover:border-[#f7931a] hover:text-[#f7931a] transition-all duration-300">
              <Instagram size={24} />
              <span className="font-medium">Instagram</span>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="text-center py-16 scroll-mt-16">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
            Let's Build Something Together
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center px-10 py-5 bg-[#f7931a] text-[#0a0a0a] rounded-full font-bold text-xl hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get In Touch <ArrowRight className="ml-3" size={28} />
          </Link>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

// Simple Quote Icon component for styling, could be an actual Lucide icon if available or SVG
const QuoteIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 21h3c6 0 9-4 9-10V3H9v8c0 4-2 6-6 6H3z"></path><path d="M15 21h3c6 0 9-4 9-10V3h-6v8c0 4-2 6-6 6h-3z"></path>
  </svg>
);
