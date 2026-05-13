import React from 'react';
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

import MobileEntryScreen from '../screens/kyc/MobileEntryScreen';
import OTPVerificationScreen from '../screens/kyc/OTPVerificationScreen';
import ConsentPermissionsScreen from '../screens/kyc/ConsentPermissionsScreen';
import PANVerificationScreen from '../screens/kyc/PANVerificationScreen';
import AadhaarVerificationScreen from '../screens/kyc/AadhaarVerificationScreen';
import DigiLockerScreen from '../screens/kyc/DigiLockerScreen';
import SelfieCaptureScreen from '../screens/kyc/SelfieCaptureScreen';
import KYCProcessingScreen from '../screens/kyc/KYCProcessingScreen';
import DocumentUploadScreen from '../screens/kyc/DocumentUploadScreen';
import AddressVerificationScreen from '../screens/kyc/AddressVerificationScreen';
import EmploymentDetailsScreen from '../screens/kyc/EmploymentDetailsScreen';
import FATCADeclarationScreen from '../screens/kyc/FATCADeclarationScreen';
import NomineeDetailsScreen from '../screens/kyc/NomineeDetailsScreen';
import SignatureUploadScreen from '../screens/kyc/SignatureUploadScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="MobileEntry" component={MobileEntryScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="ConsentPermissions" component={ConsentPermissionsScreen} />
      <Stack.Screen name="PANVerification" component={PANVerificationScreen} />
      <Stack.Screen name="AadhaarVerification" component={AadhaarVerificationScreen} />
      <Stack.Screen name="DigiLockerConnect" component={DigiLockerScreen} />
      <Stack.Screen name="SelfieCapture" component={SelfieCaptureScreen} />
      <Stack.Screen name="FaceMatchProcessing" component={KYCProcessingScreen} />
      <Stack.Screen name="DocumentUpload" component={DocumentUploadScreen} />
      <Stack.Screen name="AddressVerification" component={AddressVerificationScreen} />
      <Stack.Screen name="EmploymentDetails" component={EmploymentDetailsScreen} />
      <Stack.Screen name="FATCADeclaration" component={FATCADeclarationScreen} />
      <Stack.Screen name="NomineeDetails" component={NomineeDetailsScreen} />
      <Stack.Screen name="SignatureUpload" component={SignatureUploadScreen} />
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
  );
}
