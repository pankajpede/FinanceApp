import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, SectionList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../client-user/components/ScreenWrapper'; // Adjust path if needed
import { linkedAccounts, allPayees, Payee } from './data/payees';

export default function SelectPayeeScreen() {
    const [activeTab, setActiveTab] = useState<'all' | 'icici' | 'other'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const renderHeaderBottom = () => (
        <View className="px-4">
            <View className="flex-row items-center bg-white rounded-lg px-4 py-2 mb-4">
                <Ionicons name="search" size={20} color="#9ca3af" />
                <TextInput
                    placeholder="Type here to search payee"
                    className="flex-1 ml-2 text-base text-gray-800"
                    placeholderTextColor="#9ca3af"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <View className="flex-row gap-3">
                <TouchableOpacity
                    onPress={() => setActiveTab('all')}
                    className={`px-4 py-1.5 rounded-full border ${activeTab === 'all' ? 'bg-white border-white' : 'bg-transparent border-white/30'}`}
                >
                    <Text className={`text-sm font-medium ${activeTab === 'all' ? 'text-[#01205f]' : 'text-white'}`}>All payes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('icici')}
                    className={`px-4 py-1.5 rounded-full border ${activeTab === 'icici' ? 'bg-white border-white' : 'bg-transparent border-white/30'}`}
                >
                    <Text className={`text-sm font-medium ${activeTab === 'icici' ? 'text-[#01205f]' : 'text-white'}`}>ICICI Bank</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('other')}
                    className={`px-4 py-1.5 rounded-full border ${activeTab === 'other' ? 'bg-white border-white' : 'bg-transparent border-white/30'}`}
                >
                    <Text className={`text-sm font-medium ${activeTab === 'other' ? 'text-[#01205f]' : 'text-white'}`}>Other Banks</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderPayeeItem = ({ item }: { item: Payee }) => (
        <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100 bg-white px-6">
            <View className="w-10 h-10 rounded-lg bg-white items-center justify-center mr-4 border border-gray-100 overflow-hidden">
                {item.bankLogo ? (
                    <Image
                        source={item.bankLogo}
                        className="w-full h-full"
                        resizeMode="contain"
                    />
                ) : (
                    <Ionicons name="business" size={20} color="#6b7280" />
                )}
            </View>
            <View className="flex-1">
                <Text className="text-gray-900 font-bold text-sm">{item.name}</Text>
                <Text className="text-gray-500 text-xs mt-0.5 uppercase">{item.bankName}</Text>
                <Text className="text-gray-400 text-xs mt-0.5">{item.accountNumber}</Text>
            </View>
        </TouchableOpacity>
    );


    const filteredPayees = allPayees.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.bankName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group for "Other Banks"
    const groupedPayees = filteredPayees.reduce((acc, payee) => {
        const firstLetter = payee.name[0].toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(payee);
        return acc;
    }, {} as Record<string, Payee[]>);

    const sections = Object.keys(groupedPayees).sort().map(letter => ({
        title: letter,
        data: groupedPayees[letter]
    }));

    const renderContent = () => {
        if (activeTab === 'other') {
            return (
                <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.id}
                    renderItem={renderPayeeItem}
                    renderSectionHeader={({ section: { title } }) => (
                        <View className="bg-gray-50 px-6 py-2">
                            <Text className="text-gray-500 font-bold">{title}</Text>
                        </View>
                    )}
                    stickySectionHeadersEnabled={false} // sticky headers inside the scrollview might conflict with sticky outer header
                    contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            );
        }

        return (
            <View className="flex-1">
                {/* Linked Accounts Header for All/ICICI */}
                <View className="px-6 py-4 bg-gray-50">
                    <Text className="text-gray-500 font-medium text-sm">Linked Accounts</Text>
                </View>
                <FlatList
                    data={linkedAccounts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                    keyExtractor={(item) => item.id}
                    renderItem={renderPayeeItem}
                    scrollEnabled={false} // Let the main ScrollView handle scrolling if needed, but here we might want list separate
                />

                {/* All Payees Header */}
                <View className="px-6 py-4 bg-gray-50 flex-row justify-between items-center">
                    <Text className="text-gray-500 font-medium text-sm">All payees ({filteredPayees.length})</Text>
                </View>

                <FlatList
                    data={filteredPayees}
                    keyExtractor={(item) => item.id}
                    renderItem={renderPayeeItem}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    scrollEnabled={false}
                />
            </View>
        );
    };

    return (
        <View className="flex-1 bg-white">
            <ScreenWrapper
                title="Select payee"
                showBackButton={true}
                scrollEnabled={true}
                headerRight={
                    <View className="flex-row gap-4">
                        <TouchableOpacity>
                            <Ionicons name="help-circle-outline" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="ellipsis-vertical" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                }
                headerBottom={renderHeaderBottom()}
            >
                {renderContent()}
            </ScreenWrapper>

            {/* Fixed Add Payee Button */}
            <View className="absolute bottom-8 left-0 right-0 px-6">
                <TouchableOpacity className="bg-[#e25a31] py-4 rounded-xl items-center shadow-lg">
                    <Text className="text-white font-bold text-lg">Add payee</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
