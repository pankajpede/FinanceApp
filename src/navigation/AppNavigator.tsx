import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

import HomeScreen from '../screens/home/HomeScreen';
import DetailsScreen from '../screens/home/DetailsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

import SplashScreen from '../screens/splash/SplashScreen';

import AuthLandingScreen from '../screens/auth/AuthLandingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ClientDashboard from '../screens/client-user/client-dashboard/ClientDashboard';
import ClientTabNavigator from '../screens/client-user/navigation/ClientTabNavigator';

import NotificationsScreen from '../screens/client-user/screens/NotificationsScreen';

import SendMoneyScreen from '../screens/client-user/actions/SendMoneyScreen';
import SelectPayeeScreen from '../screens/client-user/actions/SelectPayeeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id="RootStack"
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="AuthLanding" component={AuthLandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ClientDashboard" component={ClientDashboard} />
        <Stack.Screen name="ClientTabs" component={ClientTabNavigator} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home', headerShown: true, headerStyle: { backgroundColor: '#3b82f6' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Details', headerShown: true, headerStyle: { backgroundColor: '#3b82f6' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profile', headerShown: true, headerStyle: { backgroundColor: '#3b82f6' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }}
        />
        <Stack.Screen name="SendMoney" component={SendMoneyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SelectPayee" component={SelectPayeeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
