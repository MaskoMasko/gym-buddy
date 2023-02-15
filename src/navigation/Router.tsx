import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AuthStack} from './AuthStack';

export const Router = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};
