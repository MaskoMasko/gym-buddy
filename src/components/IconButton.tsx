import React from 'react';
import {TouchableOpacityProps} from 'react-native/types';
import {TouchableOpacity} from './TouchableOpacity';
import {LayoutProps} from '../hoc/withLayoutProps';
import {Icon, IconProps} from '../svg/icons/Icon';
import {colors} from '../style/palette';
import {Spacer} from './Spacer';

interface CustomIconButtonProps {
  iconName: IconProps['name'];
  iconSize?: IconProps['size'];
  iconColor?: IconProps['color'];
  iconRight?: boolean;
  iconLeft?: boolean;
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
  iconRight,
  iconLeft,
  ...rest
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      centerContent
      flexDirectionRow
      paddingHorizontalSmall
      {...rest}>
      {(iconLeft || !iconRight) && (
        <>
          <Icon name={iconName} size={iconSize} color={iconColor} />
          {children !== undefined && <Spacer small />}
        </>
      )}
      {children}
      {iconRight && (
        <>
          {children !== undefined && <Spacer small />}
          <Icon name={iconName} size={iconSize} color={iconColor} />
        </>
      )}
    </TouchableOpacity>
  );
};
