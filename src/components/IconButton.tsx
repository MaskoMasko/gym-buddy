import React from 'react';
import {TouchableOpacityProps} from 'react-native/types';
import {TouchableOpacity} from './TouchableOpacity';
import {LayoutProps} from '../hoc/withLayoutProps';
import {Icon, IconProps} from '../svg/icons/Icon';
import {colors} from '../style/palette';
import {Text} from './Text';
import {Spacer} from './Spacer';

interface IconButtonProps
  extends TouchableOpacityProps,
    LayoutProps,
    IconProps {}

export const IconButton = ({
  children,
  name,
  size = 24,
  color = colors.dark,
  ...rest
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      {...rest}
      justifyContentSpaceBetween
      alignItemsCenter
      flexDirectionRow>
      <Text>{children}</Text>
      <Spacer small />
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};
