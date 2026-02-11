import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

interface ScreenWrapperProps {
    title: string;
    children: ReactNode;
    showBackButton?: boolean;
    headerRight?: ReactNode;
    headerBottom?: ReactNode;
    scrollEnabled?: boolean;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ title, children, showBackButton = true, headerRight, headerBottom, scrollEnabled = true }) => {
    const navigation = useNavigation<any>();

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="light" />

            {/* Header Section */}
            <View className="bg-[#01205f] pt-[60px] pb-6 px-6 relative">
                <View className="flex-row items-center mb-6">
                    {showBackButton && (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            className="mr-4"
                        >
                            <Ionicons name="chevron-back" size={28} color="white" />
                        </TouchableOpacity>
                    )}
                    <Text className="text-white text-2xl font-bold flex-1">
                        {title}
                    </Text>
                    {headerRight && (
                        <View>
                            {headerRight}
                        </View>
                    )}
                </View>
                {headerBottom && (
                    <View className="mb-6">
                        {headerBottom}
                    </View>
                )}
            </View>

            {/* Content Section with Overlap */}
            <View className="flex-1 bg-gray-50 -mt-10 rounded-t-[30px] overflow-hidden">
                {scrollEnabled ? (
                    <ScrollView
                        className="flex-1"
                        contentContainerStyle={{ paddingBottom: 100 }} // Padding for bottom tab
                        showsVerticalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>
                ) : (
                    <View className="flex-1">
                        {children}
                    </View>
                )}
            </View>
        </View>
    );
};

export default ScreenWrapper;
