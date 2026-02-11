import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface TabNavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const tabs = [
    { id: 'Account Summary', label: 'Accounts' },
    { id: 'HYSA Overview', label: 'HYSA Overview' },
    { id: 'Cash Flow', label: 'Cash Flow' },
    { id: 'Transaction', label: 'Transaction' },
];

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
    return (
        <View className="bg-[#F7F7F7] py-2">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                className="flex-row"
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <TouchableOpacity
                            key={tab.id}
                            onPress={() => onTabChange(tab.id)}
                            className={`mr-3 px-5 py-2.5 rounded-full border ${isActive
                                ? 'bg-[#01205f] border-[#01205f]'
                                : 'bg-white border-gray-200'
                                }`}
                        >
                            <Text className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-600'}`}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default TabNavigation;
