export default {
  expo: {
    name: 'Sai Sugar',
    slug: 'sai-sugar-app',
    version: '1.0.0',
    newArchEnabled: true,
    android: {
      package: 'com.saisugar.app',
    },
    ios: {
      bundleIdentifier: 'com.saisugar.app',
    },
    extra: {
      eas: {
        projectId: '08c9efea-c058-4ea2-88e6-39462575523b',
      },
    },
  },
  plugins: [
    'expo-router',
    [
      'expo-dev-client',
      {
        addPlayStoreMessage: true,
      },
    ],
  ],
};
