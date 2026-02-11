import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, G } from 'react-native-svg';

// Data Imports
import accountsData from '../../../data/accountsData.json';
import loansData from '../../../data/loansData.json';
import creditData from '../../../data/creditData.json';
import spendingData from '../../../data/spendingData.json';
import insightsData from '../../../data/insightsData.json';

import ScreenWrapper from '../components/ScreenWrapper';
import { useScreenLoading } from '../../../hooks/useScreenLoading';
import InsightsSkeleton from '../../../components/skeletons/InsightsSkeleton';

const InsightsScreen = () => {
    const isLoading = useScreenLoading();



    // 1. Compute Financials
    const { totalAssets, totalLiabilities, netWorth, totalSavings, savingsGrowth, monthlyAverage, projectedSavings } = useMemo(() => {
        const assets = accountsData.accounts.reduce((sum, item) => sum + item.balance, 0);
        const loans = loansData.loans.reduce((sum, item) => sum + item.balance, 0);
        const credit = creditData.creditCards.reduce((sum, item) => sum + item.used, 0);
        const liabilities = loans + credit;

        // Savings specific
        const savingsAccounts = accountsData.accounts.filter(a => a.type === 'savings' || a.type === 'investment');
        const savingsTotal = savingsAccounts.reduce((sum, item) => sum + item.balance, 0);

        return {
            totalAssets: assets,
            totalLiabilities: liabilities,
            netWorth: assets - liabilities,
            totalSavings: savingsTotal,
            // Mock growth data logic (normally would compare with historical data)
            savingsGrowth: insightsData.insights.summary.savingsGrowth,
            monthlyAverage: insightsData.insights.summary.monthlyAverage,
            projectedSavings: insightsData.insights.summary.projectedSavings
        };
    }, []);

    // 2. Spending Data for Donut Chart
    const spendingTotal = useMemo(() => spendingData.breakdown.reduce((sum, item) => sum + item.amount, 0), []);

    // 3. Credit Utilization
    const creditStats = useMemo(() => {
        const totalLimit = creditData.creditCards.reduce((sum, item) => sum + item.limit, 0);
        const totalUsed = creditData.creditCards.reduce((sum, item) => sum + item.used, 0);
        const utilization = totalLimit > 0 ? (totalUsed / totalLimit) * 100 : 0;
        return { totalLimit, totalUsed, utilization };
    }, []);

    // Helper for donut chart segments
    const renderDonutChart = () => {
        const radius = 60;
        const circumference = 2 * Math.PI * radius;
        let startAngle = -90;

        return (
            <View className="items-center justify-center h-[160px]">
                <Svg width="160" height="160" viewBox="0 0 160 160">
                    <G rotation="0" origin="80, 80">
                        {spendingData.breakdown.map((item, index) => {
                            const percentage = item.amount / spendingTotal;
                            const strokeDasharray = `${circumference * percentage} ${circumference}`;
                            const rotate = startAngle;
                            startAngle += percentage * 360;

                            return (
                                <Circle
                                    key={index}
                                    cx="80"
                                    cy="80"
                                    r={radius}
                                    stroke={item.color}
                                    strokeWidth="20"
                                    fill="transparent"
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={0}
                                    rotation={rotate}
                                    origin="80, 80"
                                    strokeLinecap="round"
                                />
                            );
                        })}
                        {/* Center Text */}
                        <View className="absolute inset-0 items-center justify-center">
                            <Text className="text-gray-400 text-xs font-medium">Total</Text>
                            <Text className="text-[#01205f] text-xl font-bold">${spendingTotal}</Text>
                        </View>
                    </G>
                </Svg>

            </View>
        );
    };

    if (isLoading) {
        return <InsightsSkeleton />;
    }

    return (
        <ScreenWrapper title="Insights" showBackButton={false}>
            <View className="px-6 pt-6 pb-24">

                {/* 1. Net Worth Overview */}
                <View className="bg-white p-6 rounded-[10px] shadow-sm mb-6 border border-[#e8ebf3]">
                    <Text className="text-gray-500 text-sm mb-1">Net Worth</Text>
                    <View className="flex-row items-end mb-4">
                        <Text className="text-4xl font-bold text-[#01205f] mr-2">
                            ${netWorth.toLocaleString()}
                        </Text>
                        <View className="bg-green-50 px-2 py-1 rounded-full mb-2">
                            <Text className="text-green-600 text-xs font-bold">+4.2%</Text>
                        </View>
                    </View>

                    {/* Assets vs Liabilities Bar */}
                    <View className="mb-2">
                        <View className="flex-row justify-between mb-1">
                            <Text className="text-xs text-gray-500">Assets</Text>
                            <Text className="text-xs text-gray-500">Liabilities</Text>
                        </View>
                        <View className="h-3 flex-row rounded-full overflow-hidden bg-gray-100">
                            <View
                                style={{ flex: totalAssets / (totalAssets + totalLiabilities) }}
                                className="bg-[#16a34a]"
                            />
                            <View
                                style={{ flex: totalLiabilities / (totalAssets + totalLiabilities) }}
                                className="bg-[#ef4444]"
                            />
                        </View>
                        <View className="flex-row justify-between mt-1">
                            <Text className="text-xs font-semibold text-gray-700">${totalAssets.toLocaleString()}</Text>
                            <Text className="text-xs font-semibold text-gray-700">${totalLiabilities.toLocaleString()}</Text>
                        </View>
                    </View>
                </View>

                {/* 2. Spending Breakdown */}
                <Text className="text-lg font-bold text-[#01205f] mb-4">Spending Breakdown</Text>
                <View className="bg-white p-6 rounded-[10px] shadow-sm mb-6 flex-row items-center border border-[#e8ebf3]">
                    <View className="relative w-[160px] h-[160px] items-center justify-center">
                        {renderDonutChart()}
                        <View className="absolute pointer-events-none items-center justify-center">
                            <Text className="text-gray-400 text-[10px] font-medium">Total</Text>
                            <Text className="text-[#01205f] text-lg font-bold">${spendingTotal}</Text>
                        </View>
                    </View>

                    <View className="flex-1 ml-6">
                        {spendingData.breakdown.map((item, index) => (
                            <View key={index} className="flex-row items-center mb-3 last:mb-0">
                                <View className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                                <View className="flex-1">
                                    <Text className="text-gray-600 text-xs">{item.category}</Text>
                                    <Text className="text-gray-900 font-semibold text-sm">${item.amount}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* 3. Savings Overview */}
                <Text className="text-lg font-bold text-[#01205f] mb-4">Savings Health</Text>
                <View className="flex-row justify-between mb-6">
                    <View className="bg-white p-5 rounded-[10px] shadow-sm flex-1 mr-3 border border-[#e8ebf3]">
                        <Text className="text-gray-500 text-xs mb-1">Total Savings</Text>
                        <Text className="text-xl font-bold text-[#01205f]">${totalSavings.toLocaleString()}</Text>
                        <Text className="text-green-600 text-[10px] mt-1">+{savingsGrowth}% vs last mo</Text>
                    </View>
                    <View className="bg-white p-5 rounded-[10px] shadow-sm flex-1 ml-3 border border-[#e8ebf3]">
                        <Text className="text-gray-500 text-xs mb-1">Projected (Yr)</Text>
                        <Text className="text-xl font-bold text-[#01205f]">${projectedSavings.toLocaleString()}</Text>
                        <Text className="text-gray-400 text-[10px] mt-1">Based on avg</Text>
                    </View>
                </View>

                {/* 4. Credit Utilization */}
                {creditData.creditCards.length > 0 && (
                    <View className="mb-6">
                        <Text className="text-lg font-bold text-[#01205f] mb-4">Credit Utilization</Text>
                        <View className="bg-white p-6 rounded-[10px] shadow-sm border border-[#e8ebf3]">
                            <View className="flex-row justify-between items-end mb-3">
                                <View>
                                    <Text className="text-gray-500 text-xs">Total Used</Text>
                                    <Text className="text-2xl font-bold text-gray-800">${creditStats.totalUsed.toLocaleString()}</Text>
                                </View>
                                <Text className={`text-lg font-bold ${creditStats.utilization < 30 ? 'text-green-600' : creditStats.utilization < 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                    {creditStats.utilization.toFixed(1)}%
                                </Text>
                            </View>
                            <View className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <View
                                    className={`h-full rounded-full ${creditStats.utilization < 30 ? 'bg-green-500' : creditStats.utilization < 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    style={{ width: `${Math.min(creditStats.utilization, 100)}%` }}
                                />
                            </View>
                            <Text className="text-gray-400 text-xs mt-2 text-right">Limit: ${creditStats.totalLimit.toLocaleString()}</Text>
                        </View>
                    </View>
                )}

                {/* 5. Loan Overview */}
                {loansData.loans.length > 0 && (
                    <View className="mb-6">
                        <Text className="text-lg font-bold text-[#01205f] mb-4">Active Loans</Text>
                        {loansData.loans.map(loan => {
                            const progress = (loan.paidAmount / loan.totalAmount) * 100;
                            return (
                                <View key={loan.id} className="bg-white p-5 rounded-[10px] shadow-sm mb-3 border border-[#e8ebf3]">
                                    <View className="flex-row justify-between mb-2">
                                        <Text className="font-bold text-gray-800">{loan.type}</Text>
                                        <Text className="text-gray-500 text-xs">EMI: ${loan.emi}/mo</Text>
                                    </View>
                                    <View className="flex-row justify-between items-end mb-2">
                                        <Text className="text-2xl font-bold text-[#01205f]">${loan.balance.toLocaleString()}</Text>
                                        <Text className="text-xs text-gray-500">of ${loan.totalAmount.toLocaleString()}</Text>
                                    </View>
                                    <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <View className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
                                    </View>
                                    <Text className="text-gray-400 text-[10px] mt-1 text-right">{progress.toFixed(0)}% Paid</Text>
                                </View>
                            );
                        })}
                    </View>
                )}

                {/* 6. Smart Insights */}
                <View className="bg-blue-50 p-5 rounded-[10px] border border-blue-100 mb-6">
                    <View className="flex-row items-center mb-2">
                        <Ionicons name="bulb" size={20} color="#2563eb" />
                        <Text className="text-blue-800 font-bold ml-2">Smart Insight</Text>
                    </View>
                    <Text className="text-blue-900 text-sm leading-5">
                        Your savings rate increased by {savingsGrowth}% this month! At this pace, you're on track to hit your $50k goal by November.
                    </Text>
                </View>

                {/* 7. Alerts (Existing) */}
                <Text className="text-lg font-bold text-[#01205f] mb-4">Alerts</Text>
                {insightsData.insights.alerts.map((alert) => (
                    <View key={alert.id} className={`p-4 rounded-2xl mb-4 border ${alert.type === 'warning' ? 'bg-yellow-50 border-yellow-100' : 'bg-blue-50 border-blue-100'}`}>
                        <View className="flex-row items-start">
                            <Ionicons
                                name={alert.type === 'warning' ? 'alert-circle' : 'information-circle'}
                                size={20}
                                color={alert.type === 'warning' ? '#ca8a04' : '#2563eb'}
                                className="mt-0.5"
                            />
                            <View className="flex-1 ml-3">
                                <Text className={`font-semibold ${alert.type === 'warning' ? 'text-yellow-800' : 'text-blue-800'}`}>
                                    {alert.message}
                                </Text>
                                <Text className={`text-xs mt-1 ${alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'}`}>
                                    {alert.date}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}

            </View>
        </ScreenWrapper>
    );
};

export default InsightsScreen;
