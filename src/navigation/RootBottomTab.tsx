import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Header} from '../components/Header';
import {BlogsScreen} from '../screens/BlogsScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {MessagesScreen} from '../screens/MessagesScreen';
import {StatisticsScreen} from '../screens/StatisticsScreen';
import {WorkoutsScreen} from '../screens/WorkoutsScreen';
import {RootBottomTabParamList} from './RouterTypes';

export const RootBottomTab = () => {
  const Tab = createBottomTabNavigator<RootBottomTabParamList>();
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        //I get an error when I try to do it like header: Header
        header: props => <Header {...props} />,
      }}>
      <Tab.Screen
        name="WorkoutsScreen"
        component={WorkoutsScreen}
        options={
          {
            title: 'Training sessions',
            shouldRenderLogo: true,
          } as any
        }
      />
      <Tab.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={
          {
            title: 'Messages',
            shouldRenderLogo: true,
          } as any
        }
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={
          {
            title: 'GymBuddy',
            shouldRenderLogo: true,
          } as any
        }
      />
      <Tab.Screen
        name="StatisticsScreen"
        component={StatisticsScreen}
        options={
          {
            title: 'Statistics',
            shouldRenderLogo: true,
          } as any
        }
      />
      <Tab.Screen
        name="BlogsScreen"
        component={BlogsScreen}
        options={
          {
            title: 'Fitness News',
            shouldRenderLogo: true,
          } as any
        }
      />
    </Tab.Navigator>
  );
};
