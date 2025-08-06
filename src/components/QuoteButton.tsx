'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { quotes } from '@/components/data/quotes';
import { RefreshCw } from 'lucide-react';

export default function QuoteButton() {
  const [currentQuote, setCurrentQuote] = useState('');
  const [currentAuthor, setCurrentAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    setCurrentQuote(quote.text);
    setCurrentAuthor(quote.author);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  const handleNewQuote = async () => {
    setIsLoading(true);
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    getRandomQuote();
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Quote Display */}
      <motion.div
        key={currentQuote}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl p-8 text-center"
      >
        <blockquote className="text-lg md:text-xl text-white/90 font-medium leading-relaxed mb-4">
          "{currentQuote}"
        </blockquote>
        <cite className="text-white/60 text-sm font-normal">
          — {currentAuthor}
        </cite>
      </motion.div>

      {/* New Quote Button */}
      <motion.button
        onClick={handleNewQuote}
        disabled={isLoading}
        className="glass-button w-full py-4 text-white/90 font-medium flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.5, repeat: isLoading ? Infinity : 0, ease: "linear" }}
        >
          <RefreshCw size={20} />
        </motion.div>
        {isLoading ? 'Finding inspiration...' : 'New Quote'}
      </motion.button>
    </div>
  );
}