import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BalanceCardProps {
    balance: number;
    currency: string;
}

const BalanceCard = ({ balance, currency }: BalanceCardProps) => {
    return (
        <View className="items-center mt-4 mb-8">
            <View className="flex-row items-center mb-2">
                <Text className="text-white text-base mr-1">🇺🇸 {currency}</Text>
                <Ionicons name="chevron-down" size={16} color="white" />
            </View>

            <Text className="text-white text-5xl font-bold mb-2">
                ${balance.toLocaleString()}
            </Text>

            <Text className="text-blue-200 text-sm mb-6">
                Available Balance
            </Text>

            <TouchableOpacity
                className="flex-row items-center bg-transparent border border-white/30 rounded-full px-6 py-2.5"
                onPress={() => console.log('Add Money')}
            >
                <Ionicons name="wallet-outline" size={20} color="white" className="mr-2" />
                <Text className="text-white font-medium ml-2">Add Money</Text>
            </TouchableOpacity>

            {/* Background decoration circles similar to design */}
            <View className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl" />
            <View className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        </View>
    );
};

export default BalanceCard;
