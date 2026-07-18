import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('admin_token');
      const storedAdmin = localStorage.getItem('admin_data');
      if (stored && storedAdmin) {
        setToken(stored);
        try { setAdmin(JSON.parse(storedAdmin)); } catch { logout(); }
      }
    } catch {
      // localStorage unavailable (e.g. private browsing restrictions)
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (adminData, jwtToken) => {
    setAdmin(adminData);
    setToken(jwtToken);
    localStorage.setItem('admin_token', jwtToken);
    localStorage.setItem('admin_data', JSON.stringify(adminData));
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_data');
  };

  return (
    <AdminContext.Provider value={{ admin, token, loading, login, logout, isLoggedIn: !!token }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider');
  return ctx;
};
