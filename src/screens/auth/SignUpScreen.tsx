import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Button, Text, Label } from '../../services/UIComponents';
import { ChevronLeft, Lightbulb, Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import { AntDesign } from '@expo/vector-icons';

type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SignUpScreen() {
    const navigation = useNavigation<AuthScreenNavigationProp>();

    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

                        {/* Title */}
                        <View className="mb-8">
                            <View className="flex-row items-center justify-start">
                                <View className="w-10 h-10 bg-primary rounded-lg mr-3 items-center justify-center">
                                    <Lightbulb color="white" size={17} />
                                </View>
                                <Text className="text-2xl font-bold text-primary">Register</Text>
                            </View>
                            <Text className="text-start text-gray-500 text-lg pr-4 mt-2">
                                Create your account
                            </Text>
                        </View>

                        {/* Form */}
                        <View className="gap-5">
                            <View>
                                <Label className="mb-2 ml-1 text-gray-800 text-md">Enter your email</Label>
                                <View
                                    className={`flex-row items-center border rounded-xl px-4 py-1 gap-3 bg-white ${emailFocused ? 'border-primary' : 'border-gray-300'}`}
                                >
                                    <Mail size={20} color={emailFocused ? '#01205f' : '#9CA3AF'} />
                                    <TextInput
                                        placeholder="example@example.com"
                                        className="flex-1 text-base text-primary"
                                        keyboardType="email-address"
                                        placeholderTextColor="#a1a1aa"
                                        onFocus={() => setEmailFocused(true)}
                                        onBlur={() => setEmailFocused(false)}
                                    />
                                </View>
                            </View>

                            <View>
                                <Label className="mb-2 ml-1 text-gray-800 text-md">Enter your password</Label>
                                <View
                                    className={`flex-row items-center border rounded-xl px-4 py-1 gap-3 bg-white ${passwordFocused ? 'border-primary' : 'border-gray-300'}`}
                                >
                                    <Lock size={20} color={passwordFocused ? '#01205f' : '#9CA3AF'} />
                                    <TextInput
                                        placeholder="•••••••"
                                        className="flex-1 text-base text-primary"
                                        secureTextEntry={!showPassword}
                                        placeholderTextColor="#a1a1aa"
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
                                <Label className="mb-2 ml-1 text-gray-800 text-md">Re-Enter your password</Label>
                                <View
                                    className={`flex-row items-center border rounded-xl px-4 py-1 gap-3 bg-white ${confirmPasswordFocused ? 'border-primary' : 'border-gray-300'}`}
                                >
                                    <Lock size={20} color={confirmPasswordFocused ? '#01205f' : '#9CA3AF'} />
                                    <TextInput
                                        placeholder="•••••••"
                                        className="flex-1 text-base text-primary"
                                        secureTextEntry={!showConfirmPassword}
                                        placeholderTextColor="#a1a1aa"
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
                                className="rounded-xl mt-4"
                                onPress={() => { }}
                                label="Sign Up"
                            />

                            {/* <View className="flex-row items-center my-4">
                                <View className="flex-1 h-[1px] bg-gray-300" />
                                <Text className="mx-4 text-gray-400 text-lg text-center">Or</Text>
                                <View className="flex-1 h-[1px] bg-gray-300" />
                            </View> */}

                            {/* <View className="gap-3">
                                <Button variant="outline" className="py-3.5 rounded-xl gap-2 flex-row justify-center" size="lg">
                                    <AntDesign name="google" size={20} color="black" />
                                    <Text className="text-primary font-medium">Continue with Google</Text>
                                </Button>
                                <Button variant="outline" className="py-3.5 rounded-xl gap-2 flex-row justify-center" size="lg">
                                    <AntDesign name="apple" size={20} color="black" />
                                    <Text className="text-primary font-medium">Continue with Apple</Text>
                                </Button>
                            </View> */}

                            <View className="flex-row justify-center items-center mb-10">
                                <Text variant="muted" className='text-lg'>Already have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text className="text-primary font-bold text-lg">Sign in</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
