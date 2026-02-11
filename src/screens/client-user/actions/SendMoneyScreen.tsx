import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Image, ActivityIndicator } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { recentTransactions, Transaction } from './data/recentTransactions';
import { favoriteUsers } from './data/favoriteUsers';
import ScreenWrapper from '../../client-user/components/ScreenWrapper';

import { useNavigation } from '@react-navigation/native';

export default function SendMoneyScreen() {
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState<'bank' | 'upi'>('bank');
    const [displayedTransactions, setDisplayedTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(10);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadMoreTransactions();
    }, []);

    const loadMoreTransactions = () => {
        if (loading || !hasMore) return;

        setLoading(true);
        // Simulate network delay
        setTimeout(() => {
            const nextLimit = limit + 10;
            const newTransactions = recentTransactions.slice(0, nextLimit);

            setDisplayedTransactions(newTransactions);
            setLimit(nextLimit);

            if (newTransactions.length >= recentTransactions.length || newTransactions.length >= 30) {
                setHasMore(false);
            }
            setLoading(false);
        }, 1000);
    };

    const renderHeader = () => (
        <View className="-mt-1">
            <View className="bg-gray-50 pb-8 px-1 pt-6">
                {/* Search Bar */}
                <View className="px-2 mt-0 mb-6">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('SelectPayee')}
                        className="flex-row items-center bg-white rounded-full px-4 py-0 shadow-sm border border-gray-300"
                    >
                        <Ionicons name="search" size={20} color="#999" />
                        <TextInput
                            placeholder="Search by payee bank name"
                            className="flex-1 ml-2 text-lg text-gray-800"
                            placeholderTextColor="#999"
                            editable={false} // Disable typing here, handle on SelectPayeeScreen
                            onPressIn={() => navigation.navigate('SelectPayee')}
                        />
                    </TouchableOpacity>
                </View>

                {/* Send Money To Section */}
                <View className="px-4 mb-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-gray-900 font-bold text-lg">Favorites</Text>
                        <TouchableOpacity>
                            {/* <Text className="text-blue-600 font-medium">See all</Text> */}
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center">
                        {/* Scrollable User List */}
                        <FlatList
                            data={favoriteUsers}
                            horizontal
                            className="flex-1"
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ paddingRight: 20 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity className="items-center mr-4 relative">
                                    <View className="relative">
                                        <Image
                                            source={item.image}
                                            className="w-14 h-14 rounded-full"
                                            style={{ borderWidth: 1, borderColor: '#f3f4f6' }}
                                        />
                                        {/* Country Flag Badge */}
                                        {item.flag && (
                                            <View className="absolute -right-1 -top-1 bg-white rounded-full w-5 h-5 items-center justify-center shadow-sm">
                                                <Text className="text-[10px]">{item.flag}</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text className="text-gray-700 text-xs mt-2 font-medium">{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        {/* Fixed Add Button */}
                        <TouchableOpacity className="items-center mr-4">
                            <View className="w-14 h-14 rounded-full bg-blue-50 items-center justify-center border border-blue-100 border-dashed">
                                <Ionicons name="add" size={28} color="#01205f" />
                            </View>
                            <Text className="text-gray-700 text-xs mt-2 font-medium">Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Action Grid */}
                <View className="flex-row justify-center px-8 gap-5">
                    <TouchableOpacity className="items-center">
                        <View className="w-14 h-14 rounded-2xl bg-blue-50 items-center justify-center mb-2 shadow-sm border border-blue-100">
                            <Feather name="user-plus" size={24} color="#01205f" />
                        </View>
                        <Text className="text-gray-600 text-md text-center w-28">Add/Manage Payees</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="items-center">
                        <View className="w-14 h-14 rounded-2xl bg-blue-50 items-center justify-center mb-2 shadow-sm border border-blue-100">
                            <Feather name="calendar" size={24} color="#01205f" />
                        </View>
                        <Text className="text-gray-600 text-md text-center w-28">Scheduled Payments</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="items-center">
                        <View className="w-14 h-14 rounded-2xl bg-blue-50 items-center justify-center mb-2 shadow-sm border border-blue-100">
                            <Feather name="globe" size={24} color="#01205f" />
                        </View>
                        <Text className="text-gray-600 text-md text-center w-28">Money To World</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="bg-white rounded-t-[30px] border-t border-gray-100 pt-6 px-5 -mt-6">
                <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />

                <View className="flex-row items-center mb-6">
                    <Ionicons name="time-outline" size={20} color="#01205f" />
                    <Text className="text-gray-800 font-bold ml-2 text-lg">Recents</Text>
                </View>
            </View>
        </View>
    );

    const renderTransactionItem = ({ item }: { item: Transaction }) => (
        <View className="bg-white px-5">
            <View className="flex-row justify-between items-center mb-0 border-b border-gray-50 pb-4">
                <View className="flex-row items-center flex-1">
                    <View className="w-10 h-10 rounded-xl bg-white items-center justify-center mr-3 border border-gray-100 overflow-hidden">
                        {item.bankLogo ? (
                            <Image
                                source={item.bankLogo}
                                className="w-full h-full"
                                resizeMode="contain"
                            />
                        ) : (
                            <Ionicons name="business" size={20} color="#4b5563" />
                        )}
                    </View>
                    <View className="flex-1 pr-2">
                        <Text className="font-bold text-gray-800 text-sm" numberOfLines={1}>{item.payeeName}</Text>
                        <Text className="text-xs text-gray-500 mt-1 uppercase">{item.bankName}</Text>
                        <Text className="text-xs text-gray-400 mt-0.5">Acc: {item.accountNumberLast4}</Text>
                    </View>
                </View>

                <View className="items-center flex flex-row gap-4">
                    <View className="items-end flex flex-col">
                        <Text className="font-bold text-gray-800 text-base">{item.currency} {item.amount.toLocaleString('en-IN')}</Text>
                        <Text className="text-xs text-gray-400 mb-2">{item.date}</Text>
                    </View>
                    <TouchableOpacity className="bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                        <Text className="text-[#01205f] text-xs font-bold">Pay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderFooter = () => (
        <View className="py-6 bg-white items-center">
            {loading ? (
                <ActivityIndicator size="small" color="#01205f" />
            ) : !hasMore ? (
                <Text className="text-gray-400 text-sm">No more records</Text>
            ) : null}
        </View>
    );

    return (
        <ScreenWrapper
            title="Send Money"
            showBackButton={true}
            scrollEnabled={false}
            headerRight={
                <View className="flex-row gap-4">
                    <TouchableOpacity>
                        <Ionicons name="help-circle-outline" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-vertical" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            }
            headerBottom={
                <View className="flex-row bg-[#01205f]">
                    <TouchableOpacity
                        onPress={() => setActiveTab('bank')}
                        className={`flex-1 items-center pb-2 border-b-[3px] ${activeTab === 'bank' ? 'border-transparent' : 'border-transparent'}`}
                    >
                        <Text className={`font-medium text-lg ${activeTab === 'bank' ? 'text-white' : 'text-white/60'}`}>Bank transfers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setActiveTab('upi')}
                        className={`flex-1 flex-row justify-center items-center gap-2 pb-2 border-b-[3px] ${activeTab === 'upi' ? 'border-transparent' : 'border-transparent'}`}
                    >
                        {/* <View className="w-2 h-2 rounded-full bg-yellow-400 rotate-45" /> */}
                        <Text className={`font-medium text-lg ${activeTab === 'upi' ? 'text-white' : 'text-white/60'}`}>UPI payments</Text>
                    </TouchableOpacity>
                </View>
            }
        >
            <FlatList
                data={displayedTransactions}
                renderItem={renderTransactionItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                onEndReached={loadMoreTransactions}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}
                className="bg-white"
            />
        </ScreenWrapper>
    );
}
