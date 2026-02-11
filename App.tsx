import './global.css';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
