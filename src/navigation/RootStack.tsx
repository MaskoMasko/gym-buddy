import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AddFriendsScreen} from '../features/socials/AddFriendsScreen';
import {RootBottomTab} from './RootBottomTab';
import {RootStackNavigationProps, RootStackParamList} from './RouterTypes';
import {DirectMessagesScreen} from '../features/socials/DirectMessagesScreen';
import {ProfileScreen} from '../features/auth/ProfileScreen';
import {useNavigation} from '@react-navigation/native';
import {Image, Pressable} from 'react-native';
import {Icon} from '../svg/icons/Icon';
import {WorkoutDetailsScreen} from '../features/workout-sessions/WorkoutDetailsScreen';
import {CreateWorkoutScreen} from '../features/workout-sessions/CreateWorkoutScreen';
import {WorkoutStartedScreen} from '../features/workout-sessions/WorkoutStartedScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const navigation =
    useNavigation<
      RootStackNavigationProps<'DirectMessagesScreen'>['navigation']
    >();
  return (
    <Stack.Navigator
      initialRouteName={'RootBottomTab'}
      screenOptions={({route}) => ({
        headerBackTitleVisible: false,
        headerLeft: ({canGoBack}) => (
          <Pressable
            onPress={() => (canGoBack ? navigation.goBack() : null)}
            hitSlop={{top: 5, left: 5, right: 5, bottom: 5}}>
            <Icon name="back-arrow" />
          </Pressable>
        ),
        headerRight: () => {
          if (route.name === 'DirectMessagesScreen') {
            return (
              <Pressable
                onPress={() => navigation.navigate('ProfileScreen')}
                hitSlop={{top: 5, left: 5, right: 5, bottom: 5}}>
                <Image
                  source={require('../assets/images/default-profile-img.png')}
                  style={{width: 25, height: 25}}
                />
              </Pressable>
            );
          } else {
            return null;
          }
        },
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      })}>
      <Stack.Screen
        name={'RootBottomTab'}
        component={RootBottomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DirectMessagesScreen"
        component={DirectMessagesScreen}
      />
      <Stack.Screen
        name="WorkoutDetailsScreen"
        component={WorkoutDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WorkoutStartedScreen"
        component={WorkoutStartedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateWorkoutScreen"
        component={CreateWorkoutScreen}
      />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name={'AddFriendsScreen'}
        component={AddFriendsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
