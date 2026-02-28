'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-zinc-800 bg-[#0a0a0a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0a]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-white">
              boyce.pro
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/about" className="text-zinc-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/stack" className="text-zinc-300 hover:text-white transition-colors">
                Stack
              </Link>
              <Link href="/guides" className="text-zinc-300 hover:text-white transition-colors">
                Guides
              </Link>
              <Link href="/blog" className="text-zinc-300 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-zinc-300 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-300 hover:text-white focus:outline-none focus:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-zinc-800">
            <Link
              href="/about"
              className="block px-3 py-2 text-zinc-300 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/stack"
              className="block px-3 py-2 text-zinc-300 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Stack
            </Link>
            <Link
              href="/guides"
              className="block px-3 py-2 text-zinc-300 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Guides
            </Link>
            <Link
              href="/blog"
              className="block px-3 py-2 text-zinc-300 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-zinc-300 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}