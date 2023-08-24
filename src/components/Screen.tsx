import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../style/palette';
import {ErrorView} from './ErrorView';
import {LoadingView} from './LoadingView';
import {View} from './View';

interface ScreenProps {
  children: React.ReactNode;
  preventScroll?: boolean;
  queryStatus?: {
    loading: boolean;
    error: boolean;
  };
  withTopInsets?: boolean;
  withBottomInsets?: boolean;

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});

export const Screen = ({
  children,
  preventScroll,
  queryStatus,
  withBottomInsets,
  withTopInsets,
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
}: ScreenProps) => {
  const insets = useSafeAreaInsets();
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
  const contentContainerStyle = StyleSheet.flatten({
    paddingTop: withTopInsets ? insets.top : 0,
    paddingBottom: withBottomInsets ? insets.bottom : 0,
    backgroundColor: resolveBackgroundColor(),
  });

  if (queryStatus?.loading) {
    return <LoadingView />;
  }
  if (queryStatus?.error) {
    return <ErrorView />;
  }

  const content = <>{children}</>;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={preventScroll ? 0 : 100}>
      {preventScroll ? (
        <View style={[styles.inner, contentContainerStyle]}>{content}</View>
      ) : (
        <ScrollView
          keyboardShouldPersistTaps={'never'}
          contentContainerStyle={[styles.inner, contentContainerStyle]}>
          {content}
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};
