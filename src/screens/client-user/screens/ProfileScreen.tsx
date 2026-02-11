import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useScreenLoading } from '../../../hooks/useScreenLoading';
import ProfileSkeleton from '../../../components/skeletons/ProfileSkeleton';
import profileData from '../../../data/profileData.json';

import ScreenWrapper from '../components/ScreenWrapper';

const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const isLoading = useScreenLoading();

    if (isLoading) {
        return <ProfileSkeleton />;
    }

    const { user, settings } = profileData.profile;

    return (
        <ScreenWrapper title="Profile" showBackButton={false}>
            <View className="px-6 pt-6">

                {/* Profile Header */}
                <View className="items-center mb-10">
                    <Image
                        source={{ uri: user.avatarUrl }}
                        className="w-24 h-24 rounded-full mb-4 border-4 border-white shadow-sm"
                    />
                    <Text className="text-2xl font-bold text-gray-800 mb-1">{user.name}</Text>
                    <Text className="text-gray-500">{user.email}</Text>
                </View>

                {/* Settings List */}
                <View className="bg-white rounded-[10px] p-2 mb-8 shadow-sm border border-[#e8ebf3]">
                    {settings.map((item) => (
                        <TouchableOpacity key={item.id} className="flex-row items-center justify-between py-4 px-4 border-b border-gray-50 last:border-0">
                            <View className="flex-row items-center">
                                <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-4">
                                    <Ionicons name={item.icon as any} size={20} color="#01205f" />
                                </View>
                                <Text className="text-gray-700 font-medium text-base">{item.label}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    className="bg-red-50 p-4 rounded-2xl flex-row items-center justify-center mb-12"
                    onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
                >
                    <Ionicons name="log-out-outline" size={20} color="#dc2626" className="mr-2" />
                    <Text className="text-red-600 font-semibold">Log Out</Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    );
};

export default ProfileScreen;
