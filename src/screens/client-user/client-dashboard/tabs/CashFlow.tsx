import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dashboardData from '../../../../data/client-dashboard.json';

const CashFlow = () => {
    const { summary, monthly, transactions } = dashboardData.cashFlow;

    // Helper calculate max for column chart
    const maxFlow = Math.max(...monthly.map(m => Math.max(m.inflows, m.outflows)));

    return (
        <View className="flex-1 px-4 py-4">
            {/* Cash Flow Summary */}
            <View className="bg-white rounded-[10px] p-5 mb-6 shadow-sm border border-[#e8ebf3]">
                <View className="flex-row justify-between mb-4">
                    <View>
                        <Text className="text-gray-400 text-xs uppercase mb-1">Inflows</Text>
                        <Text className="text-green-600 font-bold text-lg">+${summary.inflows.toLocaleString()}</Text>
                    </View>
                    <View className="items-end">
                        <Text className="text-gray-400 text-xs uppercase mb-1">Outflows</Text>
                        <Text className="text-red-500 font-bold text-lg">-${summary.outflows.toLocaleString()}</Text>
                    </View>
                </View>
                <View className="bg-blue-50 p-4 rounded-xl items-center">
                    <Text className="text-blue-600 text-xs uppercase mb-1">Net Cash Flow</Text>
                    <Text className="text-[#01205f] font-bold text-2xl">${summary.net.toLocaleString()}</Text>
                </View>
            </View>

            {/* Monthly Comparison (Custom Column Chart) */}
            <Text className="text-lg font-bold text-gray-800 mb-4">Monthly Comparison</Text>
            <View className="bg-white rounded-[10px] p-5 mb-6 shadow-sm border border-[#e8ebf3] flex-row justify-between items-end h-48">
                {monthly.map((item, index) => {
                    const inflowHeight = (item.inflows / maxFlow) * 100;
                    const outflowHeight = (item.outflows / maxFlow) * 100;

                    return (
                        <View key={index} className="items-center flex-1">
                            <View className="flex-row items-end h-32 space-x-1">
                                <View
                                    className="w-3 bg-green-400 rounded-t-sm"
                                    style={{ height: `${Math.max(inflowHeight, 2)}%` }}
                                />
                                <View
                                    className="w-3 bg-red-400 rounded-t-sm"
                                    style={{ height: `${Math.max(outflowHeight, 2)}%` }}
                                />
                            </View>
                            <Text className="text-gray-500 text-xs mt-2">{item.month}</Text>
                        </View>
                    )
                })}
            </View>

            {/* Recent Transactions */}
            <Text className="text-lg font-bold text-gray-800 mb-3">Recent Transactions</Text>
            <View className="bg-white rounded-[10px] p-2 mb-6 border border-[#e8ebf3]">
                {transactions.map((item, index) => (
                    <View key={index} className="flex-row items-center justify-between py-4 px-2 border-b border-gray-50 last:border-0">
                        <View className="flex-row items-center">
                            <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${item.status === 'Pending' ? 'bg-yellow-50' : 'bg-green-50'}`}>
                                <Ionicons
                                    name={item.status === 'Pending' ? 'time-outline' : 'checkmark-outline'}
                                    size={20}
                                    color={item.status === 'Pending' ? '#ca8a04' : '#16a34a'}
                                />
                            </View>
                            <View>
                                <Text className="text-gray-800 font-semibold text-base mb-1">{item.type}</Text>
                                <Text className="text-gray-400 text-xs">{item.account}</Text>
                            </View>
                        </View>
                        <Text className={`font-bold text-base ${item.amount > 0 ? 'text-green-600' : 'text-gray-800'}`}>
                            {item.amount > 0 ? '+' : ''}${item.amount}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default CashFlow;
