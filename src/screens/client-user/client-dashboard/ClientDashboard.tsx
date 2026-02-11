import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useScreenLoading } from '../../../hooks/useScreenLoading';
import DashboardSkeleton from '../../../components/skeletons/DashboardSkeleton';

import DashboardCarousel from './components/DashboardCarousel';
import TransactionList from './TransactionList';
import TabNavigation from './TabNavigation';
import AccountSummary from './tabs/AccountSummary';
import HYSAOverview from './tabs/HYSAOverview';
import CashFlow from './tabs/CashFlow';
import dashboardData from '../../../data/client-dashboard.json';

import accountsData from '../../../data/accountsData.json';

const ClientDashboard = () => {
    const navigation = useNavigation();
    const isLoading = useScreenLoading();
    const [activeTab, setActiveTab] = useState('Account Summary');

    const totalBalance = accountsData.accounts.reduce((sum, account) => sum + account.balance, 0);



    const renderTabContent = () => {
        switch (activeTab) {
            case 'Account Summary':
                return <AccountSummary />;
            case 'HYSA Overview':
                return <HYSAOverview />;
            case 'Cash Flow':
                return <CashFlow />;
            case 'Transaction':
                // Using existing TransactionList for now, as requested "Transaction(Current)"
                // We wrap it to match the padding style of other tabs if needed, 
                // but TransactionList already has padding.
                return <TransactionList data={dashboardData.transactions} />;
            default:
                return <AccountSummary />;
        }
    };

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="light" />
            <ScrollView
                className="flex-1 bg-[#F7F7F7]"
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[2]} // Index of TabNavigation in ScrollView children
            >
                <View className="bg-[#01205f] pt-[60px] pb-24 rounded-b-[36px] z-0 relative overflow-visible">
                    <View className="flex-row justify-between items-center px-6">

                        <View className="flex-1 mr-4 bg-white/20 rounded-full flex-row items-center px-4 py-2">
                            <Ionicons name="search" size={20} color="white" />
                            <TextInput
                                placeholder="Search &quot;Payments&quot;"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                className="flex-1 ml-2 text-white"
                            />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Notifications' as never)}>
                            <Ionicons name="notifications-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Carousel overlaps the header boundary */}
                <View className="-mt-20">
                    <DashboardCarousel />
                </View>

                {/* 1: Spacing replacement for removed interactions */}
                <View className="mt-2" />

                {/* 2: Tabs (Sticky) */}
                <View>
                    <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
                </View>

                {/* 3: Tab Content */}
                <View className="pb-24">
                    {renderTabContent()}
                </View>
            </ScrollView>
        </View>
    );
};

export default ClientDashboard;
