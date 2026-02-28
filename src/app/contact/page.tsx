'use client';

import { useState } from 'react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission would be handled here
    // For now, just create a mailto link
    const subject = `Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:boyce@agentbolt.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Nav />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Open to consulting, collaboration, and interesting problems
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none resize-none"
                    placeholder="Tell me about your project, question, or collaboration idea..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-zinc-100 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Let's Connect</h2>
                <p className="text-zinc-400 leading-relaxed">
                  Whether you're looking for technical consulting, want to collaborate on a project, 
                  or just have an interesting problem to solve, I'd love to hear from you.
                </p>
              </div>

              {/* Direct Email */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Direct Email</h3>
                <a 
                  href="mailto:boyce@agentbolt.ai"
                  className="flex items-center space-x-3 text-zinc-300 hover:text-white transition-colors"
                >
                  <Mail size={20} />
                  <span>boyce@agentbolt.ai</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Social</h3>
                <div className="space-y-3">
                  <a
                    href="https://twitter.com/boycepoleonjr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-zinc-300 hover:text-white transition-colors"
                  >
                    <Twitter size={20} />
                    <span>@boycepoleonjr</span>
                  </a>
                  
                  <a
                    href="https://github.com/boycepoleonjr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-zinc-300 hover:text-white transition-colors"
                  >
                    <Github size={20} />
                    <span>boycepoleonjr</span>
                  </a>
                  
                  <a
                    href="https://linkedin.com/in/boycepoleonjr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-zinc-300 hover:text-white transition-colors"
                  >
                    <Linkedin size={20} />
                    <span>boycepoleonjr</span>
                  </a>
                </div>
              </div>

              {/* What I'm Looking For */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">What I'm Looking For</h3>
                <ul className="space-y-2 text-zinc-400">
                  <li>• AI automation and agent development projects</li>
                  <li>• Full-stack TypeScript development work</li>
                  <li>• Infrastructure and scaling challenges</li>
                  <li>• Esports and gaming industry opportunities</li>
                  <li>• Interesting technical problems to solve</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}