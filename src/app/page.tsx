'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuoteButton from '@/components/QuoteButton';
import SettingsDrawer from '@/components/SettingsDrawer';
import LoginForm from '@/components/LoginForm';
import { Settings } from 'lucide-react';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('quotify_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    // Panic logout shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 'q') {
        localStorage.clear();
        setIsAuthenticated(false);
        setShowSettings(false);
        setShowLogin(false);
        window.location.reload();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
      setShowLogin(false);
      localStorage.setItem('quotify_auth', 'true');
      // Redirect to authenticated home
      window.location.href = '/home/';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Main Quote Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <QuoteButton />
        </motion.div>

        {/* Settings Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          onClick={() => setShowSettings(true)}
          className="fixed top-6 right-6 glass-button p-3 text-white/80 hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings size={20} />
        </motion.button>

        {/* Settings Drawer */}
        <AnimatePresence>
          {showSettings && (
            <SettingsDrawer
              onClose={() => setShowSettings(false)}
              onLoginClick={() => setShowLogin(true)}
              isAuthenticated={isAuthenticated}
            />
          )}
        </AnimatePresence>

        {/* Login Modal */}
        <AnimatePresence>
          {showLogin && (
            <LoginForm
              onClose={() => setShowLogin(false)}
              onLogin={handleLogin}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}