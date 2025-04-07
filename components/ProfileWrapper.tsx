// components/ProfileWrapper.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import ProfileScreen from '../screens/ProfileScreen';
import AuthScreen from '../screens/AuthScreen';

const ProfileWrapper = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <ProfileScreen /> : <AuthScreen />;
};

export default ProfileWrapper;
