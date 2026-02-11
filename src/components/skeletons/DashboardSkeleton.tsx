import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

const DashboardSkeleton = () => {
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
        <View className="flex-1 bg-[#F7F7F7]">
            {/* Header Skeleton with Carousel Placeholder */}
            <View className="bg-[#01205f] pt-[60px] pb-24 rounded-b-[36px] px-6">
                <View className="flex-row justify-between items-center mb-6">
                    <Animated.View className="flex-1 h-10 bg-white/20 rounded-full mr-4" style={{ opacity }} />
                    <Animated.View className="w-8 h-8 bg-white/20 rounded-full" style={{ opacity }} />
                </View>
            </View>

            {/* Carousel Skeleton - Overlapping */}
            <View className="-mt-20 mb-6">
                <Animated.View
                    className="self-center w-[85%] h-[220px] bg-gray-200 rounded-[24px]"
                    style={{ opacity, transform: [{ scale: 1 }] }}
                />
            </View>

            {/* Content Skeleton */}
            <View className="px-6 mt-4">
                <Animated.View className="h-8 w-40 bg-gray-200 rounded mb-4" style={{ opacity }} />
                <View className="flex-row">
                    <Animated.View className="w-40 h-32 bg-gray-200 rounded-[10px] mr-4" style={{ opacity }} />
                    <Animated.View className="w-40 h-32 bg-gray-200 rounded-[10px]" style={{ opacity }} />
                </View>
                <Animated.View className="h-60 w-full bg-gray-200 rounded-[10px] mt-6" style={{ opacity }} />
            </View>
        </View>
    );
};

export default DashboardSkeleton;
