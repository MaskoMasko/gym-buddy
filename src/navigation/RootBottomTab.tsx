import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Header} from '../components/Header';
import {BlogsScreen} from '../features/fitness-news/BlogsScreen';
import {HomeScreen} from '../features/home/HomeScreen';
import {MessagesScreen} from '../features/socials/MessagesScreen';
import {StatisticsScreen} from '../features/statistics/StatisticsScreen';
import {WorkoutsScreen} from '../features/workout-sessions/WorkoutsScreen';
import {RootBottomTabParamList, TabBarIconProps} from './RouterTypes';
import {Icon} from '../svg/icons/Icon';
import {colors} from '../style/palette';
import {View} from '../components/View';
import {StyleSheet} from 'react-native';

export const RootBottomTab = () => {
  const Tab = createBottomTabNavigator<RootBottomTabParamList>();
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        header: props => <Header {...props} />,
        tabBarStyle: {
          backgroundColor: colors.light,
          paddingTop: 5,
        },
        tabBarActiveTintColor: colors.darkGray,
      }}>
      <Tab.Screen
        name="WorkoutsScreen"
        component={WorkoutsScreen}
        options={
          {
            title: 'Trainings',
            shouldRenderLogo: true,
            tabBarIcon: ({focused}: TabBarIconProps) => (
              <Icon
                size={30}
                name={'weight'}
                color={focused ? colors.darkGray : '#5c5c5c'}
              />
            ),
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
            tabBarIcon: ({focused}: TabBarIconProps) => (
              <Icon
                size={30}
                name={focused ? 'message' : 'message-outline'}
                color={focused ? colors.darkGray : '#5c5c5c'}
              />
            ),
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
            // headerShown: false,
            tabBarIcon: ({focused}: TabBarIconProps) => (
              <View style={styles.tabItemFloat}>
                <View style={[styles.mainTabBarItem, styles.shadows]}>
                  <View>
                    <Icon
                      name={focused ? 'map' : 'map-outline'}
                      size={50}
                      color={focused ? colors.darkGray : '#5c5c5c'}
                    />
                  </View>
                </View>
              </View>
            ),
            //no label
            tabBarLabel: () => null,
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
            tabBarIcon: ({focused}: TabBarIconProps) => (
              <Icon
                size={30}
                name={focused ? 'statistics' : 'statistics-outline'}
                color={focused ? colors.darkGray : '#5c5c5c'}
              />
            ),
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
            tabBarIcon: ({focused}: TabBarIconProps) => (
              <Icon
                size={30}
                name={'projection'}
                color={focused ? colors.darkGray : '#5c5c5c'}
              />
            ),
          } as any
        }
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadows: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  tabItemFloat: {
    transform: [{translateY: -25}],
    backgroundColor: 'transparent',
  },
  mainTabBarItem: {
    backgroundColor: colors.light,
    padding: 15,
    borderRadius: 50,
  },
});
