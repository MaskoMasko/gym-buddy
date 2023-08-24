import React from 'react';
import {
  QueryClient,
  QueryClientProvider as RQQueryClientProvider,
} from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      structuralSharing: false,
    },
  },
});

export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <RQQueryClientProvider client={queryClient}>
      {children}
    </RQQueryClientProvider>
  );
};
