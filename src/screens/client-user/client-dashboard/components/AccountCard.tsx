import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types';
import { DashboardCard } from '../data/dashboardCards';

interface AccountCardProps {
    card: DashboardCard;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AccountCard: React.FC<AccountCardProps> = ({ card }) => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View
            className="w-full h-[220px] rounded-[24px] p-5 justify-between overflow-hidden relative"
            style={{ backgroundColor: card.color || '#2B3674' }}
        >
            {/* Background Decoration */}
            <View className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <View className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

            {/* Header */}
            <View className="flex-row justify-between items-start z-10">
                <View className="flex-row items-center">
                    {card.logo ? (
                        <Image source={{ uri: card.logo }} className="w-8 h-8 rounded-full bg-white" />
                    ) : (
                        <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/10">
                            <Ionicons name="wallet" size={20} color="white" />
                        </View>
                    )}
                    <View className="ml-3">
                        <Text className="text-white/80 text-xs font-medium uppercase tracking-wider">
                            {card.accountType}
                        </Text>
                        <Text className="text-white font-semibold text-base">
                            {card.title}
                        </Text>
                    </View>
                </View>
                <View className="flex-row items-center bg-white/10 px-3 py-1.5 rounded-full border border-white/5">
                    {card.currency === 'GBP' ? (
                        <Text className="text-white text-xs mr-1">🇬🇧</Text>
                    ) : (
                        <Text className="text-white text-xs mr-1">🇺🇸</Text>
                    )}
                    <Text className="text-white font-bold text-xs">{card.currency}</Text>
                </View>
            </View>

            {/* Balance */}
            <View className="z-10 mt-2">
                <Text className="text-white/70 text-sm mb-1">Available Balance</Text>
                <Text className="text-white text-4xl font-bold tracking-tight">
                    {card.currency === 'GBP' ? '£' : '$'}
                    {card.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
            </View>

            {/* Actions */}
            <View className="flex-row gap-1 z-10 mt-2">
                <TouchableOpacity
                    className="flex-1 bg-white rounded-full py-3.5 items-center justify-center flex-row shadow-sm"
                    activeOpacity={0.8}
                    onPress={() => {
                        console.log('Navigating to SendMoney');
                        navigation.navigate('SendMoney');
                    }}
                >
                    <Text className="text-[#0f172a] font-medium text-md">Send Money</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-1 bg-white/15 border border-white/20 rounded-full py-3.5 items-center justify-center flex-row backdrop-blur-md"
                    activeOpacity={0.7}
                >
                    <Text className="text-white font-medium text-md">Add Money</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AccountCard;
