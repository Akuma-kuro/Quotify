'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, Sun, Moon, Type, Share2, ChevronDown, MoreHorizontal, Key } from 'lucide-react';

interface SettingsDrawerProps {
  onClose: () => void;
  onLoginClick: () => void;
  isAuthenticated: boolean;
}

export default function SettingsDrawer({ onClose, onLoginClick, isAuthenticated }: SettingsDrawerProps) {
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(16);
  const [showMore, setShowMore] = useState(false);
  const [showMisc, setShowMisc] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Quotify',
        text: 'Daily inspiration through quotes',
        url: window.location.href,
      });
    } catch (err) {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Could add a toast notification here
    }
  };

  const adjustFontSize = (delta: number) => {
    const newSize = Math.max(12, Math.min(24, fontSize + delta));
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      />

      {/* Drawer */}
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <div className="glass-dark rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Settings</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} className="text-white/80" />
            </button>
          </div>

          {/* Settings Items */}
          <div className="space-y-4">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                <span className="text-white/90">Theme</span>
              </div>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="glass rounded-full p-2 w-12 h-6 flex items-center transition-all duration-300"
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Font Size */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Type size={20} />
                <span className="text-white/90">Font Size</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => adjustFontSize(-2)}
                  className="glass-button px-3 py-1 text-sm"
                >
                  A-
                </button>
                <button
                  onClick={() => adjustFontSize(2)}
                  className="glass-button px-3 py-1 text-sm"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Share2 size={20} />
                <span className="text-white/90">Share Link</span>
              </div>
              <button
                onClick={handleShare}
                className="glass-button px-4 py-2 text-sm"
              >
                Copy Link
              </button>
            </div>

            {/* More Section */}
            <div className="border-t border-white/10 pt-4">
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-3">
                  <MoreHorizontal size={20} />
                  <span className="text-white/90">More</span>
                </div>
                <motion.div
                  animate={{ rotate: showMore ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-white/60" />
                </motion.div>
              </button>

              {/* More Content */}
              <motion.div
                initial={false}
                animate={{ height: showMore ? 'auto' : 0, opacity: showMore ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pl-8">
                  {/* Miscellaneous Section */}
                  <button
                    onClick={() => setShowMisc(!showMisc)}
                    className="flex items-center justify-between w-full text-left mb-2"
                  >
                    <span className="text-white/80 text-sm">Miscellaneous</span>
                    <motion.div
                      animate={{ rotate: showMisc ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={14} className="text-white/60" />
                    </motion.div>
                  </button>

                  {/* Miscellaneous Content */}
                  <motion.div
                    initial={false}
                    animate={{ height: showMisc ? 'auto' : 0, opacity: showMisc ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 pl-4">
                      {!isAuthenticated && (
                        <button
                          onClick={onLoginClick}
                          className="flex items-center gap-2 text-white/70 hover:text-white/90 transition-colors text-sm"
                        >
                          <Key size={14} />
                          Access Account
                        </button>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}