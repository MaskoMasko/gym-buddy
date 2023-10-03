import React, {Fragment, useEffect} from 'react';
import {View} from '../../components/View';
import {Text} from '../../components/Text';
import {GymItemType} from './fetch/useGyms';
import {Spacer} from '../../components/Spacer';
import {Icon} from '../../svg/icons/Icon';
import {IconButton} from '../../components/IconButton';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../style/palette';
import {sizes} from '../../style/componentConstants';
import {StyleSheet, Linking, ScrollView, Image} from 'react-native';

export const GymDetailsBottomSheet = ({
  isVisible,
  setIsVisible,
  gymData,
}: {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  gymData: GymItemType | undefined;
}) => {
  //Change easing in and out with sliding up and down
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [isVisible, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handleClose = () => {
    opacity.value = withTiming(0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
    setTimeout(() => {
      setIsVisible(false);
    }, 200);
  };

  if (!isVisible || !gymData) {
    return null;
  }
  return (
    <Animated.View style={[styles.bottomSheetContainer, animatedStyle]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View flexDirectionRow alignItemsCenter justifyContentSpaceBetween>
          <Text large weightSemibold>
            {gymData.name}
          </Text>
          <IconButton iconName="close" onPress={handleClose} />
        </View>
        <Spacer extraSmall />
        <View flexDirectionRow alignItemsCenter style={{gap: 5}}>
          <Text>Rating: {gymData.rating}</Text>
          <Icon name="star" color={'#fcba03'} size={20} />
        </View>
        <Text weightLight>Address: {gymData.address}</Text>
        <Text weightLight>
          Website:{' '}
          <Text
            onPress={async () =>
              !__DEV__ ? await Linking.openURL(gymData.website) : {}
            }
            style={{textDecorationLine: 'underline'}}>
            {gymData.website}
          </Text>
        </Text>
        <Text weightLight>Images:</Text>
        <ScrollView horizontal>
          {gymData.images.map(image => {
            return (
              <Fragment key={image.id}>
                <Image
                  source={{uri: image.uri}}
                  style={{width: 150, height: 150}}
                />
                <Spacer extraSmall />
              </Fragment>
            );
          })}
        </ScrollView>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 350,
    zIndex: 100,
    backgroundColor: colors.white,
    padding: sizes.medium,
  },
});
