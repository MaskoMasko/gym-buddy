import React, {ComponentType, ForwardedRef, forwardRef} from 'react';
import {ViewStyle} from 'react-native';
import {sizes} from '../style/componentConstants';
import {colors} from '../style/palette';

export interface LayoutProps {
  marginExtraSmall?: boolean;
  marginSmall?: boolean;
  marginMedium?: boolean;
  marginLarge?: boolean;
  marginExtraLarge?: boolean;

  marginVerticalExtraSmall?: boolean;
  marginVerticalSmall?: boolean;
  marginVerticalMedium?: boolean;
  marginVerticalLarge?: boolean;
  marginVerticalExtraLarge?: boolean;

  marginHorizontalExtraSmall?: boolean;
  marginHorizontalSmall?: boolean;
  marginHorizontalMedium?: boolean;
  marginHorizontalLarge?: boolean;
  marginHorizontalExtraLarge?: boolean;

  backgroundColorTheme?: boolean;
  backgroundColorError?: boolean;
  backgroundColorWarning?: boolean;
  backgroundColorDark?: boolean;
  backgroundColorLight?: boolean;
  backgroundColorSuccess?: boolean;
  backgroundColorAccent?: boolean;
  backgroundColorLightDark?: boolean;
  backgroundColorLightSoft?: boolean;
  backgroundColorWhite?: boolean;
  backgroundColorDarkGray?: boolean;
  backgroundColorDisabled?: boolean;

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
export function withLayoutProps<T extends {style?: any}>(
  Component: ComponentType<T>,
) {
  return forwardRef(
    (
      {
        style: customStyle,

        marginExtraSmall,
        marginSmall,
        marginMedium,
        marginLarge,
        marginExtraLarge,

        marginVerticalExtraSmall,
        marginVerticalSmall,
        marginVerticalMedium,
        marginVerticalLarge,
        marginVerticalExtraLarge,

        marginHorizontalExtraSmall,
        marginHorizontalSmall,
        marginHorizontalMedium,
        marginHorizontalLarge,
        marginHorizontalExtraLarge,

        backgroundColorTheme,
        backgroundColorError,
        backgroundColorWarning,
        backgroundColorDark,
        backgroundColorLight,
        backgroundColorSuccess,
        backgroundColorAccent,
        backgroundColorLightDark,
        backgroundColorLightSoft,
        backgroundColorWhite,
        backgroundColorDarkGray,
        backgroundColorDisabled,

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
      }: T & LayoutProps,
      ref: ForwardedRef<T & LayoutProps>,
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
        } else if (backgroundColorLightDark) {
          return colors.lightDark;
        } else if (backgroundColorLightSoft) {
          return colors.lightSoft;
        } else if (backgroundColorWhite) {
          return colors.white;
        } else if (backgroundColorDarkGray) {
          return colors.darkGray;
        } else if (backgroundColorDisabled) {
          return colors.disabled;
        } else {
          return undefined;
        }
      }
      function resolveMargin() {
        const style: ViewStyle = {};
        if (marginExtraSmall) {
          style.margin = sizes.extraSmall;
        }
        if (marginSmall) {
          style.margin = sizes.small;
        }
        if (marginLarge) {
          style.margin = sizes.large;
        }
        if (marginExtraLarge) {
          style.margin = sizes.extraLarge;
        }
        if (marginMedium) {
          style.margin = sizes.medium;
        }
        if (marginVerticalExtraSmall) {
          style.marginVertical = sizes.extraSmall;
        }
        if (marginVerticalSmall) {
          style.marginVertical = sizes.small;
        }
        if (marginVerticalLarge) {
          style.marginVertical = sizes.large;
        }
        if (marginVerticalExtraLarge) {
          style.marginVertical = sizes.extraLarge;
        }
        if (marginVerticalMedium) {
          style.marginVertical = sizes.medium;
        }
        if (marginHorizontalExtraSmall) {
          style.marginHorizontal = sizes.extraSmall;
        }
        if (marginHorizontalSmall) {
          style.marginHorizontal = sizes.small;
        }
        if (marginHorizontalLarge) {
          style.marginHorizontal = sizes.large;
        }
        if (marginHorizontalExtraLarge) {
          style.marginHorizontal = sizes.extraLarge;
        }
        if (marginHorizontalMedium) {
          style.marginHorizontal = sizes.medium;
        }
        return style;
      }
      const style: ViewStyle = {
        ...resolveFlexing(),
        ...resolveMargin(),
        backgroundColor: resolveBackgroundColor(),
      };
      return (
        //I found a workaround for any, but when I do it I need to pass generic type
        //If we don't pass generic type, components will be confused, and
        //Understandable, have a nice day
        <Component
          ref={ref}
          {...(otherProps as any)}
          style={[style, customStyle]}
        />
      );
    },
  );
}
