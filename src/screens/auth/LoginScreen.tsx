import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Button, Text, Label, Checkbox } from '../../services/UIComponents';
import { ChevronLeft, Lightbulb, Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import { AntDesign } from '@expo/vector-icons';
import { GoogleIcon } from '../../components/icons/GoogleIcon';

type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
    const navigation = useNavigation<AuthScreenNavigationProp>();

    // Focus states
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header (Fixed at Top) */}
            <View className="px-6 pt-2 pb-2">
                <Button variant="ghost" size="icon" onPress={() => navigation.goBack()} className="-ml-2">
                    <ChevronLeft color="black" size={24} />
                </Button>
            </View>

            {/* Main Content (Scrollable & Centered) */}
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="px-6 pb-10">


                        {/* Title */}
                        <View className="mb-8">

                            <View className="flex-row items-center justify-start">
                                <View className="w-10 h-10 bg-primary rounded-lg mr-3 items-center justify-center">
                                    <Lightbulb color="white" size={17} />
                                </View>
                                <View className="flex-col items-start justify-start">
                                    <Text className="text-2xl font-bold text-primary">Login</Text>
                                </View>
                            </View>
                            <Text className="text-start text-gray-500 text-lg pr-4 mt-2">
                                Welcome back! Please enter your details
                            </Text>
                        </View>

                        {/* Form */}
                        <View className="gap-5">
                            {/* Email Field */}
                            <View>
                                <Label className="mb-2 ml-1 text-gray-800 text-md">E-mail Address</Label>
                                <View
                                    className={`flex-row items-center border rounded-xl px-4 py-1 gap-3 bg-white ${emailFocused ? 'border-primary' : 'border-gray-300'}`}
                                >
                                    <Mail size={20} color={emailFocused ? '#01205f' : '#9CA3AF'} />
                                    <TextInput
                                        placeholder="example@example.com"
                                        placeholderTextColor="#a1a1aa"
                                        className="flex-1 text-base text-primary"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        onFocus={() => setEmailFocused(true)}
                                        onBlur={() => setEmailFocused(false)}
                                    />
                                </View>
                            </View>

                            {/* Password Field */}
                            <View>
                                <Label className="mb-2 ml-1 text-gray-800 text-md">Password</Label>
                                <View
                                    className={`flex-row items-center border rounded-xl px-4 py-1 gap-3 bg-white ${passwordFocused ? 'border-primary' : 'border-gray-300'}`}
                                >
                                    <Lock size={20} color={passwordFocused ? '#01205f' : '#9CA3AF'} />
                                    <TextInput
                                        placeholder="•••••••"
                                        placeholderTextColor="#a1a1aa"
                                        className="flex-1 text-base text-primary"
                                        secureTextEntry={!showPassword}
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

                            <View className="flex-row justify-between items-center mt-2">
                                <View className="flex-row items-center gap-2">
                                    <Checkbox checked={rememberMe} onCheckedChange={setRememberMe} />
                                    <Text className="text-gray-800 text-lg">Remember me</Text>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                    <Text className="text-primary font-medium text-lg">Forgot password?</Text>
                                </TouchableOpacity>
                            </View>

                            <Button
                                size="lg"
                                className="rounded-xl mt-4"
                                onPress={() => navigation.reset({ index: 0, routes: [{ name: 'ClientTabs' }] })}
                                label="Login"
                            />

                            <View className="flex-row items-center my-4">
                                <View className="flex-1 h-[1px] bg-gray-300" />
                                <Text className="mx-4 text-gray-400 text-lg text-center">Or</Text>
                                <View className="flex-1 h-[1px] bg-gray-300" />
                            </View>

                            <View className="gap-3">
                                <Button variant="outline" className="py-3.5 rounded-xl gap-2 flex-row justify-center" size="lg">
                                    <GoogleIcon width={20} height={20} />
                                    <Text className="text-primary font-medium">Continue with Google</Text>
                                </Button>
                                <Button variant="outline" className="py-3.5 rounded-xl gap-2 flex-row justify-center" size="lg">
                                    <AntDesign name="apple" size={20} color="black" />
                                    <Text className="text-primary font-medium">Continue with Apple</Text>
                                </Button>
                            </View>

                            <View className="flex-row justify-center items-center mt-6">
                                <Text variant="muted" className='text-lg'>Don't have account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                    <Text className="text-primary font-bold text-lg">Sign up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
