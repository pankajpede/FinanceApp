import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

const ActivitySkeleton = () => {
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
                {/* List Container */}
                <View className="bg-white rounded-[10px] p-2 border border-gray-100">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <View key={i} className="flex-row items-center py-4 px-3 border-b border-gray-50 last:border-0">
                            <Animated.View className="w-12 h-12 rounded-full bg-gray-200 mr-4" style={{ opacity }} />
                            <View className="flex-1">
                                <Animated.View className="h-4 w-3/4 bg-gray-200 rounded mb-2" style={{ opacity }} />
                                <Animated.View className="h-3 w-1/2 bg-gray-200 rounded" style={{ opacity }} />
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default ActivitySkeleton;
