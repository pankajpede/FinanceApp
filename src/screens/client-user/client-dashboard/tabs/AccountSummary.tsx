import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dashboardData from '../../../../data/client-dashboard.json';

// Import Data Sources for Consistency
import accountsData from '../../../../data/accountsData.json';
import spendingData from '../../../../data/spendingData.json';
import incomeData from '../../../../data/incomeData.json';

const AccountSummary = () => {
    const { statusTracker, actionRequired } = dashboardData.accountSummary;

    // Calculate Totals Dynamically
    const totalBalance = useMemo(() => accountsData.accounts.reduce((sum, item) => sum + item.balance, 0), []);
    const totalExpenses = useMemo(() => spendingData.breakdown.reduce((sum, item) => sum + item.amount, 0), []);
    // Mocking Monthly Income calculation (sum of all income sources for simplicity)
    const monthlyIncome = useMemo(() => incomeData.income.reduce((sum, item) => sum + item.amount, 0), []);

    const StatusBadge = ({ status, color }: { status: string, color: string }) => {
        let bg = 'bg-gray-100';
        let text = 'text-gray-600';

        switch (color) {
            case 'warning':
                bg = 'bg-yellow-100';
                text = 'text-yellow-700';
                break;
            case 'success':
                bg = 'bg-green-100';
                text = 'text-green-700';
                break;
            case 'info':
                bg = 'bg-blue-100';
                text = 'text-blue-700';
                break;
        }

        return (
            <View className={`${bg} px-3 py-1 rounded-full`}>
                <Text className={`${text} text-xs font-semibold`}>{status}</Text>
            </View>
        )
    };

    return (
        <View className="flex-1 px-4 py-4">
            {/* Action Required Widget */}
            {actionRequired.show && (
                <View className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6 flex-row items-center justify-between shadow-sm">
                    <View className="flex-1 mr-4">
                        <View className="flex-row items-center mb-1">
                            <Ionicons name="alert-circle" size={18} color="#dc2626" className="mr-2" />
                            <Text className="text-red-800 font-bold text-base">{actionRequired.title}</Text>
                        </View>
                        <Text className="text-red-600 text-sm">{actionRequired.description}</Text>
                    </View>
                    <TouchableOpacity className="bg-red-600 px-4 py-2 rounded-lg">
                        <Text className="text-white font-semibold text-xs">{actionRequired.cta}</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Portfolio Snapshot */}
            <Text className="text-lg font-bold text-gray-800 mb-3">Portfolio Snapshot</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 -mx-4 px-4">
                <View className="bg-white p-4 rounded-[10px] mr-4 w-40 shadow-sm border border-[#e8ebf3]">
                    <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center mb-3">
                        <Ionicons name="wallet-outline" size={20} color="#01205f" />
                    </View>
                    <Text className="text-gray-500 text-xs mb-1">Total Balance</Text>
                    <Text className="text-lg font-bold text-[#01205f]">${totalBalance.toLocaleString()}</Text>
                </View>

                {/* Card 2 */}
                <View className="bg-white p-4 rounded-[10px] mr-4 w-40 shadow-sm border border-[#e8ebf3]">
                    <View className="w-10 h-10 bg-green-50 rounded-full items-center justify-center mb-3">
                        <Ionicons name="trending-up" size={20} color="#16a34a" />
                    </View>
                    <Text className="text-gray-500 text-xs mb-1">Monthly Income</Text>
                    <Text className="text-lg font-bold text-[#01205f]">${monthlyIncome.toLocaleString()}</Text>
                </View>

                {/* Card 3 */}
                <View className="bg-white p-4 rounded-[10px] mr-4 w-40 shadow-sm border border-[#e8ebf3]">
                    <View className="w-10 h-10 bg-orange-50 rounded-full items-center justify-center mb-3">
                        <Ionicons name="pie-chart-outline" size={20} color="#f97316" />
                    </View>
                    <Text className="text-gray-500 text-xs mb-1">Total Expenses</Text>
                    <Text className="text-lg font-bold text-[#01205f]">${totalExpenses.toLocaleString()}</Text>
                </View>
            </ScrollView>

            {/* Account Status Tracker */}
            <Text className="text-lg font-bold text-gray-800 mb-3">Account Status Tracker</Text>
            <View className="bg-white rounded-[10px] p-2 mb-6 border border-[#e8ebf3]">
                {statusTracker.map((item, index) => (
                    <View key={index} className="flex-row items-center justify-between py-4 px-2 border-b border-gray-50 last:border-0">
                        <View>
                            <Text className="text-gray-800 font-semibold text-base mb-1">{item.client}</Text>
                            <Text className="text-gray-400 text-xs">{item.type}</Text>
                        </View>
                        <StatusBadge status={item.status} color={item.statusColor} />
                    </View>
                ))}
            </View>
        </View>
    );
};

export default AccountSummary;
