import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthStackHeader} from './AuthStackHeader';
import {LoginScreen} from '../features/auth/LoginScreen';
import {SignUpScreen} from '../features/auth/SignUpScreen';
import {WelcomeScreen} from '../features/auth/WelcomeScreen';
import {AuthStackParamList} from './RouterTypes';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        header: AuthStackHeader,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="WelcomeScreen"
        component={WelcomeScreen}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
};
