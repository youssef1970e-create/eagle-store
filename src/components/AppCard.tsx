import { Download, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { AndroidApp } from '../types';
import { cn } from '../lib/utils';

interface AppCardProps {
  app: AndroidApp;
  onDownload?: (app: AndroidApp) => void;
  key?: string | number;
}

export default function AppCard({ app, onDownload }: AppCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass glass-hover rounded-2xl overflow-hidden group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={app.imageUrl}
          alt={app.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="px-3 py-1 bg-accent/20 border border-accent/50 rounded-full text-xs font-medium text-accent backdrop-blur-md">
            {app.category}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-accent transition-colors">
            {app.name}
          </h3>
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
            v1.0.0
          </span>
        </div>

        <p className="text-sm text-white/60 line-clamp-2 min-h-[2.5rem]">
          {app.description}
        </p>

        <div className="pt-2 flex gap-2">
          <a
            href={app.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all",
              "bg-accent hover:bg-accent/80 text-white neon-glow"
            )}
            onClick={() => onDownload?.(app)}
          >
            <Download size={16} />
            Download
          </a>
          <button className="p-2.5 glass glass-hover rounded-xl text-white/60 hover:text-white">
            <ExternalLink size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
