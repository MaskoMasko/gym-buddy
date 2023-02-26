import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Router} from './src/navigation/Router';
import {AuthUserProvider} from './src/hooks/useAuth';
import {QueryClientProvider} from './src/service/http/react-query/queryClient';

function AppEntry() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider>
        <AuthUserProvider>
          <Router />
        </AuthUserProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default AppEntry;
