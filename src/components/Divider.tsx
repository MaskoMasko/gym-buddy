import React from 'react';
import {View} from './View';
import {colors} from '../style/palette';
import {StyleSheet} from 'react-native';

export const Divider = ({color = colors.dark}: {color?: string}) => {
  return (
    <View
      flex
      style={{
        borderBottomColor: color,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
};
