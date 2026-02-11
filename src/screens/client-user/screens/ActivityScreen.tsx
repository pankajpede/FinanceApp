import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import activityData from '../../../data/activityData.json';
import ScreenWrapper from '../components/ScreenWrapper';
import { useScreenLoading } from '../../../hooks/useScreenLoading';
import ActivitySkeleton from '../../../components/skeletons/ActivitySkeleton';

const ActivityScreen = () => {
    const isLoading = useScreenLoading();

    if (isLoading) {
        return <ActivitySkeleton />;
    }

    const { activities } = activityData;

    return (
        <ScreenWrapper title="Activity" showBackButton={false}>
            <View className="px-6 pt-6">
                <Text className="text-gray-500 mb-6">Recent transactions & updates</Text>

                <View className="bg-white rounded-[10px] p-2 mb-4 shadow-sm border border-[#e8ebf3]">
                    {activities.map((item) => (
                        <TouchableOpacity key={item.id} className="flex-row items-center justify-between py-4 px-3 border-b border-gray-50 last:border-0" activeOpacity={1}>
                            <View className="flex-row items-center flex-1">
                                <View className={`w-12 h-12 rounded-full items-center justify-center mr-4`} style={{ backgroundColor: `${item.color}15` }}>
                                    <Ionicons
                                        name={item.icon as any}
                                        size={24}
                                        color={item.color}
                                    />
                                </View>
                                <View className="flex-1 mr-4">
                                    <Text className="text-gray-800 font-semibold text-base mb-1" numberOfLines={1}>{item.title}</Text>
                                    <Text className="text-gray-400 text-xs" numberOfLines={1}>{item.subtitle}</Text>
                                    <Text className="text-gray-400 text-[10px] mt-1">{item.date} • {item.category}</Text>
                                </View>
                            </View>
                            <View className="items-end">
                                <View className={`px-2 py-1 rounded-full ${item.status === 'Completed' ? 'bg-green-100' :
                                    item.status === 'In Progress' ? 'bg-blue-100' :
                                        item.status === 'Action Required' ? 'bg-red-100' : 'bg-gray-100'
                                    }`}>
                                    <Text className={`text-[10px] font-bold ${item.status === 'Completed' ? 'text-green-700' :
                                        item.status === 'In Progress' ? 'text-blue-700' :
                                            item.status === 'Action Required' ? 'text-red-700' : 'text-gray-600'
                                        }`}>
                                        {item.status}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default ActivityScreen;
