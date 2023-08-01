import React, {ReactNode} from 'react';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const S = StyleSheet.create({
  backdrop: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(29,29,29,.5)',
  },
  flex: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
export const Backdrop = ({
  children,
  onPress,
  style,
}: {
  children: ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          S.backdrop,
          {backgroundColor: style?.backgroundColor ?? 'rgba(29,29,29,.6)'},
        ]}>
        <Pressable
          style={[S.flex, {...style, backgroundColor: undefined}]}
          onPress={onPress}>
          {children}
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
