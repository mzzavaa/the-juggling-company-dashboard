import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children, initialState = { authenticated: false, user: null } }) {
  const [authenticated, setAuthenticated] = useState(initialState.authenticated);
  const [user, setUser] = useState(initialState.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call an API or Auth service
      // For now, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: 'user-123',
        name: 'Test User',
        email: email,
        avatar: 'https://i.pravatar.cc/300',
        learningStyle: 'Reflector',
        level: 7
      };
      
      setAuthenticated(true);
      setUser(userData);
      setLoading(false);
      return true;
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      setLoading(false);
      return false;
    }
  };

  // Register function
  const register = async (name, email, password, learningStyle) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call an API or Auth service
      // For now, we'll simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: 'user-' + Math.floor(Math.random() * 1000),
        name: name,
        email: email,
        avatar: 'https://i.pravatar.cc/300',
        learningStyle: learningStyle,
        level: 1
      };
      
      setAuthenticated(true);
      setUser(userData);
      setLoading(false);
      return true;
    } catch (err) {
      setError('Failed to register. Please try again.');
      setLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    
    try {
      // In a real app, this would call an API or Auth service
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAuthenticated(false);
      setUser(null);
      setLoading(false);
      return true;
    } catch (err) {
      setError('Failed to logout.');
      setLoading(false);
      return false;
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(prevUser => ({
        ...prevUser,
        ...userData
      }));
      
      setLoading(false);
      return true;
    } catch (err) {
      setError('Failed to update profile.');
      setLoading(false);
      return false;
    }
  };

  const value = {
    authenticated,
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
