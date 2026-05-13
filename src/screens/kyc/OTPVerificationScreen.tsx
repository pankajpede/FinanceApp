import React, { useState, useEffect, useRef } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ChevronLeft, Smartphone, ShieldCheck, Lock } from 'lucide-react-native';
import * as NavigationService from '../../navigation/navigationRef';
import { StyleSheet, ActivityIndicator } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'OTPVerification'>;

export default function OTPVerificationScreen({ navigation, route }: Props) {
    const { mobileNumber } = route.params;

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const inputRefs = useRef<Array<TextInput | null>>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) setTimer(timer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const isValid = otp.every(digit => digit !== '');

    const handleVerify = () => {
        if (isValid) {
            NavigationService.navigate('ConsentPermissions');
        }
    };

    const handleResend = () => {
        setTimer(30);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
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
                            <View style={{ height: '100%', backgroundColor: '#01205f', width: `${(2 / 21) * 100}%` }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => NavigationService.goBack()} style={{ padding: 4 }}>
                                <ChevronLeft color="#01205f" size={24} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '600' }}>Step <Text style={{ color: '#01205f' }}>2</Text> of 15</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', paddingBottom: 40 }}>
                        <View style={styles.standardOtpHeader}>
                            <View style={styles.standardOtpIconCircle}>
                                <Smartphone size={42} color="#16A34A" strokeWidth={1.5} />
                            </View>
                            <Text style={styles.standardOtpTitle}>Verify OTP</Text>
                            <Text style={styles.standardOtpSubtitle}>
                                A 6-digit verification code has been sent to your mobile number <Text style={{ fontWeight: 'bold', color: '#01205f' }}>+91 {mobileNumber}</Text>.
                            </Text>
                        </View>

                        <View style={styles.standardOtpInputs}>
                            {otp.map((digit, index) => (
                                <View key={index} style={styles.standardOtpBox}>
                                    <TextInput
                                        ref={(ref) => (inputRefs.current[index] = ref)}
                                        style={styles.standardOtpText}
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        value={digit}
                                        onChangeText={(value) => handleOtpChange(value, index)}
                                        onKeyPress={(e) => handleKeyPress(e, index)}
                                        autoFocus={index === 0}
                                        cursorColor="#01205f"
                                    />
                                </View>
                            ))}
                        </View>

                        <View style={{ alignItems: 'center', marginBottom: 32 }}>
                            <TouchableOpacity disabled={timer > 0} onPress={handleResend}>
                                <Text style={{ fontSize: 14, color: '#6B7280' }}>
                                    Didn't receive code? <Text style={{ color: '#01205f', fontWeight: 'bold' }}>Resend {timer > 0 ? `in ${timer}s` : ''}</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={handleVerify}
                            disabled={!isValid}
                            activeOpacity={0.8}
                            style={[
                                styles.standardVerifyBtn,
                                isValid ? styles.standardVerifyBtnActive : {}
                            ]}
                        >
                            <ShieldCheck size={20} color="white" style={{ marginRight: 8 }} />
                            <Text style={styles.standardVerifyBtnText}>
                                Verify & Continue
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.secureFooter}>
                            <Lock size={12} color="#9CA3AF" style={{ marginRight: 6 }} />
                            <Text style={styles.secureFooterText}>Secure encrypted connection</Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    standardOtpHeader: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 32,
    },
    standardOtpIconCircle: {
        backgroundColor: '#F0FDF4',
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    standardOtpTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 12,
    },
    standardOtpSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 20,
    },
    standardOtpInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    standardOtpBox: {
        width: '14%',
        aspectRatio: 1,
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        borderRadius: 14,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    standardOtpText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        width: '100%',
        height: '100%',
    },
    standardVerifyBtn: {
        backgroundColor: '#8E9BB7',
        borderRadius: 16,
        height: 64,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    standardVerifyBtnActive: {
        backgroundColor: '#01205f',
    },
    standardVerifyBtnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secureFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
    },
    secureFooterText: {
        fontSize: 12,
        color: '#9CA3AF',
        fontWeight: '500',
    }
});
