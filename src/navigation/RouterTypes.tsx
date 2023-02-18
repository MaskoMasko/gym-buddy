import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export type RootNavigationParamList = RootBottomTabParamList &
  AuthStackParamList;

export type RootBottomTabParamList = {
  BlogsScreen: undefined;
  HomeScreen: undefined;
  MessagesScreen: undefined;
  StatisticsScreen: undefined;
  WorkoutsScreen: undefined;
};

export type AuthStackParamList = {
  WelcomeScreen: undefined;
  LoginScreen: {email: string; username: string};
  SignUpScreen: {email: string} | undefined;
};

export type RootBottomTabNavigationProps<
  T extends keyof RootBottomTabParamList,
> = {
  navigation: BottomTabNavigationProp<RootBottomTabParamList, T>;
  route: RouteProp<RootBottomTabParamList, T>;
};

// Define the navigation prop types for the stack navigator
export type AuthStackNavigationProps<T extends keyof AuthStackParamList> = {
  navigation: StackNavigationProp<AuthStackParamList, T>;
  route: RouteProp<AuthStackParamList, T>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigationParamList {}
  }
}
