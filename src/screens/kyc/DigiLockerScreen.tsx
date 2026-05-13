import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ChevronLeft, Cloud, ExternalLink, ShieldCheck } from 'lucide-react-native';
import * as NavigationService from '../../navigation/navigationRef';

type Props = NativeStackScreenProps<RootStackParamList, 'DigiLockerConnect'>;

export default function DigiLockerScreen({ navigation }: Props) {
    const handleConnect = () => {
        // Simulate DigiLocker connection
        NavigationService.navigate('SelfieCapture');
    };

    const handleSkip = () => {
        NavigationService.navigate('SelfieCapture');
    };

    const steps = [1, 2, 3, 4, 5, 6, 7];
    const currentStep = 4;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Progress Bar */}
            <View className="px-6 py-4">
                <View style={{ height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                    <View style={{ height: '100%', backgroundColor: '#01205f', width: `${(6 / 21) * 100}%` }} />
                </View>
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => NavigationService.goBack()} style={{ padding: 4 }}>
                        <ChevronLeft color="black" size={24} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '600' }}>Step <Text style={{ color: '#01205f' }}>6</Text> of 21</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">

                {/* Centered Content */}
                <View className="flex-1 justify-center pb-10">
                    <View className="items-center mb-10">
                        <View style={{ backgroundColor: '#F0FDF4', padding: 20, borderRadius: 100, marginBottom: 20 }}>
                            <Cloud size={48} color="#16A34A" strokeWidth={1.5} />
                        </View>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 8 }}>
                            DigiLocker Connect
                        </Text>
                        <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center', paddingHorizontal: 20 }}>
                            Securely fetch your verified documents from DigiLocker for faster KYC.
                        </Text>
                    </View>

                    <View style={{ backgroundColor: '#F9FAFB', padding: 24, borderRadius: 24, borderStyle: 'dashed', borderWidth: 2, borderColor: '#D1D5DB', marginBottom: 32 }}>
                        <View className="flex-row items-center mb-4">
                            <ShieldCheck size={20} color="#16A34A" className="mr-2" />
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>100% Government Verified</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#6B7280', lineHeight: 20 }}>
                            DigiLocker is a secure cloud-based platform for storage, sharing and verification of documents & certificates.
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={handleConnect}
                        activeOpacity={0.8}
                        style={{
                            backgroundColor: '#01205f',
                            borderRadius: 16,
                            height: 64,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 16
                        }}
                    >
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 8 }}>
                            Connect DigiLocker
                        </Text>
                        <ExternalLink size={20} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleSkip}
                        activeOpacity={0.7}
                        style={{
                            height: 64,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ color: '#6B7280', fontSize: 16, fontWeight: '600' }}>
                            Skip for now
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Trust Footer */}
                <View className="pb-8 items-center">
                    <Text style={{ color: '#9CA3AF', fontSize: 12 }}>Powered by National E-Governance Division</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
