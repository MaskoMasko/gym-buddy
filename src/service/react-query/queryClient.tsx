import React from 'react';
import {
  QueryClient,
  QueryClientProvider as RQQueryClientProvider,
} from 'react-query';

export const client = new QueryClient({
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
    <RQQueryClientProvider client={client}>{children}</RQQueryClientProvider>
  );
};
