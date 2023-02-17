import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AuthStack} from './AuthStack';
import useAuth from '../hooks/useAuth';
import {RootBottomTab} from './RootBottomTab';

export const Router = () => {
  const {isLoggedIn} = useAuth();
  return (
    <NavigationContainer>
      {isLoggedIn ? <RootBottomTab /> : <AuthStack />}
    </NavigationContainer>
  );
};
