import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Router} from './src/navigation/Router';
import {AuthUserProvider} from './src/hooks/useAuth';

function AppEntry() {
  return (
    <SafeAreaProvider>
      <AuthUserProvider>
        <Router />
      </AuthUserProvider>
    </SafeAreaProvider>
  );
}

export default AppEntry;
