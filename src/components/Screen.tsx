import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from './View';

interface ScreenProps {
  children: React.ReactNode;
  preventScroll?: boolean;
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

export const Screen = ({children, preventScroll}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={styles.container} bounces={!preventScroll}>
      <KeyboardAvoidingView
        style={[styles.container, styles.minHeight]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={[
            styles.flexGrow,
            {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}>
          {children}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
