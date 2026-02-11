# React Navigation Setup for React Native with Expo

## Overview
React Navigation is the most popular navigation library for React Native applications. It provides a robust, JavaScript-based navigation solution that works across iOS, Android, and web platforms.

## Installation

### Core Dependencies
```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
```

### Key Packages
- **@react-navigation/native**: Core navigation library
- **@react-navigation/native-stack**: Native stack navigator using platform primitives
- **react-native-screens**: Native screen management for better performance
- **react-native-safe-area-context**: Safe area handling for notches/home indicators

## Project Structure

```
src/
├── navigation/
│   ├── AppNavigator.tsx    # Main navigation configuration
│   └── types.ts            # TypeScript navigation types
└── screens/
    ├── HomeScreen.tsx
    ├── DetailsScreen.tsx
    └── ProfileScreen.tsx
```

## Core Concepts

### 1. Navigation Types
Define your navigation structure with TypeScript for type safety:

```typescript
// src/navigation/types.ts
export type RootStackParamList = {
  Home: undefined;
  Details: {itemId: number};
  Profile: {userId: string};
};
```

### 2. Navigator Setup
Create a navigator with `createNativeStackNavigator`:

```typescript
// src/navigation/AppNavigator.tsx
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### 3. Screen Components
Use typed props for navigation and route:

```typescript
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({route, navigation}: Props) {
  const {itemId} = route.params;
  
  return (
    <View>
      <Text>Item ID: {itemId}</Text>
      <Button 
        title="Go Back" 
        onPress={() => navigation.goBack()} 
      />
    </View>
  );
}
```

## Navigation Methods

### Navigate to Screen
```typescript
navigation.navigate('Details', {itemId: 42});
```

### Go Back
```typescript
navigation.goBack();
```

### Replace Screen
```typescript
navigation.replace('Profile', {userId: 'user123'});
```

### Reset Navigation State
```typescript
navigation.reset({
  index: 0,
  routes: [{name: 'Home'}],
});
```

## Styling & Configuration

### Screen Options
Configure individual screens:

```typescript
<Stack.Screen 
  name="Details" 
  component={DetailsScreen}
  options={{
    title: 'Details',
    headerStyle: {backgroundColor: '#3b82f6'},
    headerTintColor: '#fff',
    headerTitleStyle: {fontWeight: 'bold'},
  }}
/>
```

### Navigator-wide Options
Apply options to all screens:

```typescript
<Stack.Navigator
  screenOptions={{
    headerStyle: {backgroundColor: '#3b82f6'},
    headerTintColor: '#fff',
  }}>
  {/* screens */}
</Stack.Navigator>
```

## Integration with App

```typescript
// App.tsx
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
}
```

## Best Practices

1. **Type Safety**: Always define TypeScript types for navigation params
2. **Organize**: Keep navigation configuration separate from screens
3. **Performance**: Use `react-native-screens` for better native performance
4. **Deep Linking**: Configure deep linking for better UX
5. **State Management**: Use navigation state persistence for better UX

## Additional Navigators

### Tab Navigator
```bash
npm install @react-navigation/bottom-tabs
```

### Drawer Navigator
```bash
npm install @react-navigation/drawer
```

## Resources
- [Official Documentation](https://reactnavigation.org/)
- [TypeScript Guide](https://reactnavigation.org/docs/typescript/)
- [API Reference](https://reactnavigation.org/docs/navigation-prop/)

## Version Info
- React Navigation: v7.x
- Native Stack Navigator: Latest
- Compatible with: Expo SDK 54+, React Native 0.81+
