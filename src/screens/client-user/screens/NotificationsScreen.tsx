import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ScreenWrapper';
import notificationsData from '../../../data/notificationsData.json';

const SkeletonNotification = () => (
    <View className="flex-row items-center mb-4 p-4 bg-white rounded-[10px] border border-gray-100 opacity-60">
        <View className="w-10 h-10 rounded-full bg-gray-200 mr-4" />
        <View className="flex-1">
            <View className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
            <View className="h-3 w-1/2 bg-gray-200 rounded" />
        </View>
    </View>
);

const NotificationItem = ({ item }: { item: any }) => (
    <View className={`flex-row items-start p-4 mb-3 bg-white rounded-[10px] border ${item.isRead ? 'border-gray-100' : 'border-blue-100 bg-blue-50/10 border-l-4 border-l-blue-600'}`}>
        <View className={`w-10 h-10 rounded-full items-center justify-center mr-3`} style={{ backgroundColor: `${item.color}15` }}>
            <Ionicons name={item.icon} size={20} color={item.color} />
        </View>
        <View className="flex-1">
            <View className="flex-row justify-between items-start">
                <Text className={`text-sm font-bold mb-1 flex-1 mr-2 ${item.isRead ? 'text-gray-800' : 'text-blue-900'}`}>
                    {item.title}
                </Text>
                <Text className="text-xs text-gray-400">{item.timestamp}</Text>
            </View>
            <Text className="text-xs text-gray-500 leading-5">{item.description}</Text>
        </View>
    </View>
);

const NotificationsScreen = () => {
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Simulate API Load
        setTimeout(() => {
            setNotifications(notificationsData.notifications);
            setUnreadCount(notificationsData.unreadCount);
            setLoading(false);
        }, 2000);
    }, []);

    const markAllAsRead = () => {
        const updated = notifications.map(n => ({ ...n, isRead: true }));
        setNotifications(updated);
        setUnreadCount(0);
    };

    // Group Notifications
    const groupedNotifications = notifications.reduce((acc: any, curr) => {
        (acc[curr.dateGroup] = acc[curr.dateGroup] || []).push(curr);
        return acc;
    }, {});

    const groups = ['Today', 'Yesterday', 'This Week', 'Earlier'];

    const MarkReadButton = (
        <TouchableOpacity
            onPress={markAllAsRead}
            disabled={unreadCount === 0}
        >
            <Text className={`text-sm font-bold ${unreadCount > 0 ? 'text-blue-200' : 'text-gray-500'}`}>
                Mark all as read
            </Text>
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper title="Notifications" headerRight={MarkReadButton}>

            <ScrollView className="flex-1 px-6 pt-2" showsVerticalScrollIndicator={false}>
                {loading ? (
                    <View className="mt-4">
                        {[1, 2, 3, 4, 5].map(i => <SkeletonNotification key={i} />)}
                    </View>
                ) : (
                    <View className="pb-24 mt-2">
                        {groups.map(group => {
                            const groupItems = groupedNotifications[group];
                            if (!groupItems || groupItems.length === 0) return null;

                            return (
                                <View key={group} className="mb-6">
                                    <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                                        {group}
                                    </Text>
                                    {groupItems.map((item: any) => (
                                        <NotificationItem key={item.id} item={item} />
                                    ))}
                                </View>
                            );
                        })}

                        {notifications.length === 0 && (
                            <View className="items-center justify-center mt-20">
                                <Ionicons name="notifications-off-outline" size={48} color="#cbd5e1" />
                                <Text className="text-gray-400 mt-4">You're all caught up</Text>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>
        </ScreenWrapper>
    );
};

export default NotificationsScreen;
