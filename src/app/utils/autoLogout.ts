'use client';

import { createClient } from './supabase/client';

const INACTIVITY_TIMEOUT = 1 * 60 * 1000; // 5 minutes in milliseconds
let inactivityTimer: NodeJS.Timeout | null = null;

export const setupAutoLogout = () => {
  // Reset the timer when the user interacts with the page
  const resetTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    
    inactivityTimer = setTimeout(async () => {
      try {
        // Get Supabase client
        const supabase = createClient();
        
        // Check if user is still logged in
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log('User inactive for 5 minutes. Logging out...');
          
          // Sign out from Supabase
          await supabase.auth.signOut();
          
          // Call server-side signout endpoint
          await fetch('/auth/signout', {
            method: 'POST',
            cache: 'no-store',
          });
          
          // Show alert and redirect to login
          alert('You have been logged out due to inactivity.');
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Auto-logout error:', error);
      }
    }, INACTIVITY_TIMEOUT);
  };
  
  // Events to track user activity
  const events = [
    'mousedown', 'mousemove', 'keypress', 
    'scroll', 'touchstart', 'click', 'keydown'
  ];
  
  // Add event listeners
  events.forEach(event => {
    document.addEventListener(event, resetTimer, { passive: true });
  });
  
  // Initial setup
  resetTimer();
  
  // Return cleanup function
  return () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    
    events.forEach(event => {
      document.removeEventListener(event, resetTimer);
    });
  };
}; 