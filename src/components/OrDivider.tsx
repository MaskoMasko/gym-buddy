import React from 'react';
import {ViewProps} from 'react-native';
import {StyleSheet} from 'react-native';
import {View} from './View';
import {Text} from './Text';
import {colors} from '../style/palette';
import {Spacer} from './Spacer';

interface OrDividerProps {
  fontSize?: number;
  title?: string;
}

export const OrDivider = ({fontSize, title = 'or'}: OrDividerProps) => {
  const dividerStyle: ViewProps['style'] = {
    marginBottom: resolveDividerHeight(),
  };
  function resolveDividerHeight() {
    //do this better
    if (!fontSize) {
      return 15;
    } else {
      return fontSize / 2;
    }
  }
  return (
    <View flexDirectionRow justifyContentSpaceEvenly paddingHorizontalMedium>
      <View
        flex
        style={{
          borderBottomColor: colors.light,
          borderBottomWidth: StyleSheet.hairlineWidth,
          ...dividerStyle,
        }}
      />
      <Spacer extraSmall />
      <Text colorWhite>{title}</Text>
      <Spacer extraSmall />

      <View
        flex
        style={{
          borderBottomColor: colors.light,
          borderBottomWidth: StyleSheet.hairlineWidth,
          ...dividerStyle,
        }}
      />
    </View>
  );
};
