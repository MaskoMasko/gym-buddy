import React from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
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
  withList?: boolean;
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
  withBottomInsets,
  withTopInsets,
  withList,
}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  const content = (
    <>
      {queryStatus?.loading ? (
        <LoadingView />
      ) : queryStatus?.error ? (
        <ErrorView />
      ) : (
        <>{children}</>
      )}
    </>
  );
  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={-(insets.bottom + insets.top)}
      behavior={'padding'}>
      {withList ? (
        <View
          style={[
            styles.flexGrow,
            {
              paddingTop: withTopInsets ? insets.top : 0,
              paddingBottom: withBottomInsets ? insets.bottom : 0,
            },
          ]}>
          {content}
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[styles.flexGrow]}
          style={{
            paddingTop: withTopInsets ? insets.top : 0,
            paddingBottom: withBottomInsets ? insets.bottom : 0,
          }}
          keyboardShouldPersistTaps={'never'}
          bounces={!preventScroll}>
          {content}
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};
