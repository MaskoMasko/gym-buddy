import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {TextInput} from '../../components/TextInput';
import {TouchableOpacity} from '../../components/TouchableOpacity';
import {View} from '../../components/View';
import {Icon} from '../../svg/icons/Icon';
import {dropdownToggleButtonHeight} from './HomeScreen';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProps} from '../../navigation/RouterTypes';

export const SocialBarHeader = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [visible, setVisible] = useState(false);
  const translateY = useSharedValue(visible ? -headerHeight : headerHeight);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });
  const navigation =
    useNavigation<RootStackNavigationProps<'RootBottomTab'>['navigation']>();
  return (
    <Animated.View
      onLayout={event => {
        setHeaderHeight(
          event.nativeEvent.layout.height - dropdownToggleButtonHeight,
        );
      }}
      style={animatedStyle}>
      <View
        flexDirectionRow
        centerContent
        style={styles.headerContainer}
        paddingHorizontalSmall>
        <View flex paddingSmall>
          <TextInput label={'Search places'} />
        </View>
        <TouchableOpacity
          backgroundColorLight
          paddingSmall
          style={styles.headerIcon}
          centerContent
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('AddFriendsScreen');
          }}>
          <Icon name={'user-add'} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.dropdownToggleButtonContainer}
        hitSlop={{bottom: 5, top: 5, left: 10, right: 10}}
        onPress={() => {
          setVisible(prevVal => !prevVal);
          //goes from headerHeight back to 0 and not to -headerHeight
          translateY.value = withTiming(visible ? 0 : headerHeight, {
            duration: 500,
          });
        }}
        activeOpacity={1}
        centerContent>
        <View backgroundColorDarkGray style={styles.dropdownToggleButton} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  headerIcon: {borderRadius: 15, padding: 12},
  dropdownToggleButton: {
    width: 50,
    height: 10,
    borderRadius: 10,
  },
  dropdownToggleButtonContainer: {
    backgroundColor: 'rgba(0,0,0,.5)',
    height: dropdownToggleButtonHeight,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});
