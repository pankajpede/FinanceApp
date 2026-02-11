import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dashboardData from '../../../../data/client-dashboard.json';

const HYSAOverview = () => {
    const { distribution, topClients, openedYTD } = dashboardData.hysaOverview;

    // Helper to calculate widths for bar chart
    const maxBalance = Math.max(...distribution.map(d => d.balance));

    return (
        <View className="flex-1 px-4 py-4">
            {/* Opened YTD */}
            <View className="bg-white p-4 rounded-[10px] mb-6 flex-row items-center justify-between shadow-sm border border-[#e8ebf3]">
                <View>
                    <Text className="text-gray-500 text-sm mb-1">Accounts Opened (YTD)</Text>
                    <Text className="text-3xl font-bold text-[#01205f]">{openedYTD.count}</Text>
                </View>
                <View className={`h-10 w-10 rounded-full items-center justify-center ${openedYTD.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                    <Ionicons
                        name={openedYTD.trend === 'up' ? 'arrow-up' : 'arrow-down'}
                        size={20}
                        color={openedYTD.trend === 'up' ? '#16a34a' : '#dc2626'}
                    />
                </View>
            </View>

            {/* HYSA Balance Distribution (Custom Horizontal Bar Chart) */}
            <Text className="text-lg font-bold text-gray-800 mb-4">Balance Distribution</Text>
            <View className="bg-white rounded-[10px] p-5 mb-6 shadow-sm border border-[#e8ebf3]">
                {distribution.map((item, index) => {
                    const widthPercentage = (item.balance / maxBalance) * 100;
                    return (
                        <View key={index} className="mb-4 last:mb-0">
                            <View className="flex-row justify-between mb-2">
                                <Text className="text-gray-600 font-medium">{item.client}</Text>
                                <Text className="text-[#01205f] font-bold">${item.balance.toLocaleString()}</Text>
                            </View>
                            <View className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <View
                                    className="h-full bg-[#01205f] rounded-full"
                                    style={{ width: `${widthPercentage}%` }}
                                />
                            </View>
                        </View>
                    );
                })}
            </View>

            {/* Top Client Balances */}
            <Text className="text-lg font-bold text-gray-800 mb-3">Top Client Balances</Text>
            <View className="bg-white rounded-[10px] p-2 mb-6 border border-[#e8ebf3]">
                {topClients.map((item, index) => (
                    <View key={index} className="flex-row items-center justify-between py-4 px-2 border-b border-gray-50 last:border-0">
                        <View>
                            <Text className="text-gray-800 font-semibold text-base mb-1">{item.name}</Text>
                            <Text className="text-gray-400 text-xs">{item.percentage}% of Total</Text>
                        </View>
                        <Text className="text-[#01205f] font-bold text-base">${item.balance.toLocaleString()}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default HYSAOverview;
