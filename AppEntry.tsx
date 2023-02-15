import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Router} from './src/navigation/Router';

function AppEntry() {
  return (
    <SafeAreaProvider>
      <Router />
    </SafeAreaProvider>
  );
}

export default AppEntry;
