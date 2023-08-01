import React from 'react';
import {TouchableOpacityProps} from 'react-native/types';
import {TouchableOpacity} from './TouchableOpacity';
import {LayoutProps} from '../hoc/withLayoutProps';
import {Icon, IconProps} from '../svg/icons/Icon';
import {colors} from '../style/palette';
import {Text} from './Text';
import {Spacer} from './Spacer';

interface CustomIconButtonProps {
  iconName: IconProps['name'];
  iconSize?: IconProps['size'];
  iconColor?: IconProps['color'];
}
interface IconButtonProps
  extends TouchableOpacityProps,
    LayoutProps,
    CustomIconButtonProps {}

export const IconButton = ({
  children,
  iconName,
  iconSize = 24,
  iconColor = colors.dark,
  ...rest
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      {...rest}
      justifyContentSpaceBetween
      alignItemsCenter
      flexDirectionRow>
      {children && (
        <>
          <Text>{children}</Text>
          <Spacer small />
        </>
      )}
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};
