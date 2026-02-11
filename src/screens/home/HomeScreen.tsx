import React from 'react';
import { View, Text, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100">
      <View className="flex-1 items-center justify-center px-6">
        <View className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
          <Text className="text-4xl font-bold text-slate-800 mb-3 text-center">
            Welcome Home! 🏠
          </Text>
          <Text className="text-base text-gray-600 text-center mb-8 leading-6">
            This is a React Native app with Expo, NativeWind, and React Navigation
          </Text>

          <Pressable
            className="bg-blue-600 rounded-xl py-4 px-6 active:bg-blue-700 shadow-md"
            onPress={() => navigation.navigate('Details', { itemId: 42 })}>
            <Text className="text-white text-center font-semibold text-lg">
              Go to Details →
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
