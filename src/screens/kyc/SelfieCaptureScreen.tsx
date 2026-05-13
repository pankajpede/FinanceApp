import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ChevronLeft, Camera, User, CheckCircle2 } from 'lucide-react-native';
import * as NavigationService from '../../navigation/navigationRef';

type Props = NativeStackScreenProps<RootStackParamList, 'SelfieCapture'>;

export default function SelfieCaptureScreen({ navigation }: Props) {
    const [isCaptured, setIsCaptured] = useState(false);

    const handleCapture = () => {
        if (!isCaptured) {
            setIsCaptured(true);
            setTimeout(() => {
                NavigationService.navigate('FaceMatchProcessing');
            }, 1500);
        }
    };

    const steps = [1, 2, 3, 4, 5, 6, 7];
    const currentStep = 5;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                {/* Progress Bar */}
                <View className="px-6 py-4">
                    <View style={{ height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                        <View style={{ height: '100%', backgroundColor: '#01205f', width: `${(7 / 21) * 100}%` }} />
                    </View>
                    <View className="flex-row items-center justify-between">
                        <TouchableOpacity onPress={() => NavigationService.goBack()} style={{ padding: 4 }}>
                            <ChevronLeft color="black" size={24} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '600' }}>Step <Text style={{ color: '#01205f' }}>7</Text> of 21</Text>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
                    <View className="items-center mt-4 mb-8">
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 8 }}>
                            Take a Selfie
                        </Text>
                        <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center', paddingHorizontal: 20 }}>
                            Please keep your face within the frame and ensure good lighting.
                        </Text>
                    </View>

                    {/* Camera Preview Mockup */}
                    <View className="items-center justify-center">
                        <View style={styles.cameraFrame}>
                            <View style={styles.faceOverlay}>
                                {isCaptured ? (
                                    <View className="items-center justify-center">
                                        <CheckCircle2 size={80} color="#16A34A" />
                                        <Text style={{ color: '#16A34A', fontWeight: 'bold', marginTop: 16, fontSize: 18 }}>Captured!</Text>
                                    </View>
                                ) : (
                                    <User size={120} color="#E5E7EB" strokeWidth={1} />
                                )}
                            </View>
                            
                            {/* Scanning Animation simulation lines */}
                            {!isCaptured && <View style={styles.scanLine} />}
                        </View>
                    </View>

                    <View className="mt-10 space-y-4">
                        <View className="flex-row items-center mb-4">
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#01205f', marginRight: 12 }} />
                            <Text style={{ color: '#374151', fontSize: 15 }}>No glasses or hats</Text>
                        </View>
                        <View className="flex-row items-center mb-4">
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#01205f', marginRight: 12 }} />
                            <Text style={{ color: '#374151', fontSize: 15 }}>Face the camera directly</Text>
                        </View>
                        <View className="flex-row items-center mb-8">
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#01205f', marginRight: 12 }} />
                            <Text style={{ color: '#374151', fontSize: 15 }}>Ensure a neutral background</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={handleCapture}
                        disabled={isCaptured}
                        activeOpacity={0.8}
                        style={{
                            backgroundColor: isCaptured ? '#16A34A' : '#01205f',
                            borderRadius: 16,
                            height: 64,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 40
                        }}
                    >
                        <Camera size={24} color="white" style={{ marginRight: 12 }} />
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                            {isCaptured ? 'Processing...' : 'Capture Selfie'}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    cameraFrame: {
        width: 280,
        height: 380,
        borderRadius: 140,
        borderWidth: 4,
        borderColor: '#01205f',
        borderStyle: 'dashed',
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative'
    },
    faceOverlay: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanLine: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: 'rgba(1, 32, 95, 0.3)',
        zIndex: 10
    }
});
