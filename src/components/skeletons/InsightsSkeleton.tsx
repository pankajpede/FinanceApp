import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

const InsightsSkeleton = () => {
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
            {/* Header */}
            <View className="bg-[#01205f] pt-[60px] pb-14 px-6">
                <Animated.View className="h-8 w-32 bg-white/20 rounded" style={{ opacity }} />
            </View>

            <View className="flex-1 bg-gray-50 -mt-10 rounded-t-[30px] p-6">
                {/* Chart Placeholder */}
                <Animated.View className="h-64 w-full bg-gray-200 rounded-[20px] mb-6" style={{ opacity }} />

                {/* List Items */}
                {[1, 2, 3].map((i) => (
                    <Animated.View key={i} className="h-24 w-full bg-gray-200 rounded-[15px] mb-4" style={{ opacity }} />
                ))}
            </View>
        </View>
    );
};

export default InsightsSkeleton;
