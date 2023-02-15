import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';

interface ScreenProps {
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const Screen = ({children}: ScreenProps) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};
