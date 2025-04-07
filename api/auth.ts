import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const register = async (email: string, password: string) => {
  const response = await api.post('/auth/register', { email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  const token = response.data.token;

  if (token) {
    await AsyncStorage.setItem('token', token); // Sauvegarde du token
  }

  return response.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
};
