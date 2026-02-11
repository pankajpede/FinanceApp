import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route, navigation }: Props) {
  const { itemId } = route.params;

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100">
      <View className="items-center justify-center px-6 py-12">
        <View className="bg-white rounded-2xl shadow-xl p-6 w-full">
          <Text className="text-3xl font-bold text-slate-800 mb-4 text-center">
            Details Screen 📋
          </Text>

          <View className="bg-blue-50 rounded-xl p-4 mb-6">
            <Text className="text-sm text-gray-500 mb-1">Item ID</Text>
            <Text className="text-2xl font-bold text-blue-600">{itemId}</Text>
          </View>

          <View className="gap-3">
            <Pressable
              className="bg-gray-600 rounded-xl py-4 px-6 active:bg-gray-700 shadow-md"
              onPress={() => navigation.goBack()}>
              <Text className="text-white text-center font-semibold text-base">
                ← Go Back
              </Text>
            </Pressable>

            <Pressable
              className="bg-indigo-600 rounded-xl py-4 px-6 active:bg-indigo-700 shadow-md"
              onPress={() => navigation.navigate('Profile', { userId: 'user123' })}>
              <Text className="text-white text-center font-semibold text-base">
                Go to Profile →
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
