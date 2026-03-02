import Link from 'next/link';
import Image from 'next/image';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import {
  Code,
  Database,
  Server,
  X,
  Instagram,
  Github,
  Linkedin,
  Bitcoin,
  Mail,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Nav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <section className="text-center py-16 md:py-24 space-y-8">
          <div className="flex flex-col items-center">
            <Image
              src="https://avatars.githubusercontent.com/u/17016723?v=4"
              alt="Boyce Poleon Jr. Profile"
              width={160}
              height={160}
              className="rounded-full border-4 border-[#f7931a] shadow-lg"
            />
            <h1 className="mt-8 text-5xl md:text-7xl font-extrabold text-white leading-tight">
              Hi, I&apos;m <span className="text-[#f7931a]">Boyce</span>
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto">
              Software Architect, Bitcoin Advocate, and Lifelong Builder
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24">
          <h2 className="text-4xl font-bold text-center text-white mb-12">What I Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Software Development */}
            <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-xl text-center border border-zinc-800 hover:border-[#f7931a] transition-all duration-300">
              <Code size={48} className="text-[#f7931a] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">Software Development</h3>
              <p className="text-zinc-400">
                Crafting robust and scalable software solutions with a focus on user experience and performance.
              </p>
            </div>
            {/* Card 2: Bitcoin Advocacy */}
            <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-xl text-center border border-zinc-800 hover:border-[#f7931a] transition-all duration-300">
              <Bitcoin size={48} className="text-[#f7931a] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">Bitcoin Advocacy</h3>
              <p className="text-zinc-400">
                Promoting the adoption and understanding of Bitcoin as a revolutionary financial technology.
              </p>
            </div>
            {/* Card 3: Luminon Gaming */}
            <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-xl text-center border border-zinc-800 hover:border-[#f7931a] transition-all duration-300">
              <Server size={48} className="text-[#f7931a] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">Luminon Gaming</h3>
              <p className="text-zinc-400">
                Leading an esports organization, building communities and fostering competitive excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-16 md:py-24">
          <h2 className="text-4xl font-bold text-center text-white mb-12">My Work</h2>
          <div className="bg-[#1a1a1a] rounded-lg shadow-xl p-8 border border-zinc-800 hover:border-[#f7931a] transition-all duration-300">
            <h3 className="text-3xl font-semibold text-white mb-4">Trusted Superior Home</h3>
            <p className="text-zinc-400 mb-6">
              A modern website redesign and development for a home services company, focusing on clean aesthetics and improved user experience.
            </p>
            <Link
              href="https://trustedsuperiorhome.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#f7931a] text-black rounded-lg font-medium hover:bg-[#e68412] transition-colors"
            >
              View Project
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </section>

        {/* Connect Section */}
        <section className="py-16 md:py-24 text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Connect With Me</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://x.com/boyce_jr" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#f7931a] transition-colors flex items-center space-x-2">
              <X size={32} />
              <span className="sr-only">X (formerly Twitter)</span>
            </a>
            <a href="https://instagram.com/boyce.pro" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#f7931a] transition-colors flex items-center space-x-2">
              <Instagram size={32} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://discord.com/invite/your-invite" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#f7931a] transition-colors flex items-center space-x-2">
              <MessageCircle size={32} />
              <span className="sr-only">Discord</span>
            </a>
            <a href="https://github.com/boyce-jr" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#f7931a] transition-colors flex items-center space-x-2">
              <Github size={32} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://linkedin.com/in/boyce-jr" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#f7931a] transition-colors flex items-center space-x-2">
              <Linkedin size={32} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://www.swanbitcoin.com/boyce-jr" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#f7931a] transition-colors flex items-center space-x-2">
              <Bitcoin size={32} />
              <span className="sr-only">Bitcoin / Swan</span>
            </a>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Get In Touch</h2>
          <div className="max-w-xl mx-auto bg-[#1a1a1a] p-8 rounded-lg shadow-xl border border-zinc-800">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-zinc-300 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 bg-zinc-800 text-white rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#f7931a]"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-zinc-300 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 bg-zinc-800 text-white rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#f7931a]"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-zinc-300 text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 bg-zinc-800 text-white rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#f7931a]"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-[#f7931a] text-black rounded-lg font-medium hover:bg-[#e68412] transition-colors"
              >
                <Mail className="mr-2" size={20} /> Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
