import React, {ForwardedRef, forwardRef} from 'react';
import {
  View as RNView,
  ViewProps as RNViewProps,
  ViewStyle,
} from 'react-native';
import {colors} from '../style/palette';
import {sizes} from '../style/componentConstants';

interface ViewProps extends RNViewProps {
  paddingExtraSmall?: boolean;
  paddingSmall?: boolean;
  paddingMedium?: boolean;
  paddingLarge?: boolean;
  paddingExtraLarge?: boolean;

  paddingVerticalExtraSmall?: boolean;
  paddingVerticalSmall?: boolean;
  paddingVerticalMedium?: boolean;
  paddingVerticalLarge?: boolean;
  paddingVerticalExtraLarge?: boolean;

  paddingHorizontalExtraSmall?: boolean;
  paddingHorizontalSmall?: boolean;
  paddingHorizontalMedium?: boolean;
  paddingHorizontalLarge?: boolean;
  paddingHorizontalExtraLarge?: boolean;

  backgroundColorTheme?: boolean;
  backgroundColorError?: boolean;
  backgroundColorWarning?: boolean;
  backgroundColorDark?: boolean;
  backgroundColorLight?: boolean;
  backgroundColorSuccess?: boolean;
  backgroundColorAccent?: boolean;

  flex?: boolean;

  justifyContentCenter?: boolean;
  justifyContentSpaceEvenly?: boolean;
  justifyContentSpaceBetween?: boolean;
  justifyContentFlexEnd?: boolean;
  justifyContentFlexStart?: boolean;
  justifyContentSpaceAround?: boolean;

  alignContentCenter?: boolean;
  alignContentFlexEnd?: boolean;
  alignContentFlexStart?: boolean;
  alignContentSpaceAround?: boolean;
  alignContentSpaceBetween?: boolean;
  alignContentStretch?: boolean;

  alignItemsCenter?: boolean;
  alignItemsFlexEnd?: boolean;
  alignItemsFlexStart?: boolean;
  alignItemsBaseline?: boolean;
  alignItemsStretch?: boolean;

  alignSelfCenter?: boolean;
  alignSelfBaseline?: boolean;
  alignSelfStretch?: boolean;
  alignSelfFlexStart?: boolean;
  alignSelfFlexEnd?: boolean;
  alignSelfAuto?: boolean;

  flexWrap?: boolean;
  flexWrapReverse?: boolean;

  centerContent?: boolean;

  flexDirectionRow?: boolean;
  flexDirectionColumn?: boolean;
  flexDirectionRowReverse?: boolean;
  flexDirectionColumnReverse?: boolean;
}

