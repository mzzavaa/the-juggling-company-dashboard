import React, { createContext, useContext, useState } from 'react';
// Import user data from JSON
import userData from '../data/user.json';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Default to authenticated with the user from JSON
export function AuthProvider({ children, initialState = { authenticated: true, user: userData } }) {
  const [authenticated, setAuthenticated] = useState(initialState.authenticated);
  const [user, setUser] = useState(initialState.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login function - mock implementation for demo
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use the user data from JSON
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

  // Register function - mock implementation for demo
  const register = async (name, email, password, learningStyle) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use the user data from JSON but update some fields
      const newUser = {
        ...userData,
        name: name,
        email: email,
        learningStyle: learningStyle
      };
      
      setAuthenticated(true);
      setUser(newUser);
      setLoading(false);
      return true;
    } catch (err) {
      setError('Failed to register. Please try again.');
      setLoading(false);
      return false;
    }
  };

  // Logout function - mock implementation for demo
  const logout = async () => {
    setLoading(true);
    
    try {
      // Simulate logout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Reset to initial state after logout
      setAuthenticated(true);
      setUser(userData);
      setLoading(false);
      return true;
    } catch (err) {
      setError('Failed to logout.');
      setLoading(false);
      return false;
    }
  };

  // Update user profile - mock implementation for demo
  const updateProfile = async (updatedData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate profile update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(prevUser => ({
        ...prevUser,
        ...updatedData
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
