import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable} from 'react-native';
import {LoginScreen} from '../screens/auth/LoginScreen';
import {SignUpScreen} from '../screens/auth/SignUpScreen';
import {Icon} from '../svg/icons/Icon';
import {HeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';

const Stack = createNativeStackNavigator();

const BackArrowHeaderButton = (props: HeaderBackButtonProps) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => (props.canGoBack ? navigation.goBack() : null)}
      hitSlop={{top: 5, left: 5, right: 5, bottom: 5}}>
      <Icon name="back-arrow" />
    </Pressable>
  );
};

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerLeft: BackArrowHeaderButton,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SignUpScreen"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
};
