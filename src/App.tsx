import { useState, useEffect, useMemo } from 'react';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Download, ShieldCheck, Zap, Star } from 'lucide-react';
import Layout from './components/Layout';
import AppCard from './components/AppCard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Loader from './components/Loader';
import { AndroidApp, AdminUser } from './types';
import { appService } from './services/appService';
import { authService } from './services/authService';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [apps, setApps] = useState<AndroidApp[]>([]);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    // Initial data load
    const loadData = async () => {
      // Simulate initial loading for professional feel
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const loadedApps = appService.getApps();
      setApps(loadedApps);
      
      const currentUser = authService.getCurrentUser();
      setAdminUser(currentUser);
      
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleLogin = (user: AdminUser) => {
    setAdminUser(user);
    // Refresh apps in case admin made changes
    setApps(appService.getApps());
  };

  const handleLogout = () => {
    authService.logout();
    setAdminUser(null);
    toast.info('Logged out successfully');
  };

  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || app.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [apps, searchQuery, activeCategory]);

  if (isLoading) return <Loader />;

  // If admin is logged in, show dashboard
  if (adminUser?.isLoggedIn) {
    return (
      <>
        <AdminDashboard onLogout={handleLogout} />
        <Toaster position="top-right" theme="dark" richColors />
      </>
    );
  }

  return (
    <Layout 
      onSearch={setSearchQuery} 
      activeCategory={activeCategory} 
      onCategoryChange={setActiveCategory}
    >
      <Toaster position="top-right" theme="dark" richColors />
      <AdminLogin onLogin={handleLogin} />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-accent neon-border"
          >
            <Star size={14} fill="currentColor" />
            Premium Android Repository
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight"
          >
            ELEVATE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">ANDROID EXPERIENCE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed"
          >
            Discover a curated collection of high-performance apps, games, and tools. 
            Safe, fast, and always up-to-date.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <button className="px-8 py-4 bg-accent hover:bg-accent/80 text-white font-bold rounded-2xl shadow-lg shadow-accent/20 transition-all active:scale-95 flex items-center gap-2">
              <Download size={20} />
              Explore Apps
            </button>
            <button className="px-8 py-4 glass glass-hover text-white font-bold rounded-2xl transition-all active:scale-95">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: 'Verified Safe', desc: 'Every app is scanned for malware and security threats.' },
              { icon: Zap, title: 'Fast Downloads', desc: 'High-speed servers ensure your downloads complete in seconds.' },
              { icon: Smartphone, title: 'Optimized', desc: 'Curated apps that run smoothly on any Android device.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl space-y-4 group hover:border-accent/30 transition-colors"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-white/40 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Grid Section */}
      <section className="pb-32" id="apps">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">
                {activeCategory === 'All' ? 'Featured Applications' : `${activeCategory} Collection`}
              </h2>
              <p className="text-white/40">Hand-picked premium content for your device</p>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/20">
              Showing {filteredApps.length} results
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </AnimatePresence>
          </div>

          {filteredApps.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-32 text-center space-y-4"
            >
              <div className="text-5xl">🔍</div>
              <h3 className="text-xl font-bold text-white">No apps found</h3>
              <p className="text-white/40">Try adjusting your search or category filters</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="text-accent hover:underline font-bold uppercase tracking-widest text-xs"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-[40px] p-12 md:p-20 relative overflow-hidden text-center space-y-8">
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-accent/10 via-transparent to-primary/10"></div>
            <h2 className="text-4xl md:text-5xl font-black text-white">STAY IN THE LOOP</h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Subscribe to our newsletter to receive updates on new app releases, 
              modded games, and exclusive tools.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-accent/50 transition-all"
              />
              <button className="px-8 py-4 bg-white text-background font-black rounded-2xl hover:bg-accent hover:text-white transition-all active:scale-95">
                JOIN NOW
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
