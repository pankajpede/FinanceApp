import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Button, Text, Label } from '../../services/UIComponents';
import { ChevronLeft, KeyRound, Lightbulb, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';

type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ForgotPasswordScreen() {
    const navigation = useNavigation<AuthScreenNavigationProp>();

    // Steps: 'EMAIL' | 'OTP' | 'PASSWORD'
    const [currentStep, setCurrentStep] = useState<'EMAIL' | 'OTP' | 'PASSWORD'>('EMAIL');

    // Timer State
    // Timer State
    const [timer, setTimer] = useState(5); // 5 seconds for testing
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [resendCount, setResendCount] = useState(0);

    // Input States
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Focus States
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

    // Visibility States
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Timer Logic
    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTimerRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerRunning(false);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, timer]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleGetOtp = () => {
        // Validation logic here
        setCurrentStep('OTP');
        setTimer(5);
        setIsTimerRunning(true);
        setResendCount(0);
    };

    const handleVerifyOtp = () => {
        // Verify OTP logic here
        setCurrentStep('PASSWORD');
    };

    const handlePasswordUpdate = () => {
        // Update password logic here
        navigation.navigate('Login');
    };

    const handleResendOtp = () => {
        if (resendCount < 2) {
            setTimer(5);
            setIsTimerRunning(true);
            setResendCount(prev => prev + 1);
            // Resend API call
        }
    };

    // OTP Input logic
    const inputRefs = React.useRef<Array<TextInput | null>>([]);
    const handleOtpChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text.length === 1 && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    const handleOtpKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header (Fixed at Top) */}
            <View className="px-6 pt-2 pb-2">
                <Button variant="ghost" size="icon" onPress={() => navigation.goBack()} className="-ml-2">
                    <ChevronLeft color="black" size={24} />
                </Button>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="px-6 pb-10">


                        {/* <View className="items-center justify-center my-6">
                            <View className="w-40 h-40 bg-gray-200 rounded-full items-center justify-center mb-6">
                                <KeyRound color="#01205f" size={64} />
                            </View>
                        </View> */}

                        {/* Title */}
                        <View className="mb-8 items-start">
                            <View className="flex-row items-center justify-start mb-2">
                                <View className="w-10 h-10 bg-primary rounded-lg mr-3 items-center justify-center">
                                    <Lightbulb color="white" size={17} />
                                </View>
                                <Text className="text-2xl font-bold text-primary">
                                    {currentStep === 'EMAIL' && 'Forgot Password?'}
                                    {currentStep === 'OTP' && 'Verify OTP'}
                                    {currentStep === 'PASSWORD' && 'Reset Password'}
                                </Text>
                            </View>
                            <Text className="text-start text-gray-500 text-lg pr-4 mt-2">
                                {currentStep === 'EMAIL' && "Don't worry! It happens. Please enter the email address associated with your account."}
                                {currentStep === 'OTP' && "Enter the verification code we found in your email."}
                                {currentStep === 'PASSWORD' && "Create a new password. Ensure it differs from previous used passwords."}
                            </Text>
                        </View>

                        <View className="gap-5">
                            {/* EMAIL STEP */}
                            {currentStep === 'EMAIL' && (
                                <>
                                    <View>
                                        <Label className="mb-2 ml-1 text-gray-800 text-md">Enter your email address</Label>
                                        <View
                                            className={`flex-row items-center border rounded-xl px-4 py-1 gap-3 bg-white ${emailFocused ? 'border-primary' : 'border-gray-300'}`}
                                        >
                                            <Mail size={20} color={emailFocused ? '#01205f' : '#9CA3AF'} />
                                            <TextInput
                                                placeholder="example@example.com"
                                                className="flex-1 text-base text-primary"
                                                keyboardType="email-address"
                                                placeholderTextColor="#a1a1aa"
                                                value={email}
                                                onChangeText={setEmail}
                                                onFocus={() => setEmailFocused(true)}
                                                onBlur={() => setEmailFocused(false)}
                                            />
                                        </View>
                                    </View>

                                    <Button
                                        size="lg"
                                        className="rounded-xl mt-6"
                                        onPress={handleGetOtp}
                                        label="Get OTP"
                                    />
                                </>
                            )}

                            {/* OTP STEP */}
                            {currentStep === 'OTP' && (
                                <>
                                    {resendCount < 2 && (
                                        <View>
                                            <View className="flex-row justify-between items-center mb-2">
                                                <Label className="ml-1 text-gray-800 text-md">Enter OTP</Label>
                                                {timer > 0 ? (
                                                    <Text className="text-primary font-medium">{formatTime(timer)}</Text>
                                                ) : (
                                                    <TouchableOpacity onPress={handleResendOtp} disabled={resendCount >= 2}>
                                                        <Text className={`${resendCount >= 2 ? 'text-gray-400' : 'text-red-500'} font-bold`}>
                                                            {resendCount >= 2 ? 'Try after 15 min' : 'Resend Code'}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>

                                            <View className="flex-row justify-between gap-3 mt-2">
                                                {otp.map((digit, index) => (
                                                    <View
                                                        key={index}
                                                        className={`flex-1 h-16 border rounded-xl bg-white items-center justify-center ${otp[index] ? 'border-primary' : 'border-gray-300'}`}
                                                    >
                                                        <TextInput
                                                            ref={(ref) => { inputRefs.current[index] = ref }}
                                                            className="text-2xl font-bold text-center text-primary w-full h-full"
                                                            keyboardType="number-pad"
                                                            maxLength={1}
                                                            value={digit}
                                                            onChangeText={(text) => handleOtpChange(text, index)}
                                                            onKeyPress={(e) => handleOtpKeyPress(e, index)}
                                                        />
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    )}

                                    {resendCount >= 2 && timer === 0 ? (
                                        <View className="items-center justify-center mt-10">
                                            <Text className="text-xl font-bold text-gray-800 text-center mb-4">
                                                Maximum attempts reached
                                            </Text>
                                            <Text className="text-base text-gray-500 text-center mb-8 px-4">
                                                You have exceeded the maximum number of attempts. Please try again after 15 minutes.
                                            </Text>
                                            <Button
                                                size="lg"
                                                className="rounded-xl w-full"
                                                onPress={() => navigation.navigate('Login')}
                                                label="Back to Login"
                                                variant="outline"
                                            />
                                        </View>
                                    ) : (
                                        <>
                                            <Button
                                                size="lg"
                                                className="rounded-xl mt-6"
                                                onPress={handleVerifyOtp}
                                                label="Verify & Proceed"
                                            />
                                        </>
                                    )}
                                </>
                            )}

                            {/* PASSWORD STEP */}
                            {currentStep === 'PASSWORD' && (
                                <>
                                    <View>
                                        <Label className="mb-2 ml-1 text-gray-800 text-md">New Password</Label>
                                        <View
                                            className={`flex-row items-center border rounded-xl px-4 py-1 gap-3 bg-white ${passwordFocused ? 'border-primary' : 'border-gray-300'}`}
                                        >
                                            <Lock size={20} color={passwordFocused ? '#01205f' : '#9CA3AF'} />
                                            <TextInput
                                                placeholder="•••••••"
                                                className="flex-1 text-base text-primary"
                                                secureTextEntry={!showPassword}
                                                placeholderTextColor="#a1a1aa"
                                                value={newPassword}
                                                onChangeText={setNewPassword}
                                                onFocus={() => setPasswordFocused(true)}
                                                onBlur={() => setPasswordFocused(false)}
                                            />
                                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                                {showPassword ? (
                                                    <EyeOff color="#9CA3AF" size={20} />
                                                ) : (
                                                    <Eye color="#9CA3AF" size={20} />
                                                )}
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View>
                                        <Label className="mb-2 ml-1 text-gray-800 text-md">Confirm Password</Label>
                                        <View
                                            className={`flex-row items-center border rounded-xl px-4 py-1 gap-3 bg-white ${confirmPasswordFocused ? 'border-primary' : 'border-gray-300'}`}
                                        >
                                            <Lock size={20} color={confirmPasswordFocused ? '#01205f' : '#9CA3AF'} />
                                            <TextInput
                                                placeholder="•••••••"
                                                className="flex-1 text-base text-primary"
                                                secureTextEntry={!showConfirmPassword}
                                                placeholderTextColor="#a1a1aa"
                                                value={confirmPassword}
                                                onChangeText={setConfirmPassword}
                                                onFocus={() => setConfirmPasswordFocused(true)}
                                                onBlur={() => setConfirmPasswordFocused(false)}
                                            />
                                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                {showConfirmPassword ? (
                                                    <EyeOff color="#9CA3AF" size={20} />
                                                ) : (
                                                    <Eye color="#9CA3AF" size={20} />
                                                )}
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <Button
                                        size="lg"
                                        className="rounded-xl mt-6"
                                        onPress={handlePasswordUpdate}
                                        label="Update Password"
                                    />
                                </>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
