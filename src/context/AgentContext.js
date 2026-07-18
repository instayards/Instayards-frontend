import { createContext, useContext, useState, useEffect } from 'react';

const AgentContext = createContext(null);

export const AgentProvider = ({ children }) => {
  const [agent, setAgent] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('agent_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('agent_token');
    const storedAgent = localStorage.getItem('agent_data');
    if (stored && storedAgent) {
      setToken(stored);
      try { setAgent(JSON.parse(storedAgent)); } catch { logout(); }
    }
    setLoading(false);
  }, []);

  const login = (agentData, jwtToken) => {
    setAgent(agentData);
    setToken(jwtToken);
    localStorage.setItem('agent_token', jwtToken);
    localStorage.setItem('agent_data', JSON.stringify(agentData));
  };

  const logout = () => {
    setAgent(null);
    setToken(null);
    localStorage.removeItem('agent_token');
    localStorage.removeItem('agent_data');
  };

  return (
    <AgentContext.Provider value={{ agent, token, loading, login, logout, isLoggedIn: !!token }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error('useAgent must be used inside AgentProvider');
  return ctx;
};
