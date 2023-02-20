import React, {createContext, useContext, useState} from 'react';
import {http} from '../service/http/http';
import {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthContextInterface {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  login: ({
    email,
    password,
  }: {
    email: string;
    password?: string;
  }) => Promise<AxiosResponse<any, any> | undefined>;
  signup: ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => Promise<AxiosResponse<any, any> | undefined>;
  silentLogin: () => Promise<AxiosResponse<any, any> | undefined>;
}

const AuthUserContext = createContext<undefined | AuthContextInterface>(
  undefined,
);

export const AuthUserProvider = ({children}: {children: React.ReactNode}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function login({email, password}: {email: string; password?: string}) {
    const data = password ? {email, password} : {email};
    await AsyncStorage.clear();
    try {
      const response = await http.post('/login', data);
      console.log(response);
      await AsyncStorage.setItem('token', response.data.user.token);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async function signup({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    const data = {email, password, name};
    await AsyncStorage.clear();
    try {
      const response = await http.post('/signup', data);
      console.log(response);
      if (response.data.user) {
        await AsyncStorage.setItem('token', response.data.user.token);
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async function silentLogin() {
    try {
      const response = await http.get('/home');
      if (response.data.user) {
        setIsLoggedIn(true);
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthUserContext.Provider
      value={{isLoggedIn, setIsLoggedIn, login, signup, silentLogin}}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthUserContext);
  if (!context) {
    throw Error('useAuth hook called without its provider');
  }
  return context;
}
