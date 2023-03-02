import {
  InitialState,
  NavigationContainer,
  NavigationState,
} from '@react-navigation/native';
import React from 'react';
import useAuth from '../hooks/useAuth';
import {useSilentLogin} from '../hooks/useSilentLogin';
import {AuthStack} from './AuthStack';
import {RootStack} from './RootStack';

export const Router = ({
  initialState,
  onStateChange,
}: {
  initialState: InitialState | undefined;
  onStateChange: (state: NavigationState | undefined) => void;
}) => {
  const {isLoggedIn} = useAuth();
  useSilentLogin();
  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={onStateChange}>
      {isLoggedIn ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
