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
    Lock
} from 'lucide-react-native';
import * as NavigationService from '../../navigation/navigationRef';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'DocumentUpload'>;

type DocStatus = 'Pending' | 'Uploading' | 'Uploaded' | 'OTPSent' | 'Verifying' | 'VerifiedViaDigiLocker' | 'FailedVerification';

interface DocumentInfo {
    id: string;
    name: string;
    icon: React.ReactNode;
    isMandatory: boolean;
    supportsDigiLocker: boolean;
}

type DigiFlowState = 'selection' | 'otp' | 'fetching' | 'success';

export default function DocumentUploadScreen({ navigation }: Props) {
    const [docStates, setDocStates] = useState<Record<string, DocStatus>>({
        'pan_card': 'Pending',
        'aadhaar_card': 'Pending',
        'salary_slip': 'Pending',
        'bank_statement': 'Pending',
        'utility_bill': 'Pending',
        'rent_agreement': 'Pending',
        'passport': 'Pending',
    });

    const [processingDocId, setProcessingDocId] = useState<string | null>(null);
    
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

    const mandatoryDocs: DocumentInfo[] = [
        { id: 'pan_card', name: 'PAN Card', isMandatory: true, supportsDigiLocker: true, icon: <CreditCard size={22} color="#01205f" /> },
        { id: 'aadhaar_card', name: 'Aadhaar Card', isMandatory: true, supportsDigiLocker: true, icon: <Fingerprint size={22} color="#01205f" /> },
    ];

    const optionalDocs: DocumentInfo[] = [
        { id: 'salary_slip', name: 'Salary Slip', isMandatory: false, supportsDigiLocker: false, icon: <FileText size={20} color="#01205f" /> },
        { id: 'bank_statement', name: 'Bank Statement', isMandatory: false, supportsDigiLocker: false, icon: <Landmark size={20} color="#01205f" /> },
        { id: 'utility_bill', name: 'Utility Bill', isMandatory: false, supportsDigiLocker: false, icon: <FileText size={20} color="#01205f" /> },
        { id: 'rent_agreement', name: 'Rent Agreement', isMandatory: false, supportsDigiLocker: false, icon: <FileText size={20} color="#01205f" /> },
        { id: 'passport', name: 'Passport', isMandatory: false, supportsDigiLocker: false, icon: <FileText size={20} color="#01205f" /> },
    ];

    const availableDigiDocs = [
        ...mandatoryDocs,
        { id: 'driving_license', name: 'Driving License', isMandatory: false, supportsDigiLocker: true, icon: <CreditCard size={20} color="#01205f" /> },
        { id: 'vehicle_rc', name: 'Vehicle RC', isMandatory: false, supportsDigiLocker: true, icon: <FileText size={20} color="#01205f" /> },
    ];

    const updateDocStatus = (id: string, status: DocStatus) => {
        setDocStates(prev => ({ ...prev, [id]: status }));
    };

    const handleManualUpload = (id: string) => {
        setProcessingDocId(id);
        updateDocStatus(id, 'Uploading');
        
        setTimeout(() => {
            updateDocStatus(id, 'Uploaded');
            setProcessingDocId(null);
        }, 2000);
    };

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
        // Simulate OTP verification
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsOtpVerifying(false);
        
        setDigiFlowState('fetching');
        const results: string[] = [];

        for (const docId of selectedDigiDocs) {
            const doc = availableDigiDocs.find(d => d.id === docId);
            setCurrentlyFetchingDoc(doc?.name || docId);
            
            // Simulate fetch delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            results.push(docId);
            setFetchedDocs([...results]);
        }

        setCurrentlyFetchingDoc(null);
        setDigiFlowState('success');
    };

    const finalizeDigiFetch = () => {
        const newStates = { ...docStates };
        fetchedDocs.forEach(id => {
            if (newStates[id] !== undefined) {
                newStates[id] = 'VerifiedViaDigiLocker';
            }
        });
        setDocStates(newStates);
        setIsDigiModalVisible(false);
        // Reset modal state
        setTimeout(() => {
            setDigiFlowState('selection');
            setSelectedDigiDocs([]);
            setFetchedDocs([]);
            setOtp(['', '', '', '', '', '']);
        }, 500);
    };

    const handleContinue = () => {
        if (isMandatoryComplete) {
            NavigationService.navigate('AddressVerification');
        } else {
            setIsDigiModalVisible(true);
        }
    };

    const getStatusConfig = (status: DocStatus) => {
        switch (status) {
            case 'Pending': return { text: 'Pending', color: '#6B7280', icon: null };
            case 'Uploading': return { text: 'Connecting...', color: '#01205f', icon: <ActivityIndicator size="small" color="#01205f" style={{ marginRight: 4 }} /> };
            case 'OTPSent': return { text: 'OTP Sent', color: '#01205f', icon: <Smartphone size={14} color="#01205f" style={{ marginRight: 4 }} /> };
            case 'Verifying': return { text: 'Verifying...', color: '#01205f', icon: <ActivityIndicator size="small" color="#01205f" style={{ marginRight: 4 }} /> };
            case 'VerifiedViaDigiLocker': return { text: 'Verified via DigiLocker', color: '#16A34A', icon: <CheckCircle2 size={14} color="#16A34A" style={{ marginRight: 4 }} /> };
            case 'Uploaded': return { text: 'Uploaded', color: '#16A34A', icon: <CheckCircle2 size={14} color="#16A34A" style={{ marginRight: 4 }} /> };
            case 'FailedVerification': return { text: 'Failed', color: '#EF4444', icon: <AlertCircle size={14} color="#EF4444" style={{ marginRight: 4 }} /> };
            default: return { text: 'Pending', color: '#6B7280', icon: null };
        }
    };

    const isMandatoryComplete = mandatoryDocs.every(doc => 
        docStates[doc.id] === 'VerifiedViaDigiLocker' || docStates[doc.id] === 'Uploaded'
    );

    const steps = Array.from({ length: 15 }, (_, i) => i + 1);
    const currentStep = 10;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Progress Bar */}
            <View style={{ paddingHorizontal: 24, paddingVertical: 16 }}>
                <View style={{ height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                    <View style={{ height: '100%', backgroundColor: '#01205f', width: `${(9 / 21) * 100}%` }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => NavigationService.goBack()} style={{ padding: 4 }}>
                        <ChevronLeft color="black" size={24} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '600' }}>Step <Text style={{ color: '#01205f' }}>9</Text> of 21</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ paddingHorizontal: 24, paddingBottom: 120 }}>
                <View style={{ marginTop: 24, marginBottom: 32 }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black', marginBottom: 12 }}>
                        Upload Documents
                    </Text>
                    <Text style={{ fontSize: 15, color: '#6B7280', lineHeight: 22 }}>
                        Submit required documents to complete your KYC verification securely.
                    </Text>
                </View>

                {/* SECTION 1 - MANDATORY DOCUMENTS */}
                <View style={{ marginBottom: 32 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Mandatory Documents</Text>
                        <View style={{ backgroundColor: '#FEE2E2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
                            <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#EF4444' }}>REQUIRED</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>These documents are required to continue.</Text>

                    {mandatoryDocs.map((doc) => {
                        const statusConfig = getStatusConfig(docStates[doc.id]);
                        const isProcessing = processingDocId === doc.id;
                        const isVerified = docStates[doc.id] === 'VerifiedViaDigiLocker' || docStates[doc.id] === 'Uploaded';

                        return (
                            <View key={doc.id} style={styles.mandatoryCard}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: isVerified ? 0 : 16 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.iconContainer}>
                                            {doc.icon}
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{doc.name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                                {statusConfig.icon}
                                                <Text style={{ fontSize: 12, color: statusConfig.color, fontWeight: '600' }}>
                                                    {statusConfig.text}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    {isVerified && <CheckCircle2 size={24} color="#16A34A" />}
                                </View>

                                {!isVerified && (
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <TouchableOpacity
                                            onPress={() => handleManualUpload(doc.id)}
                                            disabled={!!processingDocId}
                                            style={[styles.secondaryCTA, processingDocId ? { opacity: 0.6 } : {}, { width: '100%' }]}
                                        >
                                            <Upload size={16} color="#01205f" style={{ marginRight: 8 }} />
                                            <Text style={{ color: '#01205f', fontWeight: 'bold', fontSize: 13 }}>Upload</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>

                {/* SECTION 2 - OPTIONAL DOCUMENTS */}
                <View style={{ marginBottom: 32 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: 'black', marginBottom: 4 }}>Additional Documents (Optional)</Text>
                    <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>Upload only if requested during verification.</Text>

                    <View style={styles.optionalList}>
                        {optionalDocs.map((doc) => {
                            const status = docStates[doc.id];
                            const isUploaded = status === 'Uploaded';
                            const isUploading = status === 'Uploading' && processingDocId === doc.id;

                            return (
                                <View key={doc.id} style={styles.optionalItem}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                        <View style={styles.smallIconContainer}>
                                            {doc.icon}
                                        </View>
                                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{doc.name}</Text>
                                    </View>
                                    
                                    <TouchableOpacity 
                                        onPress={() => handleManualUpload(doc.id)}
                                        disabled={!!processingDocId || isUploaded}
                                        style={[
                                            styles.uploadSmallBtn,
                                            isUploaded ? { borderColor: '#16A34A', backgroundColor: '#F0FDF4' } : {}
                                        ]}
                                    >
                                        {isUploading ? (
                                            <ActivityIndicator size="small" color="#01205f" />
                                        ) : isUploaded ? (
                                            <CheckCircle2 size={16} color="#16A34A" />
                                        ) : (
                                            <Upload size={16} color="#01205f" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* SECTION 3 - STATUS SUMMARY */}
                <View style={{ marginBottom: 24, padding: 20, backgroundColor: '#F9FAFB', borderRadius: 24, borderWidth: 1, borderColor: '#E5E7EB' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                        <History size={18} color="#01205f" style={{ marginRight: 8 }} />
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>Document Status Summary</Text>
                    </View>
                    
                    {[...mandatoryDocs, ...optionalDocs].map(doc => {
                        const status = docStates[doc.id];
                        if (status === 'Pending') return null;
                        
                        return (
                            <View key={doc.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FileCheck size={14} color="#6B7280" style={{ marginRight: 8 }} />
                                    <Text style={{ fontSize: 13, color: '#374151' }}>{doc.name}</Text>
                                </View>
                                <Text style={{ fontSize: 12, fontWeight: '700', color: (status.includes('Verified') || status === 'Uploaded') ? '#16A34A' : '#01205f' }}>
                                    {status === 'VerifiedViaDigiLocker' ? 'Verified (DigiLocker)' : status}
                                </Text>
                            </View>
                        );
                    })}
                    
                    {Object.values(docStates).every(s => s === 'Pending') && (
                        <Text style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center', fontStyle: 'italic' }}>
                            No documents uploaded yet
                        </Text>
                    )}
                </View>

                <View style={{ alignItems: 'center', marginBottom: 40 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ShieldCheck size={14} color="#16A34A" style={{ marginRight: 8 }} />
                        <Text style={{ fontSize: 12, color: '#6B7280' }}>Secure 256-bit SSL Encryption</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Floating Action Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={handleContinue}
                    activeOpacity={0.8}
                    style={styles.continueBtn}
                >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 8 }}>
                        {isMandatoryComplete ? 'Continue' : 'Fetch via DigiLocker'}
                    </Text>
                    {isMandatoryComplete ? (
                        <ChevronRight size={20} color="white" />
                    ) : (
                        <ShieldCheck size={20} color="white" />
                    )}
                </TouchableOpacity>
            </View>

            {/* DigiLocker Modal */}
            <Modal
                visible={isDigiModalVisible}
                animationType="slide"
                transparent={false}
                presentationStyle="fullScreen"
                onRequestClose={() => setIsDigiModalVisible(false)}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                    >
                        <View style={styles.modalContent}>
                            {/* Modal Header */}
                            <View style={styles.modalHeader}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: '#F0F7FF', padding: 8, borderRadius: 10, marginRight: 12 }}>
                                        <Cloud size={24} color="#01205f" />
                                    </View>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>DigiLocker</Text>
                                </View>
                                <TouchableOpacity onPress={() => setIsDigiModalVisible(false)} style={{ padding: 4 }}>
                                    <X size={24} color="#6B7280" />
                                </TouchableOpacity>
                            </View>

                            {digiFlowState === 'selection' && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 15, color: '#6B7280', marginBottom: 24 }}>
                                        Select documents you want to fetch securely from your DigiLocker account.
                                    </Text>

                                    <ScrollView style={{ flex: 1 }}>
                                        {availableDigiDocs.map(doc => (
                                            <TouchableOpacity 
                                                key={doc.id}
                                                onPress={() => toggleDigiDocSelection(doc.id)}
                                                style={[
                                                    styles.digiDocItem,
                                                    selectedDigiDocs.includes(doc.id) ? { borderColor: '#01205f', backgroundColor: '#F0F7FF' } : {}
                                                ]}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                                    <View style={styles.iconContainerSmall}>
                                                        {doc.icon}
                                                    </View>
                                                    <View>
                                                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>{doc.name}</Text>
                                                        {doc.isMandatory && (
                                                            <Text style={{ fontSize: 11, color: '#EF4444', fontWeight: 'bold', marginTop: 2 }}>REQUIRED</Text>
                                                        )}
                                                    </View>
                                                </View>
                                                <View style={[
                                                    styles.checkbox,
                                                    selectedDigiDocs.includes(doc.id) ? { backgroundColor: '#01205f', borderColor: '#01205f' } : {}
                                                ]}>
                                                    {selectedDigiDocs.includes(doc.id) && <CheckCircle2 size={16} color="white" />}
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>

                                    <TouchableOpacity
                                        onPress={startDigiFetchFlow}
                                        disabled={selectedDigiDocs.length === 0}
                                        style={[styles.modalBtn, selectedDigiDocs.length === 0 ? { opacity: 0.5 } : {}]}
                                    >
                                        <Download size={20} color="white" style={{ marginRight: 8 }} />
                                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Fetch Selected Documents</Text>
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
                                    <View style={styles.fetchingCircle}>
                                        <ActivityIndicator size="large" color="#01205f" />
                                    </View>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 8 }}>
                                        Fetching Documents
                                    </Text>
                                    <Text style={{ fontSize: 14, color: '#6B7280', textAlign: 'center' }}>
                                        Retrieving {currentlyFetchingDoc} securely...
                                    </Text>
                                    <View style={styles.progressContainer}>
                                        <View style={[styles.progressBar, { width: `${(fetchedDocs.length / selectedDigiDocs.length) * 100}%` }]} />
                                    </View>
                                    <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 12 }}>
                                        Please do not close this screen
                                    </Text>
                                </View>
                            )}

                            {digiFlowState === 'success' && (
                                <View style={{ flex: 1 }}>
                                    <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 32 }}>
                                        <View style={{ backgroundColor: '#F0FDF4', padding: 20, borderRadius: 100, marginBottom: 16 }}>
                                            <CheckCircle2 size={48} color="#16A34A" />
                                        </View>
                                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black' }}>Fetched Successfully!</Text>
                                        <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>Documents retrieved from DigiLocker</Text>
                                    </View>

                                    <View style={{ flex: 1, backgroundColor: '#F9FAFB', borderRadius: 24, padding: 20, marginBottom: 24 }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#374151', marginBottom: 16 }}>Verified Documents</Text>
                                        <ScrollView>
                                            {fetchedDocs.map(docId => {
                                                const doc = availableDigiDocs.find(d => d.id === docId);
                                                return (
                                                    <View key={docId} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                                                        <CheckCircle2 size={18} color="#16A34A" style={{ marginRight: 12 }} />
                                                        <Text style={{ fontSize: 15, color: 'black', fontWeight: '500' }}>{doc?.name}</Text>
                                                    </View>
                                                );
                                            })}
                                        </ScrollView>
                                    </View>

                                    <TouchableOpacity
                                        onPress={finalizeDigiFetch}
                                        style={styles.modalBtn}
                                    >
                                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Done</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mandatoryCard: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#F0F7FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    secondaryCTA: {
        backgroundColor: '#F0F7FF',
        borderWidth: 1.5,
        borderColor: '#01205f',
        borderRadius: 14,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionalList: {
        backgroundColor: '#F9FAFB',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden',
    },
    optionalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    smallIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    uploadSmallBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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
    // Modal Styles
    modalContent: {
        backgroundColor: 'white',
        padding: 24,
        flex: 1,
        width: '100%',
        height: '100%',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    digiDocItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#F3F4F6',
        backgroundColor: 'white',
        marginBottom: 12,
    },
    iconContainerSmall: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBtn: {
        backgroundColor: '#01205f',
        borderRadius: 16,
        height: 56,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    otpBox: {
        width: '14%',
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    otpInput: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        width: '100%',
        height: '100%',
    },
    fetchingCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F0F7FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    progressContainer: {
        width: '100%',
        height: 6,
        backgroundColor: '#E5E7EB',
        borderRadius: 3,
        marginTop: 24,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#01205f',
    },
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
    }
});
