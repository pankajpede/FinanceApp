import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, TextInput, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { 
    ChevronLeft, 
    Globe, 
    MapPin, 
    ShieldAlert, 
    FileCheck,
    ChevronRight,
    Info
} from 'lucide-react-native';
import * as NavigationService from '../../navigation/navigationRef';

type Props = NativeStackScreenProps<RootStackParamList, 'FATCADeclaration'>;

export default function FATCADeclarationScreen({ navigation }: Props) {
    const [isIndianTaxResident, setIsIndianTaxResident] = useState(true);
    const [placeOfBirth, setPlaceOfBirth] = useState('');
    const [nationality, setNationality] = useState('Indian');
    const [isPEP, setIsPEP] = useState(false);
    const [agreedToFATCA, setAgreedToFATCA] = useState(false);

    const isFormValid = placeOfBirth && nationality && agreedToFATCA;

    const handleContinue = () => {
        if (isFormValid) {
            NavigationService.navigate('NomineeDetails');
        }
    };

    const currentStep = 13;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={{ paddingHorizontal: 24, paddingVertical: 16 }}>
                <View style={{ height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                    <View style={{ height: '100%', backgroundColor: '#01205f', width: `${(16 / 21) * 100}%` }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => NavigationService.goBack()} style={{ padding: 4 }}>
                        <ChevronLeft color="black" size={24} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '600' }}>Step <Text style={{ color: '#01205f' }}>16</Text> of 21</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ paddingHorizontal: 24 }}>
                <View style={{ marginTop: 8, marginBottom: 32 }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black', marginBottom: 8 }}>
                        FATCA Declaration
                    </Text>
                    <Text style={{ fontSize: 15, color: '#6B7280', lineHeight: 22 }}>
                        Provide information regarding your tax residency and political exposure for regulatory compliance.
                    </Text>
                </View>

                {/* Tax Residency Toggle */}
                <View style={styles.declarationCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginRight: 16 }}>
                            <Text style={styles.cardTitle}>Indian Tax Resident</Text>
                            <Text style={styles.cardSub}>I am a tax resident of India and no other country.</Text>
                        </View>
                        <Switch 
                            value={isIndianTaxResident} 
                            onValueChange={setIsIndianTaxResident}
                            trackColor={{ false: '#D1D5DB', true: '#01205f' }}
                            thumbColor="white"
                        />
                    </View>
                </View>

                {/* Place of Birth & Nationality */}
                <View style={styles.inputSection}>
                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <MapPin size={16} color="#01205f" style={{ marginRight: 8 }} />
                            <Text style={styles.inputLabel}>Place of Birth</Text>
                        </View>
                        <TextInput 
                            style={styles.textInput}
                            placeholder="e.g. Mumbai"
                            value={placeOfBirth}
                            onChangeText={setPlaceOfBirth}
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <Globe size={16} color="#01205f" style={{ marginRight: 8 }} />
                            <Text style={styles.inputLabel}>Nationality</Text>
                        </View>
                        <TextInput 
                            style={styles.textInput}
                            placeholder="e.g. Indian"
                            value={nationality}
                            onChangeText={setNationality}
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>
                </View>

                {/* PEP Toggle */}
                <View style={styles.declarationCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginRight: 16 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                                <ShieldAlert size={16} color="#01205f" style={{ marginRight: 8 }} />
                                <Text style={styles.cardTitle}>Political Exposure</Text>
                            </View>
                            <Text style={styles.cardSub}>I am a Politically Exposed Person (PEP) or related to one.</Text>
                        </View>
                        <Switch 
                            value={isPEP} 
                            onValueChange={setIsPEP}
                            trackColor={{ false: '#D1D5DB', true: '#01205f' }}
                            thumbColor="white"
                        />
                    </View>
                </View>

                {/* FATCA Agreement */}
                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => setAgreedToFATCA(!agreedToFATCA)}
                    style={[styles.agreementRow, agreedToFATCA ? styles.agreementRowActive : {}]}
                >
                    <View style={[styles.checkbox, agreedToFATCA ? styles.checkboxActive : {}]}>
                        {agreedToFATCA && <FileCheck size={14} color="white" />}
                    </View>
                    <Text style={styles.agreementText}>
                        I hereby declare that the information provided above is true and correct. I also agree to the FATCA terms and conditions.
                    </Text>
                </TouchableOpacity>

                <View style={styles.infoBox}>
                    <Info size={16} color="#01205f" style={{ marginRight: 12, marginTop: 2 }} />
                    <Text style={styles.infoText}>
                        FATCA is a US law aimed at preventing tax evasion by US persons holding accounts outside the US.
                    </Text>
                </View>

                <View style={{ height: 120 }} />
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={handleContinue}
                    disabled={!isFormValid}
                    activeOpacity={0.8}
                    style={[styles.continueBtn, !isFormValid ? { opacity: 0.5 } : {}]}
                >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 8 }}>
                        Continue
                    </Text>
                    <ChevronRight size={20} color="white" />
                </TouchableOpacity>
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
    declarationCard: {
        backgroundColor: '#F9FAFB',
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#E5E7EB'
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: 'black'
    },
    cardSub: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 4,
        lineHeight: 18
    },
    inputSection: {
        marginBottom: 24
    },
    inputGroup: {
        marginBottom: 20
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    inputLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#374151'
    },
    textInput: {
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        borderRadius: 14,
        height: 52,
        paddingHorizontal: 16,
        fontSize: 15,
        color: 'black'
    },
    agreementRow: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'flex-start'
    },
    agreementRowActive: {
        borderColor: '#01205f',
        backgroundColor: '#F0F7FF'
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
        marginRight: 12
    },
    checkboxActive: {
        backgroundColor: '#01205f',
        borderColor: '#01205f'
    },
    agreementText: {
        flex: 1,
        fontSize: 13,
        color: '#4B5563',
        lineHeight: 20
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#F0F7FF',
        padding: 16,
        borderRadius: 16,
        marginTop: 24
    },
    infoText: {
        flex: 1,
        fontSize: 12,
        color: '#01205f',
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
    }
});
