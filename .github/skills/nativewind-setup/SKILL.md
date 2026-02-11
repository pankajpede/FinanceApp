# NativeWind Setup for React Native with Expo

## Overview
NativeWind is a library that brings Tailwind CSS to React Native. It allows you to use Tailwind's utility-first CSS classes directly in your React Native components, providing a consistent styling experience across web and mobile platforms.

## Installation

### Core Dependencies
```bash
npm install nativewind tailwindcss@~3.4 react-native-reanimated
npm install --save-dev babel-preset-expo
```

### Key Packages
- **nativewind**: Core NativeWind library (v4.x)
- **tailwindcss**: Tailwind CSS framework (v3.x - Note: v4 not yet supported)
- **react-native-reanimated**: Required for animations and transforms

## Configuration Files

### 1. Tailwind Config
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 2. Babel Config
```javascript
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', {jsxImportSource: 'nativewind'}],
      'nativewind/babel',
    ],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

### 3. Metro Config
```javascript
// metro.config.js
const {getDefaultConfig} = require('expo/metro-config');
const {withNativeWind} = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {input: './global.css'});
```

### 4. Global CSS
```css
/* global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. TypeScript Declaration (if using TypeScript)
```typescript
// nativewind-env.d.ts
/// <reference types="nativewind/types" />
```

## Usage

### Import Global CSS
Import in your root component:
```typescript
// App.tsx
import './global.css';
```

### Using Utility Classes
```typescript
import {View, Text} from 'react-native';

export default function MyComponent() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-600">
        Hello NativeWind!
      </Text>
    </View>
  );
}
```

## Common Utility Classes

### Layout
- **Flexbox**: `flex`, `flex-1`, `flex-row`, `flex-col`
- **Alignment**: `items-center`, `justify-center`, `justify-between`
- **Spacing**: `p-4`, `px-2`, `py-4`, `m-4`, `mx-auto`, `gap-2`

### Typography
- **Size**: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`
- **Weight**: `font-normal`, `font-medium`, `font-semibold`, `font-bold`
- **Color**: `text-gray-600`, `text-blue-500`, `text-red-700`
- **Alignment**: `text-center`, `text-left`, `text-right`

### Colors
- **Background**: `bg-white`, `bg-gray-50`, `bg-blue-500`
- **Border**: `border-gray-200`, `border-blue-600`
- **Text**: `text-gray-900`, `text-blue-600`

### Borders & Rounded
- **Width**: `border`, `border-2`, `border-t`, `border-b`
- **Radius**: `rounded`, `rounded-lg`, `rounded-full`
- **Style**: `border-solid`, `border-dashed`

### Sizing
- **Width**: `w-full`, `w-1/2`, `w-screen`
- **Height**: `h-full`, `h-screen`, `h-32`
- **Min/Max**: `min-h-screen`, `max-w-md`

## Advanced Features

### Responsive Design (Limited Support)
NativeWind has limited responsive support compared to web:
```typescript
<View className="w-full md:w-1/2">
  {/* Content */}
</View>
```

### Dark Mode
```typescript
<View className="bg-white dark:bg-gray-900">
  <Text className="text-gray-900 dark:text-white">
    Adaptive Text
  </Text>
</View>
```

### Custom Theme Extension
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
};
```

### Platform-Specific Styles
```javascript
const {platformSelect} = require('nativewind/theme');

module.exports = {
  theme: {
    extend: {
      colors: {
        error: platformSelect({
          ios: 'red',
          android: 'blue',
          default: 'green',
        }),
      },
    },
  },
};
```

## Best Practices

1. **Import Global CSS**: Always import `global.css` in your root component
2. **Use className**: Use `className` prop instead of `style` for Tailwind classes
3. **Cache Clear**: Run `npx expo start --clear` after config changes
4. **Consistent Spacing**: Use Tailwind's spacing scale for consistency
5. **Semantic Colors**: Define semantic colors in theme config

## Common Issues & Solutions

### Styles Not Applying
1. Clear Metro cache: `npx expo start --clear`
2. Check `content` paths in `tailwind.config.js`
3. Ensure `global.css` is imported
4. Verify Babel config includes NativeWind preset

### Version Compatibility
- NativeWind v4.x requires Tailwind CSS v3.x (not v4)
- Ensure `tailwindcss@~3.4` is installed

### TypeScript Errors
Add `nativewind-env.d.ts` to project root:
```typescript
/// <reference types="nativewind/types" />
```

## Example Components

### Button Component
```typescript
import {TouchableOpacity, Text} from 'react-native';

export default function Button({title, onPress}) {
  return (
    <TouchableOpacity 
      className="bg-blue-500 px-6 py-3 rounded-lg active:bg-blue-600"
      onPress={onPress}>
      <Text className="text-white font-semibold text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
```

### Card Component
```typescript
import {View, Text} from 'react-native';

export default function Card({title, children}) {
  return (
    <View className="bg-white rounded-lg shadow-md p-4 mb-4">
      <Text className="text-xl font-bold text-gray-800 mb-2">
        {title}
      </Text>
      {children}
    </View>
  );
}
```

## Performance Tips

1. **Avoid Inline Styles**: Stick to Tailwind classes for better performance
2. **Use Reanimated**: NativeWind integrates well with `react-native-reanimated`
3. **Static Extraction**: Styles are extracted at build time (zero runtime cost)

## Troubleshooting

### Metro Bundler Issues
```bash
# Clear all caches
npx expo start --clear
rm -rf node_modules
npm install
```

### Babel Transform Issues
Ensure correct order in `babel.config.js`:
1. `babel-preset-expo` with `jsxImportSource`
2. `nativewind/babel`
3. `react-native-reanimated/plugin` (must be last)

## Migration from StyleSheet

### Before
```typescript
import {StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
});

<View style={styles.container}>
  <Text style={styles.text}>Hello</Text>
</View>
```

### After
```typescript
import {View, Text} from 'react-native';

<View className="flex-1 items-center justify-center bg-white">
  <Text className="text-xl font-bold text-blue-500">Hello</Text>
</View>
```

## Resources
- [Official Documentation](https://www.nativewind.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Customization Guide](https://www.nativewind.dev/docs/customization/theme)

## Version Info
- NativeWind: v4.2.1
- Tailwind CSS: v3.4.x (v4 not supported yet)
- Compatible with: Expo SDK 54+, React Native 0.81+
