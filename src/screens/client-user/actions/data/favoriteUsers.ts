export interface FavoriteUser {
    id: string;
    name: string;
    image: any;
    flag?: string; // Optional: country flag emoji
}

const userImages = {
    user1: require('../../../../assets/images/user-pic/user1.jpg'),
    user2: require('../../../../assets/images/user-pic/user2.jpg'),
    user3: require('../../../../assets/images/user-pic/user3.jpg'),
    user4: require('../../../../assets/images/user-pic/user4.jpg'),
    user5: require('../../../../assets/images/user-pic/user5.jpg'),
    user6: require('../../../../assets/images/user-pic/user6.jpg'),
    user7: require('../../../../assets/images/user-pic/user7.jpg'),
    user8: require('../../../../assets/images/user-pic/user8.jpg'),
};

export const favoriteUsers: FavoriteUser[] = [
    { id: '1', name: 'Alara', image: userImages.user1, flag: '🇨🇦' },
    { id: '2', name: 'Minali', image: userImages.user2, flag: '🇺🇸' },
    { id: '3', name: 'Rohan', image: userImages.user3, flag: '🇬🇧' },
    { id: '4', name: 'Priya', image: userImages.user4, flag: '🇦🇺' },
    { id: '5', name: 'Vikram', image: userImages.user5, flag: '🇩🇪' },
    { id: '6', name: 'Sneha', image: userImages.user6, flag: '🇫🇷' },
    { id: '7', name: 'Arjun', image: userImages.user7, flag: '🇯🇵' },
    { id: '8', name: 'Kavita', image: userImages.user8, flag: '🇮🇳' },
];
