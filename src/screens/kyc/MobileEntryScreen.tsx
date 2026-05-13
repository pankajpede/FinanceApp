import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ChevronLeft } from 'lucide-react-native';
import * as NavigationService from '../../navigation/navigationRef';

type Props = NativeStackScreenProps<RootStackParamList, 'MobileEntry'>;

export default function MobileEntryScreen({ navigation }: Props) {
    const [mobileNumber, setMobileNumber] = useState('');

    const isValid = mobileNumber.length === 10 && /^\d+$/.test(mobileNumber);

    const handleContinue = () => {
        if (isValid) {
            NavigationService.navigate('OTPVerification', { mobileNumber });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
                    {/* Progress Bar */}
                    <View style={{ marginTop: 12, marginBottom: 16 }}>
                        <View style={{ height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                            <View style={{ height: '100%', backgroundColor: '#01205f', width: `${(1 / 21) * 100}%` }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => NavigationService.goBack()} style={{ padding: 4 }}>
                                <ChevronLeft color="#01205f" size={24} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '600' }}>Step <Text style={{ color: '#01205f' }}>1</Text> of 15</Text>
                        </View>
                    </View>

                    {/* Centered Content */}
                    <View className="flex-1 justify-center pb-20">
                        <View className="mb-12">
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 8 }}>
                                Enter Mobile Number
                            </Text>
                            <Text style={{ fontSize: 18, color: '#6B7280', textAlign: 'center', paddingHorizontal: 16 }}>
                                We will send a 6-digit verification code to your number.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text style={{ marginBottom: 8, color: '#374151', marginLeft: 4, fontWeight: '500' }}>Mobile Number</Text>
                            <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 bg-white h-16 shadow-sm">
                                <Text style={{ fontSize: 20, fontWeight: '600', color: 'black', marginRight: 12 }}>+91</Text>
                                <View style={{ width: 1.5, height: 32, backgroundColor: '#E5E7EB', marginRight: 12 }} />
                                <TextInput
                                    className="flex-1 h-14 text-xl p-0 bg-transparent text-black"
                                    placeholder="99999 99999"
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                    value={mobileNumber}
                                    onChangeText={setMobileNumber}
                                    autoFocus
                                    placeholderTextColor="#A0AEC0"
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={handleContinue}
                            disabled={!isValid}
                            activeOpacity={0.8}
                            style={{
                                backgroundColor: isValid ? '#01205f' : '#E5E7EB',
                                borderRadius: 16,
                                height: 64,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 8
                            }}
                        >
                            <Text style={{ color: isValid ? 'white' : '#9CA3AF', fontSize: 18, fontWeight: 'bold' }}>
                                Send OTP
                            </Text>
                        </TouchableOpacity>

                        <Text style={{ textAlign: 'center', color: '#9CA3AF', marginTop: 24, paddingHorizontal: 32, fontSize: 14, lineHeight: 20 }}>
                            By continuing, you agree to our <Text style={{ color: '#01205f', fontWeight: '500' }}>Terms of Service</Text> and <Text style={{ color: '#01205f', fontWeight: '500' }}>Privacy Policy</Text>.
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
