import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ChevronLeft, Camera, MapPin, MessageSquare, ShieldCheck, Check } from 'lucide-react-native';
import * as NavigationService from '../../navigation/navigationRef';

type Props = NativeStackScreenProps<RootStackParamList, 'ConsentPermissions'>;

export default function ConsentPermissionsScreen({ navigation }: Props) {
    const [agreed, setAgreed] = useState(false);

    const permissions = [
        {
            id: 'camera',
            title: 'Camera Access',
            description: 'Required for capturing selfie and documents during KYC.',
            icon: <Camera size={24} color="#01205f" />
        },
        {
            id: 'location',
            title: 'Location Access',
            description: 'To ensure service availability in your region as per regulations.',
            icon: <MapPin size={24} color="#01205f" />
        },
        {
            id: 'sms',
            title: 'SMS Access',
            description: 'To automatically detect and verify OTP for a seamless experience.',
            icon: <MessageSquare size={24} color="#01205f" />
        }
    ];

    const handleContinue = () => {
        if (agreed) {
            NavigationService.navigate('PANVerification');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
                {/* Progress Bar */}
                <View style={{ marginTop: 12, marginBottom: 16 }}>
                    <View style={{ height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                        <View style={{ height: '100%', backgroundColor: '#01205f', width: `${(3 / 21) * 100}%` }} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => NavigationService.goBack()} style={{ padding: 4 }}>
                            <ChevronLeft color="#01205f" size={24} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '600' }}>Step <Text style={{ color: '#01205f' }}>3</Text> of 21</Text>
                    </View>
                </View>

                {/* Content */}
                <View className="flex-1 justify-center pb-10">
                    <View className="items-center mb-10">
                        <View style={{ width: 96, height: 96, backgroundColor: 'rgba(1, 32, 95, 0.05)', borderRadius: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                            <ShieldCheck size={48} color="#01205f" />
                        </View>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 8 }}>
                            Trust & Security
                        </Text>
                        <Text style={{ fontSize: 18, color: '#6B7280', textAlign: 'center', paddingHorizontal: 16 }}>
                            We need certain permissions for a secure experience.
                        </Text>
                    </View>

                    <View className="gap-4 mb-10">
                        {permissions.map((item) => (
                            <View key={item.id} className="flex-row items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-4">
                                <View style={{ marginRight: 16, backgroundColor: 'rgba(1, 32, 95, 0.05)', padding: 12, borderRadius: 16 }}>
                                    {item.icon}
                                </View>
                                <View className="flex-1">
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 2 }}>{item.title}</Text>
                                    <Text style={{ fontSize: 14, color: '#6B7280' }}>{item.description}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View className="mb-6 px-1">
                        <View className="flex-row items-start mb-6">
                            <TouchableOpacity
                                onPress={() => setAgreed(!agreed)}
                                activeOpacity={0.7}
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: 6,
                                    borderWidth: 2,
                                    borderColor: agreed ? '#01205f' : '#D1D5DB',
                                    backgroundColor: agreed ? '#01205f' : 'transparent',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 2
                                }}
                            >
                                {agreed && <Check size={16} color="white" strokeWidth={3} />}
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setAgreed(!agreed)}
                                activeOpacity={1}
                                className="flex-1 ml-3"
                            >
                                <Text style={{ fontSize: 14, color: '#6B7280', lineHeight: 20 }}>
                                    I agree to the <Text style={{ color: '#01205f', fontWeight: '500' }}>Terms of Service</Text> and authorize Onella to process my data for KYC.
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={handleContinue}
                            disabled={!agreed}
                            activeOpacity={0.8}
                            style={{
                                backgroundColor: agreed ? '#01205f' : '#E5E7EB',
                                borderRadius: 16,
                                height: 64,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: agreed ? 'white' : '#9CA3AF', fontSize: 18, fontWeight: 'bold' }}>
                                Agree & Continue
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
