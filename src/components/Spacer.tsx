import React from 'react';
import {View} from './View';
import {sizes} from '../style/componentConstants';

interface SpacerProps {
  extraSmall?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  extraLarge?: boolean;
}

export const Spacer = ({extraSmall, small, large, extraLarge}: SpacerProps) => {
  function resolveSpacing() {
    if (extraSmall) {
      return sizes.extraSmall;
    } else if (small) {
      return sizes.small;
    } else if (large) {
      return sizes.large;
    } else if (extraLarge) {
      return sizes.extraLarge;
    } else {
      return sizes.medium;
    }
  }
  return <View style={{margin: resolveSpacing()}} />;
};
