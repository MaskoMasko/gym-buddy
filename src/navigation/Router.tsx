import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import useAuth from '../hooks/useAuth';
import {useSilentLogin} from '../hooks/useSilentLogin';
import {AuthStack} from './AuthStack';
import {RootStack} from './RootStack';

export const Router = () => {
  const {isLoggedIn} = useAuth();
  useSilentLogin();
  return (
    <NavigationContainer>
      {isLoggedIn ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
