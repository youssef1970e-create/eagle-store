import { motion } from 'motion/react';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="relative"
      >
        <div className="w-24 h-24 border-4 border-accent/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-24 h-24 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-accent font-bold text-xl">E</span>
        </div>
      </motion.div>
    </div>
  );
}
