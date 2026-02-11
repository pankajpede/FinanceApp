import { ImageSourcePropType } from 'react-native';

export type CardType = 'account' | 'loan';

export interface DashboardCard {
    id: string;
    type: CardType;
    title: string;
    balance: number;
    currency: string;
    logo?: string;
    // Account specific
    accountType?: string;
    // Loan specific
    nextPaymentAmount?: number;
    nextPaymentDate?: string;
    status?: 'On Track' | 'Payment Due' | 'Overdue';
    color?: string; // specific color for the card background or accent
}

export const dashboardCards: DashboardCard[] = [
    {
        id: '1',
        type: 'account',
        title: 'High Yield Savings',
        balance: 24500.00,
        currency: 'USD',
        accountType: 'HYSA',
        color: '#2B3674' // Primary Account / HYSA
    },
    {
        id: '2',
        type: 'account',
        title: 'Primary Checking',
        balance: 3523.01,
        currency: 'GBP',
        accountType: 'Checking',
        color: '#3949AB' // Secondary Bank Account
    },
    {
        id: '3',
        type: 'loan',
        title: 'Home Loan',
        balance: 345000.00,
        currency: 'USD',
        nextPaymentAmount: 2100.00,
        nextPaymentDate: 'Feb 15, 2026',
        status: 'On Track',
        color: '#5C6F7B' // Home Loan
    },
    {
        id: '4',
        type: 'loan',
        title: 'Sage Education Loan',
        balance: 15400.00,
        currency: 'USD',
        nextPaymentAmount: 350.00,
        nextPaymentDate: 'Feb 20, 2026',
        status: 'Payment Due',
        color: '#8A6D3B' // Sage / Custom Loan
    },
    {
        id: '5',
        type: 'loan',
        title: 'Customized Borrowing',
        balance: 5000.00,
        currency: 'USD',
        nextPaymentAmount: 150.00,
        nextPaymentDate: 'Mar 01, 2026',
        status: 'On Track',
        color: '#8A6D3B' // Sage / Custom Loan
    }
];
