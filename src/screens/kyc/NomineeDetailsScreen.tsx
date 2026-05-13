import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { 
    ChevronLeft, 
    User, 
    Heart, 
    Calendar, 
    PieChart,
    ChevronRight,
    CheckCircle2,
    Plus
} from 'lucide-react-native';
import * as NavigationService from '../../navigation/navigationRef';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'NomineeDetails'>;

export default function NomineeDetailsScreen({ navigation }: Props) {
    const [nomineeName, setNomineeName] = useState('');
    const [relationship, setRelationship] = useState('');
    const [dob, setDob] = useState('');
    const [allocation, setAllocation] = useState('100');

    const relationships = ['Spouse', 'Father', 'Mother', 'Son', 'Daughter', 'Brother', 'Sister', 'Others'];

    const isFormValid = nomineeName && relationship && dob && allocation;

    const handleContinue = () => {
        if (isFormValid) {
            NavigationService.navigate('SignatureUpload');
        }
    };

    const currentStep = 14;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={{ paddingHorizontal: 24, paddingVertical: 16 }}>
                <View style={{ height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                    <View style={{ height: '100%', backgroundColor: '#01205f', width: `${(18 / 21) * 100}%` }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => NavigationService.goBack()} style={{ padding: 4 }}>
                        <ChevronLeft color="black" size={24} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '600' }}>Step <Text style={{ color: '#01205f' }}>18</Text> of 21</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ paddingHorizontal: 24 }}>
                <View style={{ marginTop: 8, marginBottom: 32 }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black', marginBottom: 8 }}>
                        Nominee Details
                    </Text>
                    <Text style={{ fontSize: 15, color: '#6B7280', lineHeight: 22 }}>
                        Assign a nominee to your account to ensure security for your investments.
                    </Text>
                </View>

                {/* Nominee Form */}
                <View style={styles.formCard}>
                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <User size={16} color="#01205f" style={{ marginRight: 8 }} />
                            <Text style={styles.inputLabel}>Nominee Full Name</Text>
                        </View>
                        <TextInput 
                            style={styles.textInput}
                            placeholder="Full name as per ID"
                            value={nomineeName}
                            onChangeText={setNomineeName}
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <Calendar size={16} color="#01205f" style={{ marginRight: 8 }} />
                            <Text style={styles.inputLabel}>Date of Birth</Text>
                        </View>
                        <TextInput 
                            style={styles.textInput}
                            placeholder="DD / MM / YYYY"
                            value={dob}
                            onChangeText={setDob}
                            placeholderTextColor="#9CA3AF"
                            keyboardType="number-pad"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <PieChart size={16} color="#01205f" style={{ marginRight: 8 }} />
                            <Text style={styles.inputLabel}>Allocation (%)</Text>
                        </View>
                        <TextInput 
                            style={styles.textInput}
                            placeholder="100"
                            value={allocation}
                            onChangeText={setAllocation}
                            placeholderTextColor="#9CA3AF"
                            keyboardType="number-pad"
                            maxLength={3}
                        />
                    </View>
                </View>

                {/* Relationship Selector */}
                <View style={{ marginTop: 24, marginBottom: 32 }}>
                    <View style={styles.labelRow}>
                        <Heart size={16} color="#01205f" style={{ marginRight: 8 }} />
                        <Text style={styles.inputLabel}>Relationship</Text>
                    </View>
                    <View style={styles.optionsGrid}>
                        {relationships.map((rel) => (
                            <TouchableOpacity 
                                key={rel}
                                onPress={() => setRelationship(rel)}
                                style={[
                                    styles.optionCard,
                                    relationship === rel ? styles.optionCardActive : {}
                                ]}
                            >
                                <Text style={[
                                    styles.optionText,
                                    relationship === rel ? styles.optionTextActive : {}
                                ]}>{rel}</Text>
                                {relationship === rel && <CheckCircle2 size={14} color="#01205f" />}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TouchableOpacity style={styles.addNomineeBtn}>
                    <Plus size={18} color="#01205f" style={{ marginRight: 8 }} />
                    <Text style={styles.addNomineeText}>Add Another Nominee</Text>
                </TouchableOpacity>

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
    formCard: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 4,
        gap: 20
    },
    inputGroup: {
        marginBottom: 4
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
        backgroundColor: '#F9FAFB',
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        borderRadius: 16,
        height: 56,
        paddingHorizontal: 16,
        fontSize: 15,
        color: 'black'
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 12
    },
    optionCard: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: (SCREEN_WIDTH - 68) / 2
    },
    optionCardActive: {
        borderColor: '#01205f',
        backgroundColor: '#F0F7FF'
    },
    optionText: {
        fontSize: 14,
        color: '#4B5563',
        fontWeight: '600'
    },
    optionTextActive: {
        color: '#01205f',
        fontWeight: 'bold'
    },
    addNomineeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderWidth: 1.5,
        borderColor: '#01205f',
        borderStyle: 'dashed',
        borderRadius: 16,
        backgroundColor: '#F0F7FF',
        marginTop: 8
    },
    addNomineeText: {
        color: '#01205f',
        fontWeight: 'bold',
        fontSize: 15
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
