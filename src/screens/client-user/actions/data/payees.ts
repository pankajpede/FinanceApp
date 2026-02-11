import { ImageSourcePropType } from 'react-native';

export interface Payee {
    id: string;
    name: string;
    bankName: string;
    accountNumber: string;
    isLinked?: boolean;
    bankLogo?: ImageSourcePropType;
}

const bankLogos = {
    icici: require('../../../../assets/images/bank-logos/icici.png'),
    hdfc: require('../../../../assets/images/bank-logos/hdfc.png'),
    sbi: require('../../../../assets/images/bank-logos/sbi.png'),
    axis: require('../../../../assets/images/bank-logos/axis.png'),
    idbi: require('../../../../assets/images/bank-logos/idbi.png'),
    kotak: require('../../../../assets/images/bank-logos/kotak.png'),
    bob: require('../../../../assets/images/bank-logos/bob.png'),
    pnb: require('../../../../assets/images/bank-logos/pnb.png'),
    yes: require('../../../../assets/images/bank-logos/yes.png'),
    indusind: require('../../../../assets/images/bank-logos/indusind.png'),
    union: require('../../../../assets/images/bank-logos/union.png'),
    canara: require('../../../../assets/images/bank-logos/canara.png'),
    boi: require('../../../../assets/images/bank-logos/boi.png'),
    central: require('../../../../assets/images/bank-logos/central.png'),
    indian: require('../../../../assets/images/bank-logos/indian.png'),
}

export const linkedAccounts: Payee[] = [
    {
        id: '1',
        name: 'PANKAJ VILASRAO PEDE',
        bankName: 'ICICI Bank Ltd',
        accountNumber: '6240 0158 1985',
        isLinked: true,
        bankLogo: bankLogos.icici,
    },
    {
        id: '2',
        name: 'PANKAJ VILASRAO PEDE',
        bankName: 'PPF-ICICI Bank Ltd',
        accountNumber: '0004 1839 0390',
        isLinked: true,
        bankLogo: bankLogos.icici,
    }
];

export const allPayees: Payee[] = [
    ...linkedAccounts,
    {
        id: '3',
        name: 'ADITYA A',
        bankName: 'IDBI BANK LTD.',
        accountNumber: '0500 1020 0001 8986',
        bankLogo: bankLogos.idbi,
    },
    {
        id: '4',
        name: 'ADV DHANWATE',
        bankName: 'BANK OF MAHARASHTRA',
        accountNumber: '6031 3920 188',
        bankLogo: bankLogos.bob, // Fallback
    },
    {
        id: '5',
        name: 'AMIT KUMAR',
        bankName: 'HDFC BANK',
        accountNumber: '5010 0298 1122',
        bankLogo: bankLogos.hdfc,
    },
    {
        id: '6',
        name: 'BHAVESH PATEL',
        bankName: 'AXIS BANK',
        accountNumber: '9120 1002 8833',
        bankLogo: bankLogos.axis,
    },
    {
        id: '7',
        name: 'CHETAN SHARMA',
        bankName: 'SBI',
        accountNumber: '2033 9988 7766',
        bankLogo: bankLogos.sbi,
    },
    {
        id: '8',
        name: 'Ketan Patel',
        bankName: 'KOTAK MAHINDRA BANK',
        accountNumber: '2033 9988 7766',
        bankLogo: bankLogos.kotak,
    },
    {
        id: '9',
        name: 'Priya Singh',
        bankName: 'PNB',
        accountNumber: '2033 9988 2233',
        bankLogo: bankLogos.pnb,
    },
    {
        id: '10',
        name: 'Rohan Gupta',
        bankName: 'YES BANK',
        accountNumber: '2033 9988 4455',
        bankLogo: bankLogos.yes,
    },
    {
        id: '11',
        name: 'Suresh Kumar',
        bankName: 'INDUSIND BANK',
        accountNumber: '2033 9988 6677',
        bankLogo: bankLogos.indusind,
    },
    {
        id: '12',
        name: 'Anita Desai',
        bankName: 'UNION BANK',
        accountNumber: '2033 9988 8899',
        bankLogo: bankLogos.union,
    },
    {
        id: '13',
        name: 'Vikram Singh',
        bankName: 'CANARA BANK',
        accountNumber: '2033 9988 0012',
        bankLogo: bankLogos.canara,
    },
    {
        id: '14',
        name: 'Rahul Sharma',
        bankName: 'BANK OF INDIA',
        accountNumber: '2033 9988 3344',
        bankLogo: bankLogos.boi,
    },
    {
        id: '15',
        name: 'Pooja Verma',
        bankName: 'CENTRAL BANK',
        accountNumber: '2033 9988 5566',
        bankLogo: bankLogos.central,
    },
];
