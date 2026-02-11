import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

const ProfileSkeleton = () => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    return (
        <View className="flex-1 bg-white">
            {/* Header Profile Info - Matches ScreenWrapper header */}
            <View className="bg-[#01205f] pt-[60px] pb-14 px-6 items-center">
                <Animated.View className="w-24 h-24 rounded-full bg-white/20 mb-4" style={{ opacity }} />
                <Animated.View className="h-6 w-40 bg-white/20 rounded mb-2" style={{ opacity }} />
                <Animated.View className="h-4 w-32 bg-white/20 rounded" style={{ opacity }} />
            </View>

            {/* Content Area - Matches ScreenWrapper overlap */}
            <View className="flex-1 bg-gray-50 -mt-10 rounded-t-[30px] p-6 overflow-hidden">
                {/* Profile Options */}
                {[1, 2, 3, 4].map((i) => (
                    <Animated.View key={i} className="h-16 w-full bg-gray-200 rounded-[10px] mb-4" style={{ opacity }} />
                ))}
            </View>
        </View>
    );
};

export default ProfileSkeleton;
