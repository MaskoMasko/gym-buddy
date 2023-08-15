import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Router} from './src/navigation/Router';
import {AuthUserProvider} from './src/hooks/useAuth';
import {QueryClientProvider} from './src/service/react-query/queryClient';
import {Screen} from './src/components/Screen';
import {View} from './src/components/View';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, Linking, Platform, StyleSheet} from 'react-native';
import './src/utils/atArray';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AlertContextProvider} from './src/hooks/useAlert';

function AppEntry() {
  const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_PERSISTENCE';

  const [isAppReady, setIsAppReady] = useState(false);

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    // PERSIST_NAVIGATION -> toggle
    const shouldPersistNavigation = __DEV__;
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (
          Platform.OS !== 'web' &&
          initialUrl == null &&
          shouldPersistNavigation
        ) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(
            NAVIGATION_PERSISTENCE_KEY,
          );
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
      setIsAppReady(true);
    }
  }, [isReady]);

  if (!isReady) {
    return <ActivityIndicator />;
  }
  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <AlertContextProvider>
          <QueryClientProvider>
            <AuthUserProvider>
              {isAppReady ? (
                <Router
                  initialState={initialState}
                  onStateChange={(state: any) =>
                    AsyncStorage.setItem(
                      NAVIGATION_PERSISTENCE_KEY,
                      JSON.stringify(state),
                    )
                  }
                />
              ) : (
                <Screen>
                  <View flex backgroundColorTheme />
                </Screen>
              )}
            </AuthUserProvider>
          </QueryClientProvider>
        </AlertContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default AppEntry;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
