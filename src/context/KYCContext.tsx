import React, { createContext, useContext, useState } from 'react';

interface KYCData {
    mobileNumber: string;
    panNumber: string;
    fullName: string;
    dob: string;
    aadhaarNumber: string;
    occupation: string;
    income: string;
    wealthSourcesSelected: string[];
    experience: string;
    placeOfBirth: string;
    nationality: string;
    isPEP: boolean;
    agreedToFATCA: boolean;
    nomineeName: string;
    relationship: string;
    nomineeDob: string;
    allocation: string;
}

interface KYCContextType {
    kycData: KYCData;
    updateKYCData: (newData: Partial<KYCData>) => void;
}

const initialKYCData: KYCData = {
    mobileNumber: '',
    panNumber: '',
    fullName: '',
    dob: '',
    aadhaarNumber: '',
    occupation: '',
    income: '',
    wealthSourcesSelected: [],
    experience: '',
    placeOfBirth: '',
    nationality: 'Indian',
    isPEP: false,
    agreedToFATCA: false,
    nomineeName: '',
    relationship: '',
    nomineeDob: '',
    allocation: '100',
};

const KYCContext = createContext<KYCContextType | undefined>(undefined);

export const KYCProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [kycData, setKYCData] = useState<KYCData>(initialKYCData);

    const updateKYCData = (newData: Partial<KYCData>) => {
        setKYCData(prev => ({ ...prev, ...newData }));
    };

    return (
        <KYCContext.Provider value={{ kycData, updateKYCData }}>
            {children}
        </KYCContext.Provider>
    );
};

export const useKYC = () => {
    const context = useContext(KYCContext);
    if (context === undefined) {
        throw new Error('useKYC must be used within a KYCProvider');
    }
    return context;
};
