import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AddFriendsScreen} from '../features/socials/AddFriendsScreen';
import {RootBottomTab} from './RootBottomTab';
import {RootStackParamList} from './RouterTypes';
import {DirectMessagesScreen} from '../features/socials/DirectMessagesScreen';
import {ProfileScreen} from '../features/auth/ProfileScreen';
import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
import {Icon} from '../svg/icons/Icon';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName={'RootBottomTab'}
      screenOptions={{
        headerBackTitleVisible: false,
        headerLeft: ({canGoBack}) => (
          <Pressable
            onPress={() => (canGoBack ? navigation.goBack() : null)}
            hitSlop={{top: 5, left: 5, right: 5, bottom: 5}}>
            <Icon name="back-arrow" />
          </Pressable>
        ),
      }}>
      <Stack.Screen
        name={'RootBottomTab'}
        component={RootBottomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DirectMessagesScreen"
        component={DirectMessagesScreen}
      />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name={'AddFriendsScreen'} component={AddFriendsScreen} />
    </Stack.Navigator>
  );
};
