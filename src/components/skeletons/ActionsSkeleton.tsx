import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

const ActionsSkeleton = () => {
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
                {/* Section Title */}
                <Animated.View className="h-4 w-24 bg-gray-200 rounded mb-4" style={{ opacity }} />

                {/* Action Items */}
                {[1, 2, 3, 4, 5].map((i) => (
                    <Animated.View key={i} className="h-20 w-full bg-gray-200 rounded-[10px] mb-4" style={{ opacity }} />
                ))}
            </View>
        </View>
    );
};

export default ActionsSkeleton;
