
/**
 * Check if the current session is an admin session
 * @returns boolean indicating if the current session is an admin session
 */
export const isAdminLoggedIn = (): boolean => {
  const adminSession = localStorage.getItem('adminSession');
  if (!adminSession) return false;
  
  try {
    const session = JSON.parse(adminSession);
    return session && session.isAdmin === true;
  } catch (e) {
    console.error('Error parsing admin session:', e);
    return false;
  }
};

/**
 * Get the current admin username
 * @returns string or null if not logged in
 */
export const getAdminUsername = (): string | null => {
  const adminSession = localStorage.getItem('adminSession');
  if (!adminSession) return null;
  
  try {
    const session = JSON.parse(adminSession);
    return session?.username || null;
  } catch (e) {
    console.error('Error parsing admin session:', e);
    return null;
  }
};

/**
 * Create a Supabase client for admin operations
 * Uses the standard client but with admin context
 */
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../integrations/supabase/types';

export const getAdminSupabaseClient = () => {
  const SUPABASE_URL = "https://mldxilhiiifbwipscqbj.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sZHhpbGhpaWlmYndpcHNjcWJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NTEyMTksImV4cCI6MjA2MzAyNzIxOX0.Q1F3VHJ2wrfFeecWp9pExf5ZzEcinHyeI7qN7lsLSPA";
  
  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
};
