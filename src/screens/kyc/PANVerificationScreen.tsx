import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Platform, Modal, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ChevronLeft, CreditCard, User, Calendar, Lock, ChevronDown, X, CheckCircle2 } from 'lucide-react-native';
import * as NavigationService from '../../navigation/navigationRef';

type Props = NativeStackScreenProps<RootStackParamList, 'PANVerification'>;

export default function PANVerificationScreen({ navigation }: Props) {
    const [panNumber, setPanNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Date Picker States
    const [selectedDay, setSelectedDay] = useState('01');
    const [selectedMonth, setSelectedMonth] = useState('01');
    const [selectedYear, setSelectedYear] = useState('2000');

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const isPanValid = panRegex.test(panNumber.toUpperCase());
    const isValid = isPanValid && fullName.length > 2 && dob.length > 0;

    const handleContinue = () => {
        if (isValid) {
            setIsVerifying(true);
            // Simulate API call
            setTimeout(() => {
                setIsVerifying(false);
                setShowSuccess(true);
            }, 2000);
        }
    };

    const handleFinalProceed = () => {
        setShowSuccess(false);
        NavigationService.navigate('AadhaarVerification');
    };

    const handleConfirmDate = () => {
        setDob(`${selectedDay} / ${selectedMonth} / ${selectedYear}`);
        setIsDatePickerVisible(false);
    };

    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const years = Array.from({ length: 100 }, (_, i) => (2024 - i).toString());

    const steps = [1, 2, 3, 4, 5, 6, 7];
    const currentStep = 2;

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
                            <View style={{ height: '100%', backgroundColor: '#01205f', width: `${(4 / 21) * 100}%` }} />
                        </View>
                        <View className="flex-row items-center justify-between">
                            <TouchableOpacity onPress={() => NavigationService.goBack()} style={{ padding: 4 }}>
                                <ChevronLeft color="black" size={24} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '600' }}>Step <Text style={{ color: '#01205f' }}>4</Text> of 21</Text>
                        </View>
                    </View>

                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pb-10">
                        <View className="mt-8 mb-10">
                            <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black', marginBottom: 12 }}>
                                Verify your PAN
                            </Text>
                            <Text style={{ fontSize: 15, color: '#6B7280', lineHeight: 22 }}>
                                Enter your PAN details to verify your identity.{"\n"}All information is secure and encrypted.
                            </Text>
                        </View>

                        {/* PAN Number Field */}
                        <View className="mb-6">
                            <Text style={{ fontSize: 14, fontWeight: '600', color: 'black', marginBottom: 10 }}>PAN Number</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, height: 60 }}>
                                <CreditCard size={20} color="#6B7280" style={{ marginRight: 12 }} />
                                <TextInput
                                    style={{ flex: 1, fontSize: 16, color: 'black' }}
                                    placeholder="Enter 10 digit PAN"
                                    autoCapitalize="characters"
                                    maxLength={10}
                                    value={panNumber}
                                    onChangeText={(val) => setPanNumber(val.toUpperCase())}
                                    placeholderTextColor="#A0AEC0"
                                />
                            </View>
                            <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 8 }}>Example: ABCDE1234F</Text>
                        </View>

                        {/* Full Name Field */}
                        <View className="mb-6">
                            <Text style={{ fontSize: 14, fontWeight: '600', color: 'black', marginBottom: 10 }}>Full Name (as per PAN)</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, height: 60 }}>
                                <User size={20} color="#6B7280" style={{ marginRight: 12 }} />
                                <TextInput
                                    style={{ flex: 1, fontSize: 16, color: 'black' }}
                                    placeholder="Enter full name"
                                    value={fullName}
                                    onChangeText={setFullName}
                                    placeholderTextColor="#A0AEC0"
                                />
                            </View>
                            <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 8 }}>Name should match exactly as on PAN card</Text>
                        </View>

                        {/* Date of Birth Field - TAP ANYWHERE TO OPEN CALENDAR */}
                        <View className="mb-10">
                            <Text style={{ fontSize: 14, fontWeight: '600', color: 'black', marginBottom: 10 }}>Date of Birth</Text>
                            <TouchableOpacity 
                                onPress={() => setIsDatePickerVisible(true)}
                                activeOpacity={0.7}
                                style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, height: 60 }}
                            >
                                <Calendar size={20} color="#6B7280" style={{ marginRight: 12 }} />
                                <Text style={{ flex: 1, fontSize: 16, color: dob ? 'black' : '#A0AEC0' }}>
                                    {dob || 'Select date of birth'}
                                </Text>
                                <ChevronDown size={20} color="#6B7280" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={handleContinue}
                            disabled={!isValid || isVerifying}
                            activeOpacity={0.8}
                            style={{
                                backgroundColor: '#01205f',
                                opacity: (isValid && !isVerifying) ? 1 : 0.5,
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
                                    Verify PAN
                                </Text>
                            )}
                        </TouchableOpacity>

                        <View className="flex-row items-center justify-center">
                            <Lock size={14} color="#6B7280" style={{ marginRight: 8 }} />
                            <Text style={{ color: '#6B7280', fontSize: 13, textAlign: 'center' }}>
                                Your information is encrypted and{"\n"}securely processed.
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
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 32, padding: 32, width: '100%', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#F0FDF4', padding: 24, borderRadius: 100, marginBottom: 24 }}>
                            <CheckCircle2 size={64} color="#16A34A" />
                        </View>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 12 }}>
                            Successfully Verified!
                        </Text>
                        <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 32, lineHeight: 24 }}>
                            Your PAN details have been verified with the Income Tax Department records.
                        </Text>
                        
                        <View style={{ width: '100%', backgroundColor: '#F9FAFB', padding: 20, borderRadius: 20, marginBottom: 32 }}>
                            <View className="flex-row justify-between mb-2">
                                <Text style={{ color: '#6B7280', fontSize: 14 }}>Name</Text>
                                <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>{fullName}</Text>
                            </View>
                            <View className="flex-row justify-between">
                                <Text style={{ color: '#6B7280', fontSize: 14 }}>PAN Status</Text>
                                <Text style={{ color: '#16A34A', fontSize: 14, fontWeight: 'bold' }}>Active & Verified</Text>
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
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Continue to Aadhaar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Custom Premium Date Picker Modal */}
            <Modal
                visible={isDatePickerVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsDatePickerVisible(false)}
                statusBarTranslucent={true}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, maxHeight: '60%' }}>
                        <View className="flex-row justify-between items-center mb-8">
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Select Date of Birth</Text>
                            <TouchableOpacity onPress={() => setIsDatePickerVisible(false)}>
                                <X size={24} color="#6B7280" />
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row justify-between mb-8" style={{ height: 200 }}>
                            {/* Day Selector */}
                            <View className="flex-1 items-center">
                                <Text style={{ color: '#9CA3AF', marginBottom: 12, fontWeight: '600' }}>DAY</Text>
                                <FlatList
                                    data={days}
                                    keyExtractor={(item) => item}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity 
                                            onPress={() => setSelectedDay(item)}
                                            style={{ paddingVertical: 12, width: '100%', alignItems: 'center', backgroundColor: selectedDay === item ? '#F0F7FF' : 'transparent', borderRadius: 8 }}
                                        >
                                            <Text style={{ fontSize: 18, fontWeight: selectedDay === item ? 'bold' : '400', color: selectedDay === item ? '#01205f' : '#6B7280' }}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>

                            {/* Month Selector */}
                            <View className="flex-1 items-center">
                                <Text style={{ color: '#9CA3AF', marginBottom: 12, fontWeight: '600' }}>MONTH</Text>
                                <FlatList
                                    data={months}
                                    keyExtractor={(item) => item}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity 
                                            onPress={() => setSelectedMonth(item)}
                                            style={{ paddingVertical: 12, width: '100%', alignItems: 'center', backgroundColor: selectedMonth === item ? '#F0F7FF' : 'transparent', borderRadius: 8 }}
                                        >
                                            <Text style={{ fontSize: 18, fontWeight: selectedMonth === item ? 'bold' : '400', color: selectedMonth === item ? '#01205f' : '#6B7280' }}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>

                            {/* Year Selector */}
                            <View className="flex-1 items-center">
                                <Text style={{ color: '#9CA3AF', marginBottom: 12, fontWeight: '600' }}>YEAR</Text>
                                <FlatList
                                    data={years}
                                    keyExtractor={(item) => item}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity 
                                            onPress={() => setSelectedYear(item)}
                                            style={{ paddingVertical: 12, width: '100%', alignItems: 'center', backgroundColor: selectedYear === item ? '#F0F7FF' : 'transparent', borderRadius: 8 }}
                                        >
                                            <Text style={{ fontSize: 18, fontWeight: selectedYear === item ? 'bold' : '400', color: selectedYear === item ? '#01205f' : '#6B7280' }}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={handleConfirmDate}
                            style={{
                                backgroundColor: '#01205f',
                                borderRadius: 16,
                                height: 56,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 20
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Confirm Date</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}
