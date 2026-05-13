import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { 
    ChevronLeft, 
    Briefcase, 
    TrendingUp, 
    Wallet, 
    History,
    ChevronRight,
    CheckCircle2
} from 'lucide-react-native';
import * as NavigationService from '../../navigation/navigationRef';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'EmploymentDetails'>;

export default function EmploymentDetailsScreen({ navigation }: Props) {
    const [occupation, setOccupation] = useState('');
    const [income, setIncome] = useState('');
    const [wealthSourcesSelected, setWealthSourcesSelected] = useState<string[]>([]);
    const [experience, setExperience] = useState('');

    const occupations = ['Salaried', 'Self-Employed', 'Business', 'Professional', 'Retired', 'Housewife', 'Student'];
    const incomeRanges = ['Below 1 Lakh', '1-5 Lakhs', '5-10 Lakhs', '10-25 Lakhs', 'Above 25 Lakhs'];
    const wealthSources = ['Salary', 'Business Income', 'Investments', 'Inheritance', 'Others'];
    const experiences = ['No Experience', '< 1 Year', '1-3 Years', '3-5 Years', '5+ Years'];

    const isFormValid = occupation && income && wealthSourcesSelected.length > 0 && experience;

    const handleContinue = () => {
        if (isFormValid) {
            NavigationService.navigate('FATCADeclaration');
        }
    };

    const steps = Array.from({ length: 15 }, (_, i) => i + 1);
    const currentStep = 12;

    const renderSelector = (title: string, options: string[], value: string | string[], setValue: (val: any) => void, icon: React.ReactNode, isMulti: boolean = false) => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.iconBox}>{icon}</View>
                <Text style={styles.sectionTitle}>{title}</Text>
            </View>
            <View style={styles.optionsGrid}>
                {options.map((option) => {
                    const isSelected = isMulti 
                        ? (value as string[]).includes(option)
                        : value === option;
                    
                    return (
                        <TouchableOpacity 
                            key={option}
                            onPress={() => {
                                if (isMulti) {
                                    const current = [...(value as string[])];
                                    if (current.includes(option)) {
                                        setValue(current.filter(i => i !== option));
                                    } else {
                                        setValue([...current, option]);
                                    }
                                } else {
                                    setValue(option);
                                }
                            }}
                            style={[
                                styles.optionCard,
                                isSelected ? styles.optionCardActive : {}
                            ]}
                        >
                            <Text style={[
                                styles.optionText,
                                isSelected ? styles.optionTextActive : {}
                            ]}>{option}</Text>
                            {isSelected && <CheckCircle2 size={14} color="#01205f" />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={{ paddingHorizontal: 24, paddingVertical: 16 }}>
                <View style={{ height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                    <View style={{ height: '100%', backgroundColor: '#01205f', width: `${(14 / 21) * 100}%` }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => NavigationService.goBack()} style={{ padding: 4 }}>
                        <ChevronLeft color="black" size={24} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '600' }}>Step <Text style={{ color: '#01205f' }}>14</Text> of 21</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ paddingHorizontal: 24 }}>
                <View style={{ marginTop: 8, marginBottom: 24 }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black', marginBottom: 8 }}>
                        Employment Details
                    </Text>
                    <Text style={{ fontSize: 15, color: '#6B7280', lineHeight: 22 }}>
                        Tell us about your professional background to help us personalize your experience.
                    </Text>
                </View>

                {renderSelector('Occupation', occupations, occupation, setOccupation, <Briefcase size={20} color="#01205f" />)}
                {renderSelector('Annual Income', incomeRanges, income, setIncome, <TrendingUp size={20} color="#01205f" />)}
                {renderSelector('Source of Wealth', wealthSources, wealthSourcesSelected, setWealthSourcesSelected, <Wallet size={20} color="#01205f" />, true)}
                {renderSelector('Trading Experience', experiences, experience, setExperience, <History size={20} color="#01205f" />)}

                <View style={{ height: 100 }} />
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
    section: {
        marginBottom: 32
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#F0F7FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black'
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10
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
