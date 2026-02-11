import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ScreenWrapper from '../components/ScreenWrapper';
import { useScreenLoading } from '../../../hooks/useScreenLoading';
import ActionsSkeleton from '../../../components/skeletons/ActionsSkeleton';

import actionsData from '../../../data/actionsData.json';

const ActionButton = ({ icon, label, color, description }: { icon: any, label: string, color: string, description: string }) => (
    <TouchableOpacity
        activeOpacity={1}
        className="bg-white p-5 rounded-[10px] shadow-sm mb-4 flex-row items-center border border-[#e8ebf3]"
    >
        <View className={`w-14 h-14 rounded-full items-center justify-center mr-5`} style={{ backgroundColor: `${color}15` }}>
            <Ionicons name={icon} size={28} color={color} />
        </View>
        <View className="flex-1">
            <Text className="text-lg font-bold text-gray-800 mb-1">{label}</Text>
            <Text className="text-gray-400 text-sm" numberOfLines={2}>{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
    </TouchableOpacity>
);

const ActionsScreen = () => {
    const isLoading = useScreenLoading();

    if (isLoading) {
        return <ActionsSkeleton />;
    }

    return (
        <ScreenWrapper title="Actions" showBackButton={false}>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="px-6 pt-6 pb-24">
                    {/* Iterate through Categories */}
                    {actionsData.categories.map((category) => (
                        <View key={category.id} className="mb-8">
                            <Text className="text-gray-500 font-bold uppercase text-xs mb-4 tracking-wider">
                                {category.title}
                            </Text>

                            {/* Iterate through Actions in Category */}
                            {category.actions.map((action) => (
                                <ActionButton
                                    key={action.id}
                                    icon={action.icon}
                                    label={action.label}
                                    color={action.color}
                                    description={action.description}
                                />
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

export default ActionsScreen;
