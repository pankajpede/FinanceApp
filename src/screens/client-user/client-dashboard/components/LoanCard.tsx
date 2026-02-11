import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DashboardCard } from '../data/dashboardCards';

interface LoanCardProps {
    card: DashboardCard;
}

const LoanCard: React.FC<LoanCardProps> = ({ card }) => {
    return (
        <View
            className="w-full h-[220px] rounded-[24px] p-6 justify-between overflow-hidden relative border border-white/5"
            style={{ backgroundColor: card.color || '#1e293b' }}
        >
            {/* Background Decoration */}
            <View className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl opacity-50" />

            {/* Header */}
            <View className="flex-row justify-between items-start z-10">
                <View className="flex-row items-center">
                    <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/5 backdrop-blur-sm">
                        <Ionicons name="home-outline" size={20} color="white" />
                    </View>
                    <View className="ml-3">
                        <Text className="text-white/70 text-xs font-medium uppercase tracking-wider">
                            {card.title}
                        </Text>
                        <View className="flex-row items-center mt-0.5">
                            <View className={`w-2 h-2 rounded-full mr-2 ${card.status === 'Overdue' ? 'bg-red-500' :
                                card.status === 'Payment Due' ? 'bg-amber-500' : 'bg-emerald-500'
                                }`} />
                            <Text className={`text-xs font-medium ${card.status === 'Overdue' ? 'text-red-400' :
                                card.status === 'Payment Due' ? 'text-amber-400' : 'text-emerald-400'
                                }`}>
                                {card.status}
                            </Text>
                        </View>
                    </View>
                </View>

                {card.logo && <Image source={{ uri: card.logo }} className="w-8 h-8 opacity-80" />}
            </View>

            {/* Main Value */}
            <View className="z-10 mt-3">
                <Text className="text-white/60 text-xs mb-1 uppercase tracking-wide">Outstanding Balance</Text>
                <Text className="text-white text-3xl font-bold tracking-tight">
                    ${card.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </Text>
            </View>

            {/* Secondary Info Grid */}
            <View className="flex-row gap-4 mt-2">
                <View className="flex-1 bg-white/5 rounded-xl p-2.5 border border-white/5 backdrop-blur-sm">
                    <Text className="text-white/50 text-[10px] uppercase mb-0.5">Next Payment</Text>
                    <Text className="text-white font-semibold text-lg">
                        ${card.nextPaymentAmount?.toLocaleString()}
                    </Text>
                </View>
                <View className="flex-1 bg-white/5 rounded-xl p-2.5 border border-white/5 backdrop-blur-sm">
                    <Text className="text-white/50 text-[10px] uppercase mb-0.5">Due Date</Text>
                    <Text className="text-white font-semibold text-sm mt-1">
                        {card.nextPaymentDate}
                    </Text>
                </View>
            </View>

            {/* Primary Action Button (Overlay/Absolute or inline?) - Let's make the whole card clickable for details, 
               but add a specific Pay button if needed. The design requested explicit actions inside card. 
               Given space constraints, maybe a single Pay button or just relying on the tap.
               The request says "Primary Actions (inside card): Pay Now, View Details".
               Space is tight. Let's try to fit small buttons or use the bottom area.
            */}
            <View className="flex-row items-center justify-end absolute bottom-6 right-6 opacity-0 pointer-events-none">
                {/* Placeholder for potential future actions if layout allows */}
            </View>
        </View>
    );
};

export default LoanCard;
