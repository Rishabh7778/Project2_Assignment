import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      staleTime: 10_000,
    },
  },
});

const QueryProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

export default QueryProvider;
