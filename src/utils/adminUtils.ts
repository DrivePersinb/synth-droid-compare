
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
