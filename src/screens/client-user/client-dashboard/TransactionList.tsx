import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Transaction {
    id: string;
    title: string;
    amount: number;
    type: string;
    icon: string;
}

const TransactionItem = ({ item }: { item: Transaction }) => {
    // Defines icon styling based on transaction type/title for variety
    const getIconStyle = (title: string) => {
        switch (title) {
            case 'Spending': return { bg: 'bg-indigo-100', color: '#4f46e5', icon: 'card-outline' };
            case 'Income': return { bg: 'bg-green-100', color: '#16a34a', icon: 'cash-outline' };
            case 'Bills': return { bg: 'bg-orange-100', color: '#ea580c', icon: 'receipt-outline' };
            case 'Savings': return { bg: 'bg-yellow-100', color: '#ca8a04', icon: 'wallet-outline' };
            default: return { bg: 'bg-gray-100', color: '#6b7280', icon: 'list-outline' };
        }
    };

    const style = getIconStyle(item.title);
    const amountColor = item.amount > 0 ? 'text-green-600' : 'text-red-500';
    const formattedAmount = item.amount > 0 ? `+$${item.amount}` : `-$${Math.abs(item.amount)}`;

    return (
        <TouchableOpacity className="flex-row items-center justify-between py-4 px-6 border-b border-gray-50 last:border-0">
            <View className="flex-row items-center">
                <View className={`w-12 h-12 rounded-full items-center justify-center ${style.bg} mr-4`}>
                    <Ionicons name={style.icon as any} size={24} color={style.color} />
                </View>
                <Text className="text-gray-800 font-semibold text-base">{item.title}</Text>
            </View>
            <View className="flex-row items-center">
                <Text className={`font-bold text-base mr-2 ${amountColor}`}>
                    {formattedAmount}
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
            </View>
        </TouchableOpacity>
    );
};

const TransactionList = ({ data }: { data: Transaction[] }) => {
    return (
        <View className="flex-1 px-6 mt-6">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold text-gray-800">Transaction</Text>
                <TouchableOpacity>
                    <Ionicons name="arrow-forward" size={24} color="#374151" />
                </TouchableOpacity>
            </View>
            <View className="bg-white rounded-[10px] p-2 mb-24 border border-[#e8ebf3]">
                {data.map(item => (
                    <TransactionItem key={item.id} item={item} />
                ))}
            </View>
        </View>
    );
};

export default TransactionList;
