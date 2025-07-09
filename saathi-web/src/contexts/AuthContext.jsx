import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false };
    case 'CLEAR_USER':
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
  });

  // Load user from localStorage on app start
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('saathi_user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          dispatch({ type: 'SET_USER', payload: user });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Error loading user:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data - replace with actual API response
      const userData = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'user',
        emergencyContacts: [],
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      localStorage.setItem('saathi_user', JSON.stringify(userData));
      dispatch({ type: 'SET_USER', payload: userData });

      toast.success('Welcome to Saathi! 🎉');
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      toast.error('Login failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser = {
        id: Date.now().toString(),
        ...userData,
        role: 'user',
        emergencyContacts: [],
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      localStorage.setItem('saathi_user', JSON.stringify(newUser));
      dispatch({ type: 'SET_USER', payload: newUser });

      toast.success('Account created successfully! Welcome to Saathi! 🎉');
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      toast.error('Registration failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('saathi_user');
    dispatch({ type: 'CLEAR_USER' });
    toast.success('Logged out successfully');
  };

  // Update user profile
  const updateProfile = (updates) => {
    const updatedUser = { ...state.user, ...updates };
    localStorage.setItem('saathi_user', JSON.stringify(updatedUser));
    dispatch({ type: 'SET_USER', payload: updatedUser });
    toast.success('Profile updated successfully');
  };

  // Add emergency contact
  const addEmergencyContact = (contact) => {
    const updatedContacts = [...(state.user.emergencyContacts || []), contact];
    const updatedUser = { ...state.user, emergencyContacts: updatedContacts };
    localStorage.setItem('saathi_user', JSON.stringify(updatedUser));
    dispatch({ type: 'SET_USER', payload: updatedUser });
    toast.success('Emergency contact added');
  };

  // Remove emergency contact
  const removeEmergencyContact = (contactId) => {
    const updatedContacts = state.user.emergencyContacts.filter(
      contact => contact.id !== contactId
    );
    const updatedUser = { ...state.user, emergencyContacts: updatedContacts };
    localStorage.setItem('saathi_user', JSON.stringify(updatedUser));
    dispatch({ type: 'SET_USER', payload: updatedUser });
    toast.success('Emergency contact removed');
  };

  const value = {
    user: state.user,
    loading: state.loading,
    login,
    register,
    logout,
    updateProfile,
    addEmergencyContact,
    removeEmergencyContact,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};