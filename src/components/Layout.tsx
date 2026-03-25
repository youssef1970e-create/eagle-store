import React, { useState } from 'react';
import { Search, Menu, X, Github, Twitter, Instagram, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  onSearch: (query: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CATEGORIES = ['All', 'Games', 'Apps', 'Tools', 'Modded'];

export default function Layout({ children, onSearch, activeCategory, onCategoryChange }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent/30 selection:text-accent">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center neon-glow group-hover:rotate-12 transition-transform duration-300">
                <Smartphone className="text-white" size={24} />
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                Eagle <span className="text-accent">Store</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={cn(
                    "text-sm font-bold uppercase tracking-widest transition-all relative py-2",
                    activeCategory === cat ? "text-accent" : "text-white/40 hover:text-white"
                  )}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center relative group w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search apps..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all"
              />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 glass glass-hover rounded-xl text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/5 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    type="text"
                    placeholder="Search apps..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        onCategoryChange(cat);
                        setIsMenuOpen(false);
                      }}
                      className={cn(
                        "py-3 px-4 rounded-xl text-sm font-bold uppercase tracking-widest text-center transition-all",
                        activeCategory === cat ? "bg-accent text-white" : "bg-white/5 text-white/40"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center neon-glow">
                  <Smartphone className="text-white" size={24} />
                </div>
                <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                  Eagle <span className="text-accent">Store</span>
                </span>
              </div>
              <p className="text-white/40 max-w-md leading-relaxed">
                The ultimate destination for premium Android applications. Discover, download, and enjoy the best apps and games with our curated selection.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="p-3 glass glass-hover rounded-xl text-white/40 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="p-3 glass glass-hover rounded-xl text-white/40 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="p-3 glass glass-hover rounded-xl text-white/40 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/40 hover:text-accent transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-white/40 hover:text-accent transition-colors text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-white/40 hover:text-accent transition-colors text-sm">Contact Us</a></li>
                <li><a href="#" className="text-white/40 hover:text-accent transition-colors text-sm">DMCA</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Categories</h4>
              <ul className="space-y-4">
                {CATEGORIES.slice(1).map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => onCategoryChange(cat)}
                      className="text-white/40 hover:text-accent transition-colors text-sm"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/20">
            <p>© 2026 Eagle Store. All rights reserved.</p>
            <p>Designed for Android Enthusiasts</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
