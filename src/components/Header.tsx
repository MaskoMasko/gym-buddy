import {
  BottomTabHeaderProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {sizes} from '../style/componentConstants';
import {Icon} from '../svg/icons/Icon';
import {Text} from './Text';
import {TouchableOpacity} from './TouchableOpacity';
import {View} from './View';

type HeaderType = BottomTabHeaderProps | NativeStackHeaderProps;
interface AdditionalNativeStackHeaderOptionProps
  extends NativeStackNavigationOptions {
  shouldRenderLogo?: boolean;
}
interface AdditionalBottomTabHeaderOptionProps
  extends BottomTabNavigationOptions {
  shouldRenderLogo?: boolean;
}
export interface HeaderProps extends Omit<HeaderType, 'options'> {
  options:
    | AdditionalBottomTabHeaderOptionProps
    | AdditionalNativeStackHeaderOptionProps;
}
export const Header = ({navigation, options, ...props}: HeaderProps) => {
  const styles = useStyles();
  const title = options.title;
  const shouldRenderLogo =
    'shouldRenderLogo' in options && !!options.shouldRenderLogo;
  const canGoBack = navigation.canGoBack();
  return (
    <View
      style={styles.headerContainer}
      flexDirectionRow
      centerContent
      {...props}>
      {!canGoBack && !shouldRenderLogo ? null : (
        <TouchableOpacity
          hitSlop={{top: 5, left: 5, right: 5, bottom: 5}}
          activeOpacity={0.3}
          //myb this will need a small change
          onPress={canGoBack ? navigation.goBack : undefined}
          flex
          centerContent
          style={styles.absoluteTopLeft}>
          {shouldRenderLogo ? (
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.headerIconSize}
            />
          ) : (
            <Icon name="back-arrow" />
          )}
        </TouchableOpacity>
      )}
      {title && (
        <Text style={styles.headerTitle} large>
          {title}
        </Text>
      )}
    </View>
  );
};

const useStyles = () => {
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    headerContainer: {
      paddingTop: insets.top + sizes.small,
      marginBottom: 15,
      marginHorizontal: 15,
    },
    absoluteTopLeft: {
      position: 'absolute',
      left: 0,
      bottom: 0,
    },
    headerIconSize: {width: 70, height: 32},
    headerTitle: {flex: 1, maxWidth: '80%', textAlign: 'center'},
  });
};