export const View = forwardRef(
  (
    {
      children,
      style: customStyle,

      paddingExtraSmall,
      paddingSmall,
      paddingMedium,
      paddingLarge,
      paddingExtraLarge,

      paddingVerticalExtraSmall,
      paddingVerticalSmall,
      paddingVerticalMedium,
      paddingVerticalLarge,
      paddingVerticalExtraLarge,

      paddingHorizontalExtraSmall,
      paddingHorizontalSmall,
      paddingHorizontalMedium,
      paddingHorizontalLarge,
      paddingHorizontalExtraLarge,

      backgroundColorTheme,
      backgroundColorError,
      backgroundColorWarning,
      backgroundColorDark,
      backgroundColorLight,
      backgroundColorSuccess,
      backgroundColorAccent,

      flex,

      justifyContentCenter,
      justifyContentSpaceEvenly,
      justifyContentSpaceBetween,
      justifyContentFlexEnd,
      justifyContentFlexStart,
      justifyContentSpaceAround,

      alignContentCenter,
      alignContentFlexEnd,
      alignContentFlexStart,
      alignContentSpaceAround,
      alignContentSpaceBetween,
      alignContentStretch,

      alignItemsCenter,
      alignItemsFlexEnd,
      alignItemsFlexStart,
      alignItemsBaseline,
      alignItemsStretch,

      alignSelfCenter,
      alignSelfBaseline,
      alignSelfStretch,
      alignSelfFlexStart,
      alignSelfFlexEnd,
      alignSelfAuto,

      flexWrap,
      flexWrapReverse,

      centerContent,

      flexDirectionRow,
      flexDirectionColumn,
      flexDirectionRowReverse,
      flexDirectionColumnReverse,

      ...otherProps
    }: ViewProps,
    ref: ForwardedRef<RNView>,
  ) => {
    function resolveFlexing() {
      const style: ViewStyle = {};
      if (flex) {
        style.flex = 1;
      }
      if (centerContent) {
        style.justifyContent = 'center';
        style.alignItems = 'center';
      }
      //justify content
      if (justifyContentCenter) {
        style.justifyContent = 'center';
      }
      if (justifyContentSpaceAround) {
        style.justifyContent = 'space-around';
      }
      if (justifyContentSpaceBetween) {
        style.justifyContent = 'space-between';
      }
      if (justifyContentSpaceEvenly) {
        style.justifyContent = 'space-evenly';
      }
      if (justifyContentFlexEnd) {
        style.justifyContent = 'flex-end';
      }
      if (justifyContentFlexStart) {
        style.justifyContent = 'flex-start';
      }
      //align content
      if (alignContentCenter) {
        style.alignContent = 'center';
      }
      if (alignContentSpaceAround) {
        style.alignContent = 'space-around';
      }
      if (alignContentSpaceBetween) {
        style.alignContent = 'space-between';
      }
      if (alignContentFlexEnd) {
        style.alignContent = 'flex-end';
      }
      if (alignContentFlexStart) {
        style.alignContent = 'flex-start';
      }
      if (alignContentStretch) {
        style.alignContent = 'stretch';
      }
      //align items
      if (alignItemsCenter) {
        style.alignItems = 'center';
      }
      if (alignItemsFlexEnd) {
        style.alignItems = 'flex-end';
      }
      if (alignItemsFlexStart) {
        style.alignItems = 'flex-start';
      }
      if (alignItemsBaseline) {
        style.alignItems = 'baseline';
      }
      if (alignItemsStretch) {
        style.alignItems = 'stretch';
      }
      //align self
      if (alignSelfCenter) {
        style.alignSelf = 'center';
      }
      if (alignSelfFlexEnd) {
        style.alignSelf = 'flex-end';
      }
      if (alignSelfFlexStart) {
        style.alignSelf = 'flex-start';
      }
      if (alignSelfBaseline) {
        style.alignSelf = 'baseline';
      }
      if (alignSelfStretch) {
        style.alignSelf = 'stretch';
      }
      if (alignSelfAuto) {
        style.alignSelf = 'auto';
      }
      //flex direction
      if (flexDirectionRow) {
        style.flexDirection = 'row';
      }
      if (flexDirectionColumn) {
        style.flexDirection = 'column';
      }
      if (flexDirectionColumnReverse) {
        style.flexDirection = 'column-reverse';
      }
      if (flexDirectionRowReverse) {
        style.flexDirection = 'row-reverse';
      }
      //flex wrap
      if (flexWrap) {
        style.flexWrap = 'wrap';
      }
      if (flexWrapReverse) {
        style.flexWrap = 'wrap-reverse';
      }
      return style;
    }
    function resolveBackgroundColor() {
      if (backgroundColorTheme) {
        return colors.theme;
      } else if (backgroundColorError) {
        return colors.error;
      } else if (backgroundColorWarning) {
        return colors.warning;
      } else if (backgroundColorDark) {
        return colors.dark;
      } else if (backgroundColorLight) {
        return colors.light;
      } else if (backgroundColorSuccess) {
        return colors.success;
      } else if (backgroundColorAccent) {
        return colors.accent;
      } else {
        return undefined;
      }
    }
    function resolvePadding() {
      const style: ViewStyle = {};
      if (paddingExtraSmall) {
        style.padding = sizes.extraSmall;
      } else if (paddingSmall) {
        style.padding = sizes.small;
      } else if (paddingLarge) {
        style.padding = sizes.large;
      } else if (paddingExtraLarge) {
        style.padding = sizes.extraLarge;
      } else if (paddingMedium) {
        style.padding = sizes.medium;
      } else if (paddingVerticalExtraSmall) {
        style.paddingVertical = sizes.extraSmall;
      } else if (paddingVerticalSmall) {
        style.paddingVertical = sizes.small;
      } else if (paddingVerticalLarge) {
        style.paddingVertical = sizes.large;
      } else if (paddingVerticalExtraLarge) {
        style.paddingVertical = sizes.extraLarge;
      } else if (paddingVerticalMedium) {
        style.paddingVertical = sizes.medium;
      } else if (paddingHorizontalExtraSmall) {
        style.paddingHorizontal = sizes.extraSmall;
      } else if (paddingHorizontalSmall) {
        style.paddingHorizontal = sizes.small;
      } else if (paddingHorizontalLarge) {
        style.paddingHorizontal = sizes.large;
      } else if (paddingHorizontalExtraLarge) {
        style.paddingHorizontal = sizes.extraLarge;
      } else if (paddingHorizontalMedium) {
        style.paddingHorizontal = sizes.medium;
      } else {
        style.padding = 0;
      }
      return style;
    }
    const style: ViewStyle = {
      ...resolveFlexing(),
      ...resolvePadding(),
      backgroundColor: resolveBackgroundColor(),
    };
    return (
      <RNView ref={ref} {...otherProps} style={[style, customStyle]}>
        {children}
      </RNView>
    );
  },
);
