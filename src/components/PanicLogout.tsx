'use client';

import { useEffect } from 'react';

export default function PanicLogout() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Panic logout: Ctrl + Alt + Q
      if (e.ctrlKey && e.altKey && e.key === 'q') {
        e.preventDefault();
        
        // Clear all storage
        localStorage.clear();
        sessionStorage.clear();
        
        // Clear any cookies (if any)
        document.cookie.split(";").forEach((c) => {
          const eqPos = c.indexOf("=");
          const name = eqPos > -1 ? c.substr(0, eqPos) : c;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        });
        
        // Redirect to home and reload
        window.location.href = '/';
        window.location.reload();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null; // This component doesn't render anything
}