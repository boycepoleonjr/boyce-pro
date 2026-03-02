"use client";

import { useEffect, useRef, useState } from 'react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const ParallaxLanding = () => {
  const [scrollY, setScrollY] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const venturesRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxTransform = (speed: number) => {
    return `translateY(${scrollY * speed}px)`;
  };

  const fadeIn = (ref: React.RefObject<HTMLElement | null>, scrollOffset = 0) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        {
          rootMargin: `${scrollOffset}px`,
          threshold: 0.1,
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref, scrollOffset]);

    return isVisible;
  };

  const HeroVisible = fadeIn(heroRef);
  const AboutVisible = fadeIn(aboutRef);
  const VenturesVisible = fadeIn(venturesRef);
  const PhilosophyVisible = fadeIn(philosophyRef);
  const ConnectVisible = fadeIn(connectRef);


  // Counter animation hook
  const useCountUp = (end: number, start = 0, duration = 2000) => {
    const [count, setCount] = useState(start);
    const ref = useRef<HTMLParagraphElement | null>(null);
    const isVisible = fadeIn(ref);

    useEffect(() => {
      if (!isVisible) {
        setCount(start); // Reset count when not visible
        return;
      }

      let startTime: number;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        setCount(Math.floor(start + (end - start) * percentage));
        if (percentage < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }, [end, start, duration, isVisible]);

    return { count, ref };
  };


  const { count: top4Count, ref: top4Ref } = useCountUp(4);
  const { count: deployDaysCount, ref: deployDaysRef } = useCountUp(5);


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans antialiased relative">
      <Nav />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#1a0a00]"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'radial-gradient(circle at 50% 10%, #f7931a30, transparent 60%)',
            opacity: 0.3,
          }}
        ></div>
        <div
          className="absolute inset-0 z-10"
          style={{
            transform: parallaxTransform(0.1),
            background: 'url(/window.svg) no-repeat center center / contain',
            opacity: 0.05,
          }}
        ></div>
        <div
          className="absolute inset-0 z-20"
          style={{
            transform: parallaxTransform(0.05),
            background: 'url(/globe.svg) no-repeat center center / contain',
            opacity: 0.03,
          }}
        ></div>

        <div className="relative z-30 text-center px-4">
          <h1
            className="text-7xl md:text-8xl lg:text-9xl font-extrabold text-white leading-tight"
            style={{
              textShadow: '0 0 15px rgba(247, 147, 26, 0.5)',
              transform: parallaxTransform(-0.2),
              opacity: 1 - scrollY * 0.005,
            }}
          >
            I build things that matter.
          </h1>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className={`py-20 md:py-32 px-4 relative z-40 bg-[#0a0a0a] transition-all duration-1000 ${AboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="https://avatars.githubusercontent.com/u/17016723?v=4"
              alt="Boyce Poleon Jr."
              layout="fill"
              objectFit="cover"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
          </div>
          <div className="space-y-6 text-lg">
            <h2 className="text-5xl font-bold text-gold-500 mb-4" style={{ color: '#f7931a' }}>About Me</h2>
            <p>
              I&apos;m Boyce Poleon Jr., a full-stack TypeScript developer with a passion for creating impactful digital experiences.
              My journey began in competitive gaming, where I co-founded Luminon Gaming, leading a team to a top 4 global ranking in Halo Infinite esports.
            </p>
            <p>
              This entrepreneurial spirit fuels my current ventures, including AgentBolt, an innovative platform building AI operator teams for small businesses,
              and my freelance work, where I bring complex ideas to life with elegant code.
            </p>
            <p>
              I thrive on challenges, constantly learning and adapting to new technologies to deliver solutions that are not only functional but also awe-inspiring.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-[#1a1a1a] rounded-lg shadow-md">
                <p ref={top4Ref} className="text-4xl font-bold text-gold-500" style={{ color: '#f7931a' }}>{top4Count}+</p>
                <p className="text-sm text-gray-400">Top in the world</p>
              </div>
              <div className="p-4 bg-[#1a1a1a] rounded-lg shadow-md">
                <p ref={deployDaysRef} className="text-4xl font-bold text-gold-500" style={{ color: '#f7931a' }}>{deployDaysCount}-7</p>
                <p className="text-sm text-gray-400">Day deployment cycle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ventures Section */}
      <section ref={venturesRef} className={`py-20 md:py-32 px-4 relative z-40 bg-[#0a0a0a] transition-all duration-1000 ${VenturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gold-500 mb-16" style={{ color: '#f7931a' }}>Ventures</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Luminon Gaming Card */}
            <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-2xl space-y-4 hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-semibold text-white">Luminon Gaming</h3>
              <p className="text-gray-300">
                Co-founder & CEO of a top 4 global Halo Infinite esports team. Built community, managed operations, and fostered talent.
              </p>
              <a href="#" className="inline-block mt-4 text-gold-500 hover:underline" style={{ color: '#f7931a' }}>Learn More &rarr;</a>
            </div>
            {/* AgentBolt Card */}
            <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-2xl space-y-4 hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-semibold text-white">AgentBolt</h3>
              <p className="text-gray-300">
                Founder of a platform creating AI operator teams for small businesses, streamlining operations and boosting efficiency.
              </p>
              <a href="#" className="inline-block mt-4 text-gold-500 hover:underline" style={{ color: '#f7931a' }}>Learn More &rarr;</a>
            </div>
            {/* Freelance Work Card */}
            <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-2xl space-y-4 hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-semibold text-white">Freelance & Consulting</h3>
              <p className="text-gray-300">
                Delivering bespoke full-stack development solutions, from concept to deployment, for diverse clients.
              </p>
              <a href="#" className="inline-block mt-4 text-gold-500 hover:underline" style={{ color: '#f7931a' }}>View Projects &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={philosophyRef} className={`py-20 md:py-32 px-4 relative z-40 bg-[#0a0a0a] transition-all duration-1000 ${PhilosophyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-5xl mx-auto space-y-20">
          <blockquote className="text-center text-4xl md:text-5xl font-bold italic text-white leading-snug">
            &ldquo;AI is not just a tool; it&apos;s a paradigm shift, empowering us to solve problems once deemed insurmountable.&rdquo;
            <p className="mt-8 text-2xl text-gold-500 not-italic" style={{ color: '#f7931a' }}>&mdash; Boyce Poleon Jr.</p>
          </blockquote>
          <blockquote className="text-center text-4xl md:text-5xl font-bold italic text-white leading-snug">
            &ldquo;Bitcoin represents a fundamental re-architecture of trust and value, an essential pillar for a decentralized future.&rdquo;
            <p className="mt-8 text-2xl text-gold-500 not-italic" style={{ color: '#f7931a' }}>&mdash; Boyce Poleon Jr.</p>
          </blockquote>
          <blockquote className="text-center text-4xl md:text-5xl font-bold italic text-white leading-snug">
            &ldquo;In competitive gaming, as in life, true mastery comes from relentless dedication and the courage to innovate.&rdquo;
            <p className="mt-8 text-2xl text-gold-500 not-italic" style={{ color: '#f7931a' }}>&mdash; Boyce Poleon Jr.</p>
          </blockquote>
        </div>
      </section>

      {/* Connect Section */}
      <section ref={connectRef} className={`py-20 md:py-32 px-4 relative z-40 bg-gradient-to-br from-[#0a0a0a] to-[#1a0a00] transition-all duration-1000 ${ConnectVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-8">Connect With Me</h2>
          <p className="text-lg text-gray-300 mb-12">
            Let&apos;s build something extraordinary together. Reach out for collaborations, projects, or just a chat.
          </p>
          <div className="flex justify-center space-x-8 mb-16">
            <a href="https://github.com/BoycePoleon" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-white transition-colors duration-300" style={{ color: '#f7931a' }}>
              <Github size={48} />
            </a>
            <a href="https://linkedin.com/in/boycepoleon" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-white transition-colors duration-300" style={{ color: '#f7931a' }}>
              <Linkedin size={48} />
            </a>
            <a href="https://twitter.com/BoycePoleon" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-white transition-colors duration-300" style={{ color: '#f7931a' }}>
              <Twitter size={48} />
            </a>
            <a href="mailto:boyce@boyce.pro" className="text-gold-500 hover:text-white transition-colors duration-300" style={{ color: '#f7931a' }}>
              <Mail size={48} />
            </a>
          </div>
          <a
            href="/contact"
            className="inline-block bg-[#f7931a] text-[#0a0a0a] font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:bg-white hover:text-[#f7931a] transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ParallaxLanding;
