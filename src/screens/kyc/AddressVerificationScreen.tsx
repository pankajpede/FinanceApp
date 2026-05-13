import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Alert, Modal, Dimensions, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { 
    ChevronLeft, 
    Upload, 
    FileText, 
    CheckCircle2, 
    Smartphone, 
    ShieldCheck, 
    Info, 
    AlertCircle,
    ChevronRight,
    CreditCard,
    Fingerprint,
    Landmark,
    FileCheck,
    History,
    X,
    Cloud,
    Download,
    Lock,
    MapPin,
    Home,
    ChevronDown
} from 'lucide-react-native';
import * as NavigationService from '../../navigation/navigationRef';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'AddressVerification'>;

type DigiFlowState = 'selection' | 'otp' | 'fetching' | 'success';

interface DocType {
    id: string;
    name: string;
    icon: React.ReactNode;
}

export default function AddressVerificationScreen({ navigation }: Props) {
    // Address State
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');
    const [pincode, setPincode] = useState('');

    // Document Selection State
    const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);
    const [selectedDocType, setSelectedDocType] = useState<string | null>(null);

    // Verification State
    const [isVerified, setIsVerified] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // DigiLocker Modal State
    const [isDigiModalVisible, setIsDigiModalVisible] = useState(false);
    const [digiFlowState, setDigiFlowState] = useState<DigiFlowState>('selection');
    const [selectedDigiDocs, setSelectedDigiDocs] = useState<string[]>([]);
    const [currentlyFetchingDoc, setCurrentlyFetchingDoc] = useState<string | null>(null);
    const [fetchedDocs, setFetchedDocs] = useState<string[]>([]);
    
    // OTP State
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [isOtpVerifying, setIsOtpVerifying] = useState(false);
    const otpInputRefs = useRef<Array<TextInput | null>>([]);

    useEffect(() => {
        let interval: any;
        if (digiFlowState === 'otp' && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [digiFlowState, timer]);

    const isAddressComplete = address1.length > 0 && address2.length > 0 && pincode.length === 6;

    const docTypes: DocType[] = [
        { id: 'aadhaar', name: 'Aadhaar Card', icon: <Fingerprint size={20} color="#01205f" /> },
        { id: 'voter', name: 'Voter ID', icon: <CreditCard size={20} color="#01205f" /> },
        { id: 'passport', name: 'Passport', icon: <FileText size={20} color="#01205f" /> },
        { id: 'utility', name: 'Utility Bill', icon: <Landmark size={20} color="#01205f" /> },
    ];

    const availableDigiDocs = [
        { id: 'aadhaar_card', name: 'Aadhaar Card', icon: <Fingerprint size={20} color="#01205f" /> },
        { id: 'voter_id', name: 'Voter ID', icon: <CreditCard size={20} color="#01205f" /> },
        { id: 'utility_bill', name: 'Utility Bill', icon: <FileText size={20} color="#01205f" /> },
    ];

    const toggleDigiDocSelection = (id: string) => {
        setSelectedDigiDocs(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const startDigiFetchFlow = () => {
        if (selectedDigiDocs.length === 0) return;
        setDigiFlowState('otp');
        setTimer(30);
        setOtp(['', '', '', '', '', '']);
    };

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOtpAndFetch = async () => {
        const isOtpComplete = otp.every(digit => digit !== '');
        if (!isOtpComplete) return;

        setIsOtpVerifying(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsOtpVerifying(false);
        
        setDigiFlowState('fetching');
        const results: string[] = [];

        for (const docId of selectedDigiDocs) {
            const doc = availableDigiDocs.find(d => d.id === docId);
            setCurrentlyFetchingDoc(doc?.name || docId);
            await new Promise(resolve => setTimeout(resolve, 2000));
            results.push(docId);
            setFetchedDocs([...results]);
        }

        setCurrentlyFetchingDoc(null);
        setDigiFlowState('success');
    };

    const finalizeDigiFetch = () => {
        setIsVerified(true);
        setIsDigiModalVisible(false);
        // We stay on the page now so the user can see 'Verified' and click the bottom Continue button
        setTimeout(() => {
            setDigiFlowState('selection');
            setSelectedDigiDocs([]);
            setFetchedDocs([]);
            setOtp(['', '', '', '', '', '']);
        }, 500);
    };

    const handleOpenDigiLocker = () => {
        if (!selectedDocType) return;
        
        // Map the main selection to the DigiLocker flow
        setSelectedDigiDocs([selectedDocType]);
        setDigiFlowState('otp');
        setTimer(30);
        setOtp(['', '', '', '', '', '']);
        setIsDigiModalVisible(true);
    };

    const handleManualUpload = () => {
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            setIsVerified(true);
        }, 2000);
    };

    const handleFinish = () => {
        setShowSuccess(false);
        NavigationService.navigate('EmploymentDetails');
    };

    const selectedDoc = docTypes.find(t => t.id === selectedDocType);

    const steps = Array.from({ length: 15 }, (_, i) => i + 1);
    const currentStep = 11;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ paddingHorizontal: 24, paddingVertical: 16 }}>
                <View style={{ height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                    <View style={{ height: '100%', backgroundColor: '#01205f', width: `${(11 / 21) * 100}%` }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => NavigationService.goBack()} style={{ padding: 4 }}>
                        <ChevronLeft color="black" size={24} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '600' }}>Step <Text style={{ color: '#01205f' }}>11</Text> of 21</Text>
                </View>
            </View>

            <ScrollView 
                contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 140 }} 
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ marginTop: 24, marginBottom: 32 }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black', marginBottom: 12 }}>
                        Address Verification
                    </Text>
                    <Text style={{ fontSize: 15, color: '#6B7280', lineHeight: 22 }}>
                        Provide your current address and verify it with a government document.
                    </Text>
                </View>

                {/* SECTION 1 - MANUAL ADDRESS ENTRY */}
                <View style={{ marginBottom: 32 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <Home size={18} color="#01205f" style={{ marginRight: 8 }} />
                        <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Address Details</Text>
                    </View>

                    <View style={styles.addressInputs}>
                        <TextInput
                            style={styles.cleanInput}
                            placeholder="Address Line 1"
                            value={address1}
                            onChangeText={setAddress1}
                            placeholderTextColor="#9CA3AF"
                        />
                        <TextInput
                            style={styles.cleanInput}
                            placeholder="Address Line 2"
                            value={address2}
                            onChangeText={setAddress2}
                            placeholderTextColor="#9CA3AF"
                        />
                        <TextInput
                            style={styles.cleanInput}
                            placeholder="Address Line 3 (Optional)"
                            value={address3}
                            onChangeText={setAddress3}
                            placeholderTextColor="#9CA3AF"
                        />
                        <TextInput
                            style={styles.cleanInput}
                            placeholder="Pincode"
                            keyboardType="number-pad"
                            maxLength={6}
                            value={pincode}
                            onChangeText={setPincode}
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>
                </View>

                {/* SECTION 2 - UNIFIED VERIFICATION CARD */}
                <View style={[styles.unifiedCard, isVerified ? styles.cardVerified : {}]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                        <ShieldCheck size={20} color="#01205f" style={{ marginRight: 10 }} />
                        <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Verify Address Proof</Text>
                    </View>

                    {/* Select Document Trigger (Shadow Free) */}
                    <TouchableOpacity 
                        activeOpacity={0.7}
                        onPress={() => setIsTypeModalVisible(true)}
                        style={styles.shadowFreeSelector}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.selectorIconBox}>
                                {selectedDoc ? selectedDoc.icon : <FileText size={20} color="#9CA3AF" />}
                            </View>
                            <Text style={[
                                styles.selectorText,
                                selectedDoc ? { color: 'black', fontWeight: 'bold' } : { color: '#9CA3AF' }
                            ]}>
                                {selectedDoc ? selectedDoc.name : 'Select Document Type'}
                            </Text>
                        </View>
                        <ChevronDown size={20} color="#01205f" />
                    </TouchableOpacity>

                    {/* Action Buttons (Inside the same card) */}
                        <View style={{ flexDirection: 'row', marginTop: 24 }}>
                            <TouchableOpacity
                                onPress={handleOpenDigiLocker}
                                disabled={!selectedDocType || !isAddressComplete || isVerifying || isVerified}
                                style={[
                                    styles.cardActionBtn,
                                    styles.cardActionBtnPrimary,
                                    { marginRight: 12 },
                                    (!selectedDocType || !isAddressComplete || isVerifying || isVerified) ? styles.cardBtnLocked : {}
                                ]}
                            >
                            <Cloud size={18} color="white" style={{ marginRight: 8 }} />
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>DigiLocker</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={handleManualUpload}
                            disabled={!selectedDocType || !isAddressComplete || isVerifying || isVerified}
                            style={[
                                styles.cardActionBtn,
                                styles.cardActionBtnSecondary,
                                (!selectedDocType || !isAddressComplete || isVerifying || isVerified) ? styles.cardBtnLockedSecondary : {}
                            ]}
                        >
                            {isVerifying ? (
                                <ActivityIndicator size="small" color="#01205f" />
                            ) : (
                                <>
                                    <Upload size={18} color={selectedDocType && isAddressComplete && !isVerified ? "#01205f" : "#9CA3AF"} style={{ marginRight: 8 }} />
                                    <Text style={{ color: selectedDocType && isAddressComplete && !isVerified ? '#01205f' : '#9CA3AF', fontWeight: 'bold', fontSize: 14 }}>Upload</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>

                    {isVerified && (
                        <View style={styles.verifiedSuccessBox}>
                            <CheckCircle2 size={16} color="#16A34A" style={{ marginRight: 8 }} />
                            <Text style={{ color: '#16A34A', fontSize: 13, fontWeight: 'bold' }}>Address Verified Successfully</Text>
                        </View>
                    )}
                </View>

                {!selectedDocType && !isVerified && (
                    <View style={styles.stepInfoBox}>
                        <Info size={16} color="#01205f" style={{ marginRight: 10 }} />
                        <Text style={{ fontSize: 12, color: '#01205f', flex: 1, lineHeight: 18 }}>
                            Please enter your address and select a document type to enable verification options.
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Floating Action Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={handleFinish}
                    activeOpacity={0.8}
                    style={[
                        styles.continueBtn, 
                        { backgroundColor: isVerified ? '#01205f' : '#E5E7EB' }
                    ]}
                >
                    <Text style={{ color: isVerified ? 'white' : '#9CA3AF', fontSize: 18, fontWeight: 'bold', marginRight: 8 }}>
                        Continue
                    </Text>
                    <ChevronRight size={20} color={isVerified ? 'white' : '#9CA3AF'} />
                </TouchableOpacity>
            </View>

            {/* Document Type Selection Modal (Popup with Radio Buttons) */}
            <Modal
                visible={isTypeModalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setIsTypeModalVisible(false)}
            >
                <View style={styles.popupOverlay}>
                    <View style={styles.popupContent}>
                        <View style={styles.popupHeader}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Select Document</Text>
                            <TouchableOpacity onPress={() => setIsTypeModalVisible(false)} style={{ padding: 4 }}>
                                <X size={24} color="#6B7280" />
                            </TouchableOpacity>
                        </View>
                        
                        <ScrollView style={{ marginTop: 12 }}>
                            {docTypes.map((type) => (
                                <TouchableOpacity 
                                    key={type.id}
                                    onPress={() => {
                                        setSelectedDocType(type.id);
                                        setIsTypeModalVisible(false);
                                    }}
                                    style={styles.radioItem}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.radioIconBox}>
                                            {type.icon}
                                        </View>
                                        <Text style={[
                                            styles.radioText,
                                            selectedDocType === type.id ? { color: '#01205f', fontWeight: 'bold' } : {}
                                        ]}>
                                            {type.name}
                                        </Text>
                                    </View>
                                    <View style={[
                                        styles.radioButton,
                                        selectedDocType === type.id ? styles.radioButtonActive : {}
                                    ]}>
                                        {selectedDocType === type.id && <View style={styles.radioButtonInner} />}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* DigiLocker Modal (Standard Flow) */}
            <Modal
                visible={isDigiModalVisible}
                animationType="slide"
                transparent={false}
                presentationStyle="fullScreen"
                onRequestClose={() => setIsDigiModalVisible(false)}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                        <View style={styles.digiModalContent}>
                            <View style={styles.modalHeaderRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={styles.cloudBox}><Cloud size={24} color="#01205f" /></View>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>DigiLocker</Text>
                                </View>
                                <TouchableOpacity onPress={() => setIsDigiModalVisible(false)} style={{ padding: 4 }}><X size={24} color="#6B7280" /></TouchableOpacity>
                            </View>

                            {digiFlowState === 'selection' && (
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.modalSub}>Select document to fetch securely.</Text>
                                    <ScrollView style={{ flex: 1 }}>
                                        {availableDigiDocs.map(doc => (
                                            <TouchableOpacity key={doc.id} onPress={() => toggleDigiDocSelection(doc.id)} style={[styles.digiSelectRow, selectedDigiDocs.includes(doc.id) ? styles.digiSelectRowActive : {}]}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                                    <View style={styles.digiSelectIcon}>{doc.icon}</View>
                                                    <Text style={styles.digiSelectText}>{doc.name}</Text>
                                                </View>
                                                <View style={[styles.customCheck, selectedDigiDocs.includes(doc.id) ? styles.customCheckActive : {}]}>
                                                    {selectedDigiDocs.includes(doc.id) && <CheckCircle2 size={16} color="white" />}
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                    <TouchableOpacity onPress={startDigiFetchFlow} disabled={selectedDigiDocs.length === 0} style={[styles.digiModalCta, selectedDigiDocs.length === 0 ? { opacity: 0.5 } : {}]}>
                                        <Download size={20} color="white" style={{ marginRight: 8 }} />
                                        <Text style={styles.digiModalCtaText}>Fetch Selected Docs</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {digiFlowState === 'otp' && (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.standardOtpHeader}>
                                        <View style={styles.standardOtpIconCircle}>
                                            <Smartphone size={42} color="#16A34A" strokeWidth={1.5} />
                                        </View>
                                        <Text style={styles.standardOtpTitle}>Verify OTP</Text>
                                        <Text style={styles.standardOtpSubtitle}>
                                            A 6-digit verification code has been sent to your mobile number linked with DigiLocker.
                                        </Text>
                                    </View>

                                    <View style={styles.standardOtpInputs}>
                                        {otp.map((digit, index) => (
                                            <View key={index} style={styles.standardOtpBox}>
                                                <TextInput
                                                    ref={(ref) => (otpInputRefs.current[index] = ref)}
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
                                        <TouchableOpacity disabled={timer > 0}>
                                            <Text style={{ fontSize: 14, color: '#6B7280' }}>
                                                Didn't receive code? <Text style={{ color: '#01205f', fontWeight: 'bold' }}>Resend {timer > 0 ? `in ${timer}s` : ''}</Text>
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity 
                                        onPress={handleVerifyOtpAndFetch} 
                                        disabled={!otp.every(d => d !== '') || isOtpVerifying} 
                                        style={[
                                            styles.standardVerifyBtn, 
                                            otp.every(d => d !== '') && !isOtpVerifying ? styles.standardVerifyBtnActive : {}
                                        ]}
                                    >
                                        {isOtpVerifying ? (
                                            <ActivityIndicator color="white" />
                                        ) : (
                                            <>
                                                <ShieldCheck size={20} color="white" style={{ marginRight: 8 }} />
                                                <Text style={styles.standardVerifyBtnText}>Verify & Fetch</Text>
                                            </>
                                        )}
                                    </TouchableOpacity>

                                    <View style={styles.secureFooter}>
                                        <Lock size={12} color="#9CA3AF" style={{ marginRight: 6 }} />
                                        <Text style={styles.secureFooterText}>Secure encrypted connection</Text>
                                    </View>
                                </View>
                            )}

                            {digiFlowState === 'fetching' && (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size="large" color="#01205f" />
                                    <Text style={styles.loadTitle}>Processing Request...</Text>
                                    <Text style={styles.loadSub}>Retrieving {currentlyFetchingDoc}</Text>
                                </View>
                            )}

                            {digiFlowState === 'success' && (
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={styles.loadCircle}><CheckCircle2 size={64} color="#16A34A" /></View>
                                    <Text style={styles.loadSuccessTitle}>Verified!</Text>
                                    <Text style={styles.loadSuccessSub}>Address proof verified successfully.</Text>
                                    <TouchableOpacity onPress={finalizeDigiFetch} style={[styles.digiModalCta, { width: '100%', marginTop: 40 }]}><Text style={styles.digiModalCtaText}>Continue</Text></TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </Modal>

            {/* Final KYC Success Modal */}
            <Modal visible={showSuccess} transparent={true} animationType="fade">
                <View style={styles.finalBoxOverlay}>
                    <View style={styles.finalBoxContent}>
                        <View style={styles.finalIconCircleBox}><CheckCircle2 size={64} color="#16A34A" /></View>
                        <Text style={styles.finalTextTitle}>Verification Complete!</Text>
                        <Text style={styles.finalTextSub}>Your address verification is now finished. You can explore our services from the dashboard.</Text>
                        <TouchableOpacity onPress={handleFinish} style={styles.finalFinishBtn}><Text style={styles.finalFinishBtnText}>Continue</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    addressInputs: { gap: 12 },
    cleanInput: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
        fontSize: 15,
        color: 'black',
    },
    unifiedCard: {
        backgroundColor: 'white',
        borderRadius: 28,
        padding: 24,
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
    },
    cardVerified: { borderColor: '#16A34A', backgroundColor: '#F0FDF4' },
    shadowFreeSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB',
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        borderRadius: 18,
        paddingHorizontal: 16,
        height: 60,
    },
    selectorIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    selectorText: { fontSize: 15 },
    cardActionBtn: {
        flex: 1,
        borderRadius: 16,
        height: 52,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardActionBtnPrimary: { backgroundColor: '#01205f' },
    cardActionBtnSecondary: { backgroundColor: 'white', borderWidth: 1.5, borderColor: '#01205f' },
    cardBtnLocked: { backgroundColor: '#E5E7EB' },
    cardBtnLockedSecondary: { borderColor: '#E5E7EB', backgroundColor: 'transparent' },
    verifiedSuccessBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
    stepInfoBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F7FF', padding: 14, borderRadius: 16, marginTop: 20 },
    
    // Selection Modal Styles (Popup)
    popupOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 24 },
    popupContent: { backgroundColor: 'white', borderRadius: 32, padding: 24, maxHeight: SCREEN_HEIGHT * 0.6 },
    popupHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
    radioItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
    radioIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    radioText: { fontSize: 16, color: '#4B5563' },
    radioButton: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#D1D5DB', justifyContent: 'center', alignItems: 'center' },
    radioButtonActive: { borderColor: '#01205f' },
    radioButtonInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#01205f' },
    
    // DigiLocker Modal Styles
    digiModalOverlay: { flex: 1, backgroundColor: 'white' },
    digiModalContent: { backgroundColor: 'white', padding: 24, flex: 1, width: '100%', height: '100%' },
    modalHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
    cloudBox: { backgroundColor: '#F0F7FF', padding: 8, borderRadius: 10, marginRight: 12 },
    modalSub: { fontSize: 15, color: '#6B7280', marginBottom: 24 },
    digiSelectRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 20, borderWidth: 1.5, borderColor: '#F3F4F6', backgroundColor: 'white', marginBottom: 12 },
    digiSelectRowActive: { borderColor: '#01205f', backgroundColor: '#F0F7FF' },
    digiSelectIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    digiSelectText: { fontSize: 15, fontWeight: 'bold', color: 'black' },
    customCheck: { width: 24, height: 24, borderRadius: 8, borderWidth: 2, borderColor: '#D1D5DB', justifyContent: 'center', alignItems: 'center' },
    customCheckActive: { backgroundColor: '#01205f', borderColor: '#01205f' },
    digiModalCta: { backgroundColor: '#01205f', borderRadius: 18, height: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 },
    digiModalCtaText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    authHeader: { alignItems: 'center', marginTop: 20, marginBottom: 32 },
    authIconCircle: { backgroundColor: '#F0FDF4', padding: 20, borderRadius: 100, marginBottom: 20 },
    authTitle: { fontSize: 22, fontWeight: 'bold', color: 'black' },
    authSub: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginTop: 8 },
    otpGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
    otpCell: { width: '14%', aspectRatio: 1, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 14, backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center' },
    otpCellText: { fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', width: '100%', height: '100%' },
    loadTitle: { fontSize: 18, fontWeight: 'bold', color: 'black', marginTop: 24 },
    loadSub: { fontSize: 14, color: '#6B7280', marginTop: 8 },
    loadCircle: { backgroundColor: '#F0FDF4', padding: 24, borderRadius: 100, marginBottom: 24 },
    loadSuccessTitle: { fontSize: 24, fontWeight: 'bold', color: 'black' },
    loadSuccessSub: { fontSize: 16, color: '#6B7280', marginTop: 8, textAlign: 'center' },
    
    // Final Success Modal
    finalBoxOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: 24 },
    finalBoxContent: { backgroundColor: 'white', borderRadius: 36, padding: 32, width: '100%', alignItems: 'center' },
    finalIconCircleBox: { backgroundColor: '#F0FDF4', padding: 24, borderRadius: 100, marginBottom: 24 },
    finalTextTitle: { fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 12 },
    finalTextSub: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 32, lineHeight: 24 },
    finalFinishBtn: { backgroundColor: '#01205f', borderRadius: 18, height: 60, width: '100%', justifyContent: 'center', alignItems: 'center' },
    finalFinishBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    
    // Standardized OTP Styles
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
        height: 60,
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
        fontSize: 16,
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
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    continueBtn: {
        backgroundColor: '#01205f',
        borderRadius: 20,
        height: 64,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
