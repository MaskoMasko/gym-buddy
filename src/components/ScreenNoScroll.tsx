import React from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ErrorView} from './ErrorView';
import {LoadingView} from './LoadingView';
import {View} from './View';
// import {useHeaderHeight} from '@react-navigation/elements';

interface ScreenNoScrollProps {
  children: React.ReactNode;
  preventScroll?: boolean;
  queryStatus?: {
    loading: boolean;
    error: boolean;
  };
  withTopInsets?: boolean;
  withBottomInsets?: boolean;
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

export const ScreenNoScroll = ({
  children,
  queryStatus,
  withTopInsets,
  withBottomInsets,
}: ScreenNoScrollProps) => {
  const insets = useSafeAreaInsets();
  // const headerHeight = useHeaderHeight();
  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={-(insets.bottom + insets.top)}
      behavior={'padding'}>
      <View
        style={[
          styles.flexGrow,
          {
            paddingTop: withTopInsets ? insets.top : 0,
            paddingBottom: withBottomInsets ? insets.bottom : 0,
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
  );
};
