import './global.css';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigation/navigationRef';
import AppNavigator from './src/navigation/AppNavigator';

import { KYCProvider } from './src/context/KYCContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <KYCProvider>
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </KYCProvider>
    </QueryClientProvider>
  );
}
