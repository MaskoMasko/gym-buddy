import React, {ForwardedRef, forwardRef} from 'react';
import {TouchableOpacity} from './TouchableOpacity';
import {Text} from './Text';
import {TouchableOpacityProps} from 'react-native';

export const Button = forwardRef(
  (props: TouchableOpacityProps, ref: ForwardedRef<TouchableOpacityProps>) => {
    return (
      <TouchableOpacity ref={ref} {...props}>
        <Text colorWhite>something is going on</Text>
      </TouchableOpacity>
    );
  },
);
