'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Eye, EyeOff, Lock } from 'lucide-react';

interface LoginFormProps {
  onClose: () => void;
  onLogin: (success: boolean) => void;
}

export default function LoginForm({ onClose, onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple authentication (in real app, this would be properly secured)
    if (username.trim() && passphrase.length >= 6) {
      // Store user data (in real app, this would be encrypted)
      localStorage.setItem('quotify_user', username);
      localStorage.setItem('quotify_auth', 'true');
      onLogin(true);
    } else {
      setError('Please enter a valid username and passphrase (6+ characters)');
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass-dark rounded-2xl p-8 w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Lock size={24} className="text-white/80" />
              <h2 className="text-xl font-semibold text-white">Account Access</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} className="text-white/80" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="glass-input w-full"
                required
              />
            </div>

            {/* Passphrase */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Passphrase (6+ chars)"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                className="glass-input w-full pr-12"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="glass-button w-full py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                'Enter'
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-white/50 text-xs">
            Emergency logout: Ctrl + Alt + Q
          </div>
        </div>
      </motion.div>
    </>
  );
}