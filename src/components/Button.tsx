import React, {ForwardedRef, forwardRef} from 'react';
import {StyleSheet, TouchableOpacityProps} from 'react-native';
import {TouchableOpacity} from './TouchableOpacity';
import {Text} from './Text';
import {LayoutProps} from '../hoc/withLayoutProps';
import {View} from './View';
import {Icon, IconProps} from '../svg/icons/Icon';
import {Spacer} from './Spacer';

interface ExtraButtonProps {
  leftIconName?: IconProps['name'];
  rightIconName?: IconProps['name'];
  light?: boolean;
}

export const Button = forwardRef(
  (
    {
      children,
      leftIconName,
      rightIconName,
      light,
      ...props
    }: TouchableOpacityProps & LayoutProps & ExtraButtonProps,
    ref: ForwardedRef<TouchableOpacityProps>,
  ) => {
    function resolveChildren() {
      if (leftIconName) {
        return (
          <View flex flexDirectionRow>
            <Icon name={leftIconName} />
            <Spacer small />
            <Text colorWhite={!light} small>
              {children}
            </Text>
          </View>
        );
      }
      if (rightIconName) {
        return (
          <View flexDirectionRow centerContent>
            <Icon name={rightIconName} />
            <Spacer small />
            <Text colorWhite={!light} small>
              {children}
            </Text>
          </View>
        );
      }
      return (
        <Text colorWhite={!light} small>
          {children}
        </Text>
      );
    }
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        centerContent
        backgroundColorDarkGray={!light}
        backgroundColorLight={light}
        style={styles.defaultButton}
        ref={ref}
        {...props}>
        {resolveChildren()}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  defaultButton: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
