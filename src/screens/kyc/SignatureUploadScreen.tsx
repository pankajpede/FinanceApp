import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Dimensions, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { 
    ChevronLeft, 
    PenTool, 
    Upload, 
    Trash2, 
    CheckCircle2,
    ShieldCheck,
    Info,
    Lock
} from 'lucide-react-native';
import * as NavigationService from '../../navigation/navigationRef';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'SignatureUpload'>;

export default function SignatureUploadScreen({ navigation }: Props) {
    const [signatureMode, setSignatureMode] = useState<'draw' | 'upload'>('draw');
    const [hasSigned, setHasSigned] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const handleClear = () => setHasSigned(false);
    const handleSign = () => setHasSigned(true);

    const handleFinish = async () => {
        setIsVerifying(true);
        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsVerifying(false);
        // Navigate to final success/dashboard
        NavigationService.navigate('AuthLanding');
    };

    const currentStep = 15;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={{ paddingHorizontal: 24, paddingVertical: 16 }}>
                <View style={{ height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                    <View style={{ height: '100%', backgroundColor: '#01205f', width: '100%' }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => NavigationService.goBack()} style={{ padding: 4 }}>
                        <ChevronLeft color="black" size={24} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '600' }}>Step <Text style={{ color: '#01205f' }}>21</Text> of 21</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ paddingHorizontal: 24 }}>
                <View style={{ marginTop: 8, marginBottom: 32 }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black', marginBottom: 8 }}>
                        Digital Signature
                    </Text>
                    <Text style={{ fontSize: 15, color: '#6B7280', lineHeight: 22 }}>
                        Sign on the screen or upload a picture of your signature to complete your KYC.
                    </Text>
                </View>

                {/* Mode Selector */}
                <View style={styles.modeTabs}>
                    <TouchableOpacity 
                        onPress={() => setSignatureMode('draw')}
                        style={[styles.modeTab, signatureMode === 'draw' ? styles.modeTabActive : {}]}
                    >
                        <PenTool size={18} color={signatureMode === 'draw' ? '#01205f' : '#6B7280'} style={{ marginRight: 8 }} />
                        <Text style={[styles.modeTabText, signatureMode === 'draw' ? styles.modeTabTextActive : {}]}>Draw</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => setSignatureMode('upload')}
                        style={[styles.modeTab, signatureMode === 'upload' ? styles.modeTabActive : {}]}
                    >
                        <Upload size={18} color={signatureMode === 'upload' ? '#01205f' : '#6B7280'} style={{ marginRight: 8 }} />
                        <Text style={[styles.modeTabText, signatureMode === 'upload' ? styles.modeTabTextActive : {}]}>Upload</Text>
                    </TouchableOpacity>
                </View>

                {signatureMode === 'draw' ? (
                    <View style={styles.signatureArea}>
                        <View style={styles.canvasPlaceholder}>
                            {!hasSigned ? (
                                <TouchableOpacity onPress={handleSign} style={styles.signTrigger}>
                                    <PenTool size={48} color="#D1D5DB" strokeWidth={1} />
                                    <Text style={styles.signTriggerText}>Tap to Sign Here</Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.signedContent}>
                                    {/* In a real app, this would be the actual signature vector/image */}
                                    <View style={styles.mockSignature}>
                                        <Text style={styles.mockSignatureText}>Digital Signature Captured</Text>
                                    </View>
                                    <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
                                        <Trash2 size={16} color="#EF4444" style={{ marginRight: 6 }} />
                                        <Text style={styles.clearBtnText}>Clear & Redo</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                        <Text style={styles.signatureInfo}>By signing, you authorize the opening of your account.</Text>
                    </View>
                ) : (
                    <View style={styles.uploadArea}>
                        <TouchableOpacity style={styles.uploadBox}>
                            <View style={styles.uploadIconCircle}>
                                <Upload size={32} color="#01205f" />
                            </View>
                            <Text style={styles.uploadTitle}>Choose from Gallery</Text>
                            <Text style={styles.uploadSub}>JPEG, PNG or PDF up to 5MB</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.securityBox}>
                    <ShieldCheck size={18} color="#16A34A" style={{ marginRight: 12 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.securityTitle}>Secure Transmission</Text>
                        <Text style={styles.securityText}>Your signature is encrypted and will only be used for account verification.</Text>
                    </View>
                </View>

                <View style={{ height: 120 }} />
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={handleFinish}
                    disabled={!hasSigned || isVerifying}
                    activeOpacity={0.8}
                    style={[styles.continueBtn, (!hasSigned || isVerifying) ? { opacity: 0.5 } : {}]}
                >
                    {isVerifying ? (
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Processing...</Text>
                    ) : (
                        <>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 8 }}>
                                Submit & Finish
                            </Text>
                            <CheckCircle2 size={20} color="white" />
                        </>
                    )}
                </TouchableOpacity>
                <View style={styles.secureBadge}>
                    <Lock size={12} color="#9CA3AF" style={{ marginRight: 4 }} />
                    <Text style={styles.secureBadgeText}>End-to-end encrypted</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    progressContainer: {
        height: 6,
        backgroundColor: '#F3F4F6',
        borderRadius: 3,
        overflow: 'hidden'
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#01205f'
    },
    modeTabs: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 16,
        padding: 6,
        marginBottom: 24
    },
    modeTab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12
    },
    modeTabActive: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    modeTabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280'
    },
    modeTabTextActive: {
        color: '#01205f',
        fontWeight: 'bold'
    },
    signatureArea: {
        flex: 1
    },
    canvasPlaceholder: {
        height: 240,
        backgroundColor: '#F9FAFB',
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    signTrigger: {
        alignItems: 'center'
    },
    signTriggerText: {
        marginTop: 12,
        fontSize: 15,
        color: '#9CA3AF',
        fontWeight: '500'
    },
    signedContent: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    mockSignature: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#01205f',
        marginBottom: 24
    },
    mockSignatureText: {
        fontSize: 20,
        fontStyle: 'italic',
        color: '#01205f',
        fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'serif'
    },
    clearBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FEF2F2'
    },
    clearBtnText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#EF4444'
    },
    signatureInfo: {
        fontSize: 13,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 16,
        lineHeight: 18
    },
    uploadArea: {
        flex: 1
    },
    uploadBox: {
        height: 240,
        backgroundColor: '#F9FAFB',
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadIconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#F0F7FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16
    },
    uploadTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    uploadSub: {
        fontSize: 13,
        color: '#9CA3AF',
        marginTop: 4
    },
    securityBox: {
        flexDirection: 'row',
        backgroundColor: '#F0FDF4',
        padding: 20,
        borderRadius: 20,
        marginTop: 32,
        alignItems: 'flex-start'
    },
    securityTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#16A34A',
        marginBottom: 4
    },
    securityText: {
        fontSize: 13,
        color: '#166534',
        lineHeight: 18
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6'
    },
    continueBtn: {
        backgroundColor: '#01205f',
        borderRadius: 20,
        height: 64,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    secureBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12
    },
    secureBadgeText: {
        fontSize: 11,
        color: '#9CA3AF',
        fontWeight: '500'
    }
});
