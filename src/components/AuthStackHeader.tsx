import React from 'react';
import {View} from './View';
import {Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '../svg/icons/Icon';
import {colors} from '../style/palette';
import {NativeStackHeaderProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const AuthStackHeader = (props: NativeStackHeaderProps) => {
  const navigation = useNavigation();
  const styles = useStyles();
  return (
    <View style={styles.authStackHeaderContainer} centerContent>
      <Pressable
        onPress={() => (props.back ? navigation.goBack() : null)}
        hitSlop={{top: 5, left: 5, right: 5, bottom: 5}}>
        <Icon name="back-arrow" color={colors.white} size={30} />
      </Pressable>
    </View>
  );
};

const useStyles = () => {
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    authStackHeaderContainer: {
      position: 'absolute',
      top: insets.top,
      left: 10,
      backgroundColor: 'transparent',
    },
  });
};
