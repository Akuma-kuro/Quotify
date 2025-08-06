'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import FriendsList from '@/components/FriendsList';
import PingButton from '@/components/PingButton';
import PanicLogout from '@/components/PanicLogout';
import QuoteButton from '@/components/QuoteButton';
import { Users, MessageCircle, Settings, LogOut } from 'lucide-react';

export default function AuthenticatedHome() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('quotify_auth');
    if (authStatus !== 'true') {
      router.push('/');
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('quotify_auth');
    setIsAuthenticated(false);
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-2xl p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-2xl font-semibold text-white/90">Welcome Back</h1>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFriends(!showFriends)}
            className="glass-button p-3 text-white/80 hover:text-white"
          >
            <Users size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="glass-button p-3 text-white/80 hover:text-white"
          >
            <LogOut size={20} />
          </motion.button>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <h2 className="text-lg font-medium text-white/90 mb-4 flex items-center gap-2">
              <MessageCircle size={20} />
              Daily Quote
            </h2>
            <QuoteButton />
          </motion.div>

          {/* Ping Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <h2 className="text-lg font-medium text-white/90 mb-4">Quick Ping</h2>
            <div className="grid grid-cols-3 gap-4">
              <PingButton type="green" label="Casual" />
              <PingButton type="yellow" label="Important" />
              <PingButton type="red" label="Urgent" />
            </div>
          </motion.div>
        </div>

        {/* Friends Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className={`${showFriends ? 'block' : 'hidden lg:block'}`}
        >
          <FriendsList />
        </motion.div>
      </div>

      {/* Panic Logout */}
      <PanicLogout />
    </div>
  );
}