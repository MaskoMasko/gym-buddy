import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from './View';
import {LoadingView} from './LoadingView';
import {ErrorView} from './ErrorView';

interface ScreenProps {
  children: React.ReactNode;
  preventScroll?: boolean;
  queryStatus?: {
    loading: boolean;
    error: boolean;
  };
  withoutTopInsets?: boolean;
  withoutBottomInsets?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  minHeight: {
    minHeight: '100%',
  },
});

export const Screen = ({
  children,
  preventScroll,
  queryStatus,
  withoutTopInsets,
  withoutBottomInsets,
}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={styles.container} bounces={!preventScroll}>
      <KeyboardAvoidingView
        style={[styles.container, styles.minHeight]}
        keyboardVerticalOffset={-(insets.bottom + insets.top)}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={[
            styles.flexGrow,
            {
              paddingTop: withoutTopInsets ? 0 : insets.top,
              paddingBottom: withoutBottomInsets ? 0 : insets.bottom,
            },
          ]}>
          {queryStatus?.loading ? (
            <LoadingView />
          ) : queryStatus?.error ? (
            <ErrorView />
          ) : (
            <>{children}</>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
