import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { User } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ route, navigation }: Props) {
  const { userId } = route.params;

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-indigo-50 to-purple-100">
      <View className="items-center px-6 py-12">
        <View className="bg-white rounded-3xl shadow-2xl p-8 w-full">
          <View className="items-center mb-6">
            <View className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full items-center justify-center mb-4 shadow-lg">
              <User color="white" size={48} />
            </View>
            <Text className="text-3xl font-bold text-slate-800 mb-2">
              Profile Screen
            </Text>
          </View>

          <View className="bg-indigo-50 rounded-xl p-5 mb-8">
            <Text className="text-sm text-gray-500 mb-1 font-medium">User ID</Text>
            <Text className="text-xl font-bold text-indigo-700">{userId}</Text>
          </View>

          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <Text className="text-gray-700 text-sm leading-6">
              This is your profile page. Here you can view and manage your account information.
            </Text>
          </View>

          <Pressable
            className="bg-blue-600 rounded-xl py-4 px-6 active:bg-blue-700 shadow-lg"
            onPress={() => navigation.navigate('Home')}>
            <Text className="text-white text-center font-semibold text-lg">
              🏠 Go to Home
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
