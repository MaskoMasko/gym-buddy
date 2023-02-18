import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import useAuth from '../hooks/useAuth';
import {useSilentLogin} from '../hooks/useSilentLogin';
import {AuthStack} from './AuthStack';
import {RootBottomTab} from './RootBottomTab';

export const Router = () => {
  const {isLoggedIn} = useAuth();
  useSilentLogin();
  return (
    <NavigationContainer>
      {isLoggedIn ? <RootBottomTab /> : <AuthStack />}
    </NavigationContainer>
  );
};
