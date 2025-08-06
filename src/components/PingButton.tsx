'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Heart, AlertTriangle } from 'lucide-react';

interface PingButtonProps {
  type: 'green' | 'yellow' | 'red';
  label: string;
}

export default function PingButton({ type, label }: PingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [lastPing, setLastPing] = useState<Date | null>(null);

  const getIcon = () => {
    switch (type) {
      case 'green': return <Heart size={18} />;
      case 'yellow': return <Zap size={18} />;
      case 'red': return <AlertTriangle size={18} />;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case 'green': return 'ping-green hover:bg-ping-green/30';
      case 'yellow': return 'ping-yellow hover:bg-ping-yellow/30';
      case 'red': return 'ping-red hover:bg-ping-red/30';
    }
  };

  const handlePing = async () => {
    setIsLoading(true);
    
    // Simulate ping sending
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setLastPing(new Date());
    setIsLoading(false);

    // Add haptic feedback if available
    if ('vibrate' in navigator) {
      const pattern = type === 'red' ? [100, 50, 100] : [50];
      navigator.vibrate(pattern);
    }
  };

  const timeSincePing = lastPing ? 
    Math.floor((Date.now() - lastPing.getTime()) / 1000) : null;

  return (
    <motion.button
      onClick={handlePing}
      disabled={isLoading}
      className={`glass rounded-xl p-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${getColorClasses()}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col items-center gap-2">
        <motion.div
          animate={isLoading ? { 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          } : {}}
          transition={{ 
            duration: 0.6, 
            repeat: isLoading ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {getIcon()}
        </motion.div>
        
        <div className="text-center">
          <div className="font-medium text-sm">
            {isLoading ? 'Sending...' : label}
          </div>
          {timeSincePing !== null && timeSincePing < 60 && (
            <div className="text-xs opacity-70 mt-1">
              {timeSincePing}s ago
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}