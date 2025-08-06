import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  // Theme and UI state
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(18);
  const [showSettings, setShowSettings] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassphrase, setLoginPassphrase] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [backoffTime, setBackoffTime] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [showNotificationDetail, setShowNotificationDetail] = useState(null);

  // Quotes array
  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Everything you can imagine is real. - Pablo Picasso",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "The best way to predict the future is to create it. - Peter Drucker",
    "Do what you can, with what you have, where you are. - Theodore Roosevelt",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt"
  ];

  const canvasRef = useRef(null);
  const quoteButtonRef = useRef(null);

  // Initialize with random quote
  useEffect(() => {
    const storedTheme = localStorage.getItem('quotify-theme');
    if (storedTheme) setTheme(storedTheme);
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
    
    // Check for login persistence
    const savedUser = localStorage.getItem('quotify-user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setLoggedIn(true);
        // Initialize mock friends and notifications
        setFriends([
          { id: 1, username: 'alex', avatar: 'https://placehold.co/40/6366f1/ffffff?text=A', mood: 'green', lastSeen: '2m ago' },
          { id: 2, username: 'sam', avatar: 'https://placehold.co/40/10b981/ffffff?text=S', mood: 'yellow', lastSeen: '5m ago' },
          { id: 3, username: 'taylor', avatar: 'https://placehold.co/40/f59e0b/ffffff?text=T', mood: 'red', lastSeen: '1h ago' }
        ]);
        setNotifications([
          { id: 1, from: 'alex', mood: 'green', message: 'Just finished reading an amazing book', timestamp: '2:30 PM', seen: false },
          { id: 2, from: 'sam', mood: 'yellow', message: 'Need to talk about the project', timestamp: '1:45 PM', seen: false }
        ]);
      } catch (e) {
        // Invalid data, clear it
        localStorage.removeItem('quotify-user');
      }
    }
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!canvasRef.current || !loggedIn) return;
      
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 10;
      const y = (clientY / window.innerHeight - 0.5) * 10;
      
      canvasRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [loggedIn]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Panic shortcut
      if (e.ctrlKey && e.altKey && e.key === 'q') {
        handlePanic();
      }
      
      // Escape closes modals
      if (e.key === 'Escape') {
        setShowSettings(false);
        setShowAddFriend(false);
        setShowNotificationDetail(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handlePanic = () => {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser(null);
    setFriends([]);
    setNotifications([]);
    setLoginError('');
    setLoginAttempts(0);
    setBackoffTime(0);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('quotify-theme', newTheme);
  };

  const showQuote = () => {
    if (backoffTime > 0) return;
    
    setQuoteVisible(true);
    // Create ripple effect
    if (quoteButtonRef.current) {
      const ripple = document.createElement('span');
      ripple.className = 'absolute w-8 h-8 bg-white bg-opacity-30 rounded-full animate-ping';
      quoteButtonRef.current.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }
  };

  const hideQuote = () => {
    setQuoteVisible(false);
  };

  const handleLogin = () => {
    if (backoffTime > 0) return;
    
    if (loginUsername.length === 0 || loginPassphrase.length < 6) {
      setLoginError('Username required, passphrase min 6 characters');
      return;
    }

    // Duress detection
    if (loginPassphrase === 'panic' || loginPassphrase === 'clear') {
      handlePanic();
      return;
    }

    // Simulate encryption and storage
    try {
      const userData = {
        username: loginUsername,
        passphraseHash: btoa(loginPassphrase), // In real app: proper hashing
        createdAt: new Date().toISOString(),
        friends: [],
        settings: { theme, fontSize }
      };

      localStorage.setItem('quotify-user', JSON.stringify(userData));
      setCurrentUser(userData);
      setLoggedIn(true);
      setShowSettings(false);
      setLoginError('');
      setLoginAttempts(0);
      
      // Mock initial data
      setFriends([
        { id: 1, username: 'alex', avatar: 'https://placehold.co/40/6366f1/ffffff?text=A', mood: 'green', lastSeen: '2m ago' },
        { id: 2, username: 'sam', avatar: 'https://placehold.co/40/10b981/ffffff?text=S', mood: 'yellow', lastSeen: '5m ago' },
        { id: 3, username: 'taylor', avatar: 'https://placehold.co/40/f59e0b/ffffff?text=T', mood: 'red', lastSeen: '1h ago' }
      ]);
      
      setNotifications([
        { id: 1, from: 'alex', mood: 'green', message: 'Just finished reading an amazing book', timestamp: '2:30 PM', seen: false },
        { id: 2, from: 'sam', mood: 'yellow', message: 'Need to talk about the project', timestamp: '1:45 PM', seen: false }
      ]);
    } catch (error) {
      setLoginAttempts(prev => {
        const newAttempts = prev + 1;
        if (newAttempts >= 3) {
          const waitTime = Math.pow(2, newAttempts - 1);
          setBackoffTime(waitTime);
          setTimeout(() => setBackoffTime(0), waitTime * 1000);
        }
        return newAttempts;
      });
      setLoginError('Login failed. Please try again.');
    }
  };

  const handlePing = (mood) => {
    if (!selectedMood) {
      setSelectedMood(mood);
      return;
    }
    
    // Send ping
    const newNotification = {
      id: Date.now(),
      from: currentUser.username,
      mood: selectedMood,
      message: statusMessage || 'No message',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      seen: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setSelectedMood(null);
    setStatusMessage('');
    
    // Simulate haptic feedback
    if (window.navigator.vibrate) {
      const duration = mood === 'red' ? 200 : mood === 'yellow' ? 100 : 50;
      window.navigator.vibrate(duration);
    }
  };

  const copyQuote = () => {
    navigator.clipboard.writeText(currentQuote).then(() => {
      // Show feedback
      const button = document.querySelector('.share-button');
      if (button) {
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Share Quote';
        }, 2000);
      }
    });
  };

  const markAsSeen = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, seen: true } : notif
      )
    );
  };

  if (!loggedIn) {
    return (
      <div 
        className={`fixed inset-0 transition-colors duration-500 ${
          theme === 'dark' ? 'bg-black' : 'bg-white'
        } overflow-hidden font-['Inter']`}
        style={{ fontSize: `${fontSize}px` }}
      >
        {/* Parallax background */}
        <div 
          ref={canvasRef}
          className="absolute inset-0 transition-transform duration-300 ease-out"
        >
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle, ${
                theme === 'dark' ? 'white' : 'black'
              } 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />
        </div>

        {/* Quote Button */}
        <div className="relative flex items-center justify-center h-screen">
          <button
            ref={quoteButtonRef}
            onClick={quoteVisible ? hideQuote : showQuote}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={() => setHovered(true)}
            onTouchEnd={() => setHovered(false)}
            className={`relative px-8 py-4 rounded-full backdrop-blur-lg border transition-all duration-300 transform hover:translate-y-1 hover:shadow-2xl ${
              theme === 'dark'
                ? 'bg-white bg-opacity-10 border-white border-opacity-20 text-white'
                : 'bg-black bg-opacity-10 border-black border-opacity-20 text-black'
            } hover:scale-105 active:scale-98 shadow-lg`}
            style={{ borderRadius: '2rem' }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-current opacity-20 blur-md -z-10" />
            
            {/* Text that appears on hover */}
            {hovered && !quoteVisible && (
              <span className="transition-opacity duration-300">
                Quote of the Day
              </span>
            )}
            
            {/* Quote text */}
            {quoteVisible && currentQuote && (
              <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
                <div 
                  className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 max-w-2xl mx-4 border border-white border-opacity-20 shadow-2xl animate-fade-in-up"
                  style={{ 
                    animation: 'fadeInUp 0.2s ease-out',
                    borderRadius: '2rem'
                  }}
                >
                  <p className="text-center leading-relaxed font-light" style={{ letterSpacing: '0.2px' }}>
                    {currentQuote}
                  </p>
                </div>
              </div>
            )}
          </button>
        </div>

        {/* Settings Cog */}
        <button
          onClick={() => setShowSettings(true)}
          className={`fixed bottom-6 right-6 w-12 h-12 rounded-full backdrop-blur-lg border transition-all duration-300 hover:scale-110 active:scale-95 ${
            theme === 'dark'
              ? 'bg-white bg-opacity-10 border-white border-opacity-30 text-white'
              : 'bg-black bg-opacity-10 border-black border-opacity-30 text-black'
          } hover:shadow-lg flex items-center justify-center`}
          style={{ borderRadius: '2rem' }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Settings Drawer */}
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowSettings(false)}
            />
            <div 
              className={`relative backdrop-blur-3xl rounded-3xl p-6 border-2 border-white border-opacity-30 shadow-2xl transform transition-all duration-300 animate-slide-up`}
              style={{ 
                background: theme === 'dark' 
                  ? 'rgba(0, 0, 0, 0.7)' 
                  : 'rgba(255, 255, 255, 0.7)',
                borderRadius: '2rem',
                maxWidth: '400px',
                animation: 'slideInUp 0.3s ease-out'
              }}
            >
              <h3 className="text-xl font-light mb-6" style={{ letterSpacing: '0.2px' }}>
                Settings
              </h3>
              
              <div className="space-y-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <span>Theme</span>
                  <button
                    onClick={toggleTheme}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      theme === 'dark' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div 
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        theme === 'dark' ? 'transform translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {/* Font Size Slider */}
                <div>
                  <label className="block mb-2">Font Size: {fontSize}px</label>
                  <input
                    type="range"
                    min="14"
                    max="28"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                {/* Share Quote Button */}
                <button
                  onClick={copyQuote}
                  className="share-button w-full py-3 rounded-full backdrop-blur-lg border transition-all hover:scale-105 active:scale-95 bg-white bg-opacity-10 border-white border-opacity-30"
                  style={{ borderRadius: '2rem' }}
                >
                  Share Quote
                </button>
                
                {/* Nested Details Menus */}
                <details className="group">
                  <summary className="cursor-pointer py-2">More</summary>
                  <div className="ml-4 mt-2 space-y-4">
                    <details className="group">
                      <summary className="cursor-pointer py-2">Advanced</summary>
                      <div className="ml-4 mt-2 space-y-4">
                        <details className="group">
                          <summary className="cursor-pointer py-2">Miscellaneous</summary>
                          <div className="ml-4 mt-4 space-y-4">
                            {/* Login Form */}
                            <div className="space-y-4">
                              <input
                                type="text"
                                placeholder="Username"
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-full backdrop-blur-lg border bg-white bg-opacity-10 border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ borderRadius: '2rem' }}
                                disabled={backoffTime > 0}
                              />
                              <input
                                type="password"
                                placeholder="Passphrase (min 6 chars)"
                                value={loginPassphrase}
                                onChange={(e) => setLoginPassphrase(e.target.value)}
                                className="w-full px-4 py-3 rounded-full backdrop-blur-lg border bg-white bg-opacity-10 border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ borderRadius: '2rem' }}
                                disabled={backoffTime > 0}
                              />
                              {loginError && (
                                <p className="text-red-400 text-sm">{loginError}</p>
                              )}
                              {backoffTime > 0 && (
                                <p className="text-yellow-400 text-sm">
                                  Please wait {backoffTime}s before trying again
                                </p>
                              )}
                              <button
                                onClick={handleLogin}
                                className="w-full py-3 rounded-full backdrop-blur-lg border transition-all hover:scale-105 active:scale-95 bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                                style={{ borderRadius: '2rem' }}
                                disabled={backoffTime > 0}
                              >
                                Login
                              </button>
                            </div>
                          </div>
                        </details>
                      </div>
                    </details>
                  </div>
                </details>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.2s ease-out;
          }
          
          .animate-slide-up {
            animation: slideInUp 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // Logged in view
  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
    } font-['Inter'] flex`}>
      {/* Left Sidebar - Friends */}
  
