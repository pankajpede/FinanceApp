import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { CheckCircle, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react-native';
import * as NavigationService from '../../navigation/navigationRef';

type Props = NativeStackScreenProps<RootStackParamList, 'FaceMatchProcessing'>;

export default function KYCProcessingScreen({ navigation }: Props) {
    const [status, setStatus] = useState<'processing' | 'success'>('processing');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setStatus('success');
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    const handleFinish = () => {
        NavigationService.navigate('DocumentUpload');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 }}>
                {status === 'processing' ? (
                    <>
                        <View style={{ marginBottom: 40 }}>
                            <ActivityIndicator size="large" color="#01205f" />
                        </View>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginBottom: 12 }}>
                            Verifying Identity
                        </Text>
                        <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 30 }}>
                            Our AI is matching your selfie with your documents. Please wait a moment.
                        </Text>
                        
                        <View style={{ width: '100%', height: 8, backgroundColor: '#F3F4F6', borderRadius: 4, overflow: 'hidden' }}>
                            <View style={{ width: `${progress}%`, height: '100%', backgroundColor: '#01205f' }} />
                        </View>
                        <Text style={{ marginTop: 12, color: '#01205f', fontWeight: 'bold' }}>{progress}% Complete</Text>
                        
                        <View className="mt-12 flex-row items-center">
                            <ShieldCheck size={20} color="#6B7280" className="mr-2" />
                            <Text style={{ color: '#6B7280', fontSize: 14 }}>Secure AI Processing</Text>
                        </View>
                    </>
                ) : (
                    <>
                        <View style={{ backgroundColor: '#F0FDF4', padding: 30, borderRadius: 100, marginBottom: 30 }}>
                            <CheckCircle size={80} color="#16A34A" />
                        </View>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black', marginBottom: 12, textAlign: 'center' }}>
                            Face Matched!
                        </Text>
                        <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 40, lineHeight: 24 }}>
                            Your identity has been successfully verified. Now, please upload your documents for final verification.
                        </Text>

                        <View style={{ width: '100%', backgroundColor: '#F9FAFB', padding: 20, borderRadius: 24, marginBottom: 40 }}>
                            <View className="flex-row items-center mb-4">
                                <UserCheck size={20} color="#16A34A" style={{ marginRight: 12 }} />
                                <Text style={{ color: '#374151', fontSize: 15, fontWeight: '600' }}>Identity Matched</Text>
                            </View>
                            <View className="flex-row items-center">
                                <CheckCircle size={20} color="#16A34A" style={{ marginRight: 12 }} />
                                <Text style={{ color: '#374151', fontSize: 15, fontWeight: '600' }}>Documents Verified</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={handleFinish}
                            activeOpacity={0.8}
                            style={{
                                backgroundColor: '#01205f',
                                borderRadius: 16,
                                height: 64,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                                Continue to Documents
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}
