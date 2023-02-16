import React, {ComponentType, ForwardedRef, forwardRef} from 'react';
import {TextStyle} from 'react-native';
import {colors} from '../style/palette';
import {
  fontColors,
  fontFamily,
  fontSizes,
  fontWeights,
} from '../style/typography';

interface TextProps {
  //font sizes
  //default size medium
  extraSmall?: boolean;
  small?: boolean;
  large?: boolean;
  extraLarge?: boolean;

  //font weight
  //default weight regular
  weightMedium?: boolean;
  weightSemibold?: boolean;
  weightBold?: boolean;
  weightLight?: boolean;

  //font color pallette
  //default color black;
  //light
  colorWhite?: boolean;
  colorOffWhite?: boolean;
  colorLightGray?: boolean;
  colorBeige?: boolean;
  //dark
  colorDarkGray?: boolean;
  colorNavyBlue?: boolean;
  //accent
  colorBlue?: boolean;
  colorGreen?: boolean;
  colorRed?: boolean;
  colorYellow?: boolean;
  colorDisabled?: boolean;

  //align
  alignSelfCenter?: boolean;

  //background colors
  backgroundColorTheme?: boolean;
  backgroundColorError?: boolean;
  backgroundColorWarning?: boolean;
  backgroundColorDark?: boolean;
  backgroundColorLight?: boolean;
  backgroundColorSuccess?: boolean;
  backgroundColorAccent?: boolean;
}
export function withTextProps<T extends {style?: any}>(
  Component: ComponentType<T>,
) {
  return forwardRef(
    (
      {
        style: customStyle,

        extraSmall,
        small,
        large,
        extraLarge,
        weightMedium,
        weightSemibold,
        weightBold,
        weightLight,
        colorWhite,
        colorOffWhite,
        colorLightGray,
        colorBeige,
        colorDarkGray,
        colorNavyBlue,
        colorBlue,
        colorGreen,
        colorRed,
        colorYellow,
        colorDisabled,
        alignSelfCenter,

        backgroundColorTheme,
        backgroundColorError,
        backgroundColorWarning,
        backgroundColorDark,
        backgroundColorLight,
        backgroundColorSuccess,
        backgroundColorAccent,

        ...otherProps
      }: TextProps & T,
      ref: ForwardedRef<TextProps & T>,
    ) => {
      function resolveFontSize() {
        if (extraSmall) {
          return fontSizes.extraSmall;
        } else if (small) {
          return fontSizes.small;
        } else if (large) {
          return fontSizes.large;
        } else if (extraLarge) {
          return fontSizes.extraLarge;
        } else {
          return fontSizes.medium;
        }
      }
      function resolveFontWeight() {
        if (weightLight) {
          return fontWeights.light;
        } else if (weightMedium) {
          return fontWeights.medium;
        } else if (weightSemibold) {
          return fontWeights.semibold;
        } else if (weightBold) {
          return fontWeights.bold;
        } else {
          return fontWeights.regular;
        }
      }
      function resolveFontColor() {
        if (colorWhite) {
          return fontColors.white;
        } else if (colorOffWhite) {
          return fontColors.offWhite;
        } else if (colorBeige) {
          return fontColors.beige;
        } else if (colorBlue) {
          return fontColors.blue;
        } else if (colorDarkGray) {
          return fontColors.darkGray;
        } else if (colorDisabled) {
          return fontColors.disabled;
        } else if (colorGreen) {
          return fontColors.green;
        } else if (colorLightGray) {
          return fontColors.lightGray;
        } else if (colorNavyBlue) {
          return fontColors.navyBlue;
        } else if (colorRed) {
          return fontColors.red;
        } else if (colorYellow) {
          return fontColors.yellow;
        } else {
          return fontColors.black;
        }
      }
      function resolveFontFamily() {
        if (weightLight) {
          return fontFamily.kanit.light;
        } else if (weightMedium) {
          return fontFamily.kanit.medium;
        } else if (weightSemibold) {
          return fontFamily.kanit.semibold;
        } else if (weightBold) {
          return fontFamily.kanit.bold;
        } else {
          return fontFamily.kanit.regular;
        }
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

      const style: TextStyle = {
        fontSize: resolveFontSize(),
        fontWeight: resolveFontWeight(),
        color: resolveFontColor(),
        fontFamily: resolveFontFamily(),
        backgroundColor: resolveBackgroundColor(),
      };

      if (alignSelfCenter) {
        style.alignSelf = 'center';
      }

      return (
        //I found a workaround for any, but when I do it I need to pass generic type
        //If we don't pass generic type, components will be confused, and simply no
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
