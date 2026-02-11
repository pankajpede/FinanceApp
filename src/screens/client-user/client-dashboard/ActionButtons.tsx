import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ActionButton = ({ icon, label, color, bgColor, className, onPress }: { icon: any, label: string, color: string, bgColor: string, className?: string, onPress?: () => void }) => (
    <TouchableOpacity className="items-center justify-center flex-1" onPress={onPress}>
        <View className={`w-12 h-12 rounded-full items-center justify-center mb-2 ${bgColor}`}>
            <Ionicons name={icon} size={28} color={color} />
        </View>
        <Text className={`text-gray-700 font-medium text-sm ${className}`}>{label}</Text>
    </TouchableOpacity>
);

const ActionButtons = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View className="flex-row bg-white rounded-[10px] p-6 mx-4 shadow-lg shadow-black/5 justify-between border border-[#e8ebf3]">
            <ActionButton
                icon="arrow-up-circle"
                label="Send"
                color="#4f46e5"
                bgColor="bg-indigo-50"
                onPress={() => navigation.navigate('SendMoney')}
            />
            <View className="w-[1px] h-10 bg-gray-100 self-center" />
            <ActionButton
                icon="arrow-down-circle"
                label="Request"
                color="#f59e0b"
                bgColor="bg-amber-50"
            />
            <View className="w-[1px] h-10 bg-gray-100 self-center" />
            <ActionButton
                icon="business"
                label="Bank"
                color="#d97706"
                bgColor="bg-orange-50"
            />
        </View>
    );
};

export default ActionButtons;
