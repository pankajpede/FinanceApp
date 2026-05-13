import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ChevronLeft, Fingerprint, Smartphone, Lock, CheckCircle2 } from 'lucide-react-native';
import * as NavigationService from '../../navigation/navigationRef';

type Props = NativeStackScreenProps<RootStackParamList, 'AadhaarVerification'>;

export default function AadhaarVerificationScreen({ navigation }: Props) {
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const inputRefs = useRef<Array<TextInput | null>>([]);

    useEffect(() => {
        let interval: any;
        if (showOtp && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showOtp, timer]);

    const isAadhaarValid = aadhaarNumber.length === 12 && /^\d+$/.test(aadhaarNumber);
    const isOtpValid = otp.every(digit => digit !== '');

    const handleGetOtp = () => {
        if (isAadhaarValid) {
            setIsSendingOtp(true);
            setTimeout(() => {
                setIsSendingOtp(false);
                setShowOtp(true);
                setTimer(30);
            }, 1500);
        }
    };

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        if (isOtpValid) {
            setIsVerifying(true);
            setTimeout(() => {
                setIsVerifying(false);
                setShowSuccess(true);
            }, 2000);
        }
    };

    const handleFinalProceed = () => {
        setShowSuccess(false);
        NavigationService.navigate('DigiLockerConnect');
    };

    const steps = [1, 2, 3, 4, 5, 6, 7];
    const currentStep = 3;

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    {/* Progress Bar */}
                    <View className="px-6 py-4">
                        <View style={{ height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                            <View style={{ height: '100%', backgroundColor: '#01205f', width: `${(5 / 21) * 100}%` }} />
                        </View>
                        <View className="flex-row items-center justify-between">
                            <TouchableOpacity onPress={() => showOtp ? setShowOtp(false) : NavigationService.goBack()} style={{ padding: 4 }}>
                                <ChevronLeft color="black" size={24} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '600' }}>Step <Text style={{ color: '#01205f' }}>5</Text> of 21</Text>
                        </View>
                    </View>

                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pb-10">
                        {!showOtp ? (
                            <>
                                <View className="items-center mt-8 mb-10">
                                    {/* Aadhaar Branded Logo Mockup */}
                                    <View style={{ backgroundColor: '#FFF7ED', padding: 24, borderRadius: 100, marginBottom: 20, borderWidth: 2, borderColor: '#FFEDD5' }}>
                                        <Fingerprint size={56} color="#EA580C" strokeWidth={1.5} />
                                    </View>
                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 8 }}>
                                        Aadhaar Verification
                                    </Text>
                                    <Text style={{ fontSize: 15, color: '#6B7280', textAlign: 'center', paddingHorizontal: 20, lineHeight: 22 }}>
                                        Enter your 12-digit Aadhaar number to verify your identity.
                                    </Text>
                                </View>

                                <View className="mb-10">
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: 'black', marginBottom: 10 }}>Aadhaar Number</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, height: 60 }}>
                                        <Fingerprint size={20} color="#6B7280" style={{ marginRight: 12 }} />
                                        <TextInput
                                            style={{ flex: 1, fontSize: 18, fontWeight: 'bold', letterSpacing: 4, color: 'black' }}
                                            placeholder="XXXX XXXX XXXX"
                                            keyboardType="number-pad"
                                            maxLength={12}
                                            value={aadhaarNumber}
                                            onChangeText={setAadhaarNumber}
                                            placeholderTextColor="#A0AEC0"
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={handleGetOtp}
                                    disabled={!isAadhaarValid || isSendingOtp}
                                    activeOpacity={0.8}
                                    style={{
                                        backgroundColor: '#01205f',
                                        opacity: (isAadhaarValid && !isSendingOtp) ? 1 : 0.5,
                                        borderRadius: 12,
                                        height: 56,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: 20
                                    }}
                                >
                                    {isSendingOtp ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                                            Get OTP
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <View className="items-center mt-8 mb-10">
                                    <View style={{ backgroundColor: '#F0FDF4', padding: 24, borderRadius: 100, marginBottom: 20 }}>
                                        <Smartphone size={56} color="#16A34A" strokeWidth={1.5} />
                                    </View>
                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 8 }}>
                                        Verify OTP
                                    </Text>
                                    <Text style={{ fontSize: 15, color: '#6B7280', textAlign: 'center', lineHeight: 22 }}>
                                        Enter the 6-digit code sent to your Aadhaar-linked mobile number.
                                    </Text>
                                </View>

                                <View className="flex-row justify-between mb-10 px-2">
                                    {otp.map((digit, index) => (
                                        <View key={index} className="w-[14%] aspect-square border border-gray-300 rounded-2xl bg-white items-center justify-center shadow-sm">
                                            <TextInput
                                                ref={(ref) => (inputRefs.current[index] = ref)}
                                                style={{ fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', width: '100%', height: '100%' }}
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

                                <View className="flex-row justify-center items-center mb-10">
                                    <Text style={{ color: '#6B7280', fontSize: 16 }}>Didn't receive code? </Text>
                                    {timer > 0 ? (
                                        <Text style={{ color: '#01205f', fontWeight: 'bold', fontSize: 16 }}>Resend in {timer}s</Text>
                                    ) : (
                                        <TouchableOpacity onPress={() => setTimer(30)}>
                                            <Text style={{ color: '#01205f', fontWeight: 'bold', fontSize: 16 }}>Resend Now</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                <TouchableOpacity
                                    onPress={handleVerify}
                                    disabled={!isOtpValid || isVerifying}
                                    activeOpacity={0.8}
                                    style={{
                                        backgroundColor: '#01205f',
                                        opacity: (isOtpValid && !isVerifying) ? 1 : 0.5,
                                        borderRadius: 12,
                                        height: 56,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: 20
                                    }}
                                >
                                    {isVerifying ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                                            Verify & Continue
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </>
                        )}

                        <View className="flex-row items-center justify-center mt-4">
                            <Lock size={14} color="#6B7280" style={{ marginRight: 8 }} />
                            <Text style={{ color: '#6B7280', fontSize: 13, textAlign: 'center' }}>
                                Your Aadhaar details are secure and{"\n"}encrypted with UIDAI.
                            </Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>

            {/* Success Confirmation Modal */}
            <Modal
                visible={showSuccess}
                transparent={true}
                animationType="fade"
                statusBarTranslucent={true}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 32, width: '100%', alignItems: 'center', paddingBottom: 40 }}>
                        <View style={{ backgroundColor: '#F0FDF4', padding: 24, borderRadius: 100, marginBottom: 24 }}>
                            <CheckCircle2 size={64} color="#16A34A" />
                        </View>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 12 }}>
                            Aadhaar Verified!
                        </Text>
                        <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 32, lineHeight: 24 }}>
                            Identity verification via UIDAI is successful. Your records have been updated.
                        </Text>
                        
                        <View style={{ width: '100%', backgroundColor: '#F9FAFB', padding: 20, borderRadius: 20, marginBottom: 32 }}>
                            <View className="flex-row justify-between mb-2">
                                <Text style={{ color: '#6B7280', fontSize: 14 }}>Verified ID</Text>
                                <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>XXXX XXXX {aadhaarNumber.slice(-4)}</Text>
                            </View>
                            <View className="flex-row justify-between">
                                <Text style={{ color: '#6B7280', fontSize: 14 }}>Status</Text>
                                <Text style={{ color: '#16A34A', fontSize: 14, fontWeight: 'bold' }}>Authenticated</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={handleFinalProceed}
                            style={{
                                backgroundColor: '#01205f',
                                borderRadius: 16,
                                height: 56,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 12
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Continue to DigiLocker</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setShowSuccess(false);
                                NavigationService.navigate('SelfieCapture');
                            }}
                            style={{
                                backgroundColor: 'white',
                                borderWidth: 1.5,
                                borderColor: '#01205f',
                                borderRadius: 16,
                                height: 56,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: '#01205f', fontSize: 16, fontWeight: 'bold' }}>Skip to Liveness Check</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}
