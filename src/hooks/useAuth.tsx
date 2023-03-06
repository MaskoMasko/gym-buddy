import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosResponse} from 'axios';
import React, {createContext, useContext, useState} from 'react';
import {http} from '../service/http/http';

//TODO: this needs rework
export interface Message {
  id: number;
  text: string;
  createdAt: string;
  senderId: number;
  chatRoomId: number;
  userId: null | number;
}

export interface UserInterface {
  id: number;
  name: string;
  email?: string;
  friends: UserInterface[];
  chatRooms: {
    id: number;
    name: string;
    messages: Message[];
  }[];
}

export interface AuthContextInterface {
  loggedUser: UserInterface | null;
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
  const [loggedUser, setLoggedUser] = useState<UserInterface | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function login(data: {email: string; password?: string}) {
    await AsyncStorage.clear();
    try {
      const response = await http.post('/login', data);
      await AsyncStorage.setItem('token', response.data.user.accessToken);
      if (response.data.user.refreshToken) {
        await AsyncStorage.setItem(
          'refreshToken',
          response.data.user.refreshToken,
        );
        setLoggedUser(response.data.user);
      }
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
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const refreshTokenResponse = await http.post('/refresh-token', {
        token: refreshToken,
      });
      await AsyncStorage.setItem(
        'token',
        refreshTokenResponse.data.user.accessToken,
      );
      try {
        const response = await http.get('/home');
        if (refreshTokenResponse.data.user) {
          setLoggedUser(response.data.user);
          setIsLoggedIn(true);
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthUserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        login,
        signup,
        silentLogin,
        loggedUser,
      }}>
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
