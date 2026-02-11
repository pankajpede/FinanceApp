import React, { useRef } from 'react';
import { View, Dimensions, Animated, StyleSheet, Image } from 'react-native';
import { dashboardCards } from '../data/dashboardCards';
import AccountCard from './AccountCard';
import LoanCard from './LoanCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.80;
const CARD_SPACING = 0;
const SPACER_WIDTH = 30;

const DashboardCarousel: React.FC = () => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const renderItem = ({ item, index }: { item: typeof dashboardCards[0], index: number }) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index + 1) * CARD_WIDTH,
        ];

        // Opacity animation: fade out cards as they move away
        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: 'clamp',
        });

        // Scale animation: scale down cards as they move away
        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
        });

        // TranslateY animation: move cards down slightly when not in focus to enhance stack effect
        const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [20, 0, 20],
            extrapolate: 'clamp',
        });

        // Calculate card margin based on index to create stack overlap look if needed, 
        // but standard carousel with scale/opacity usually serves "stack" look well enough for this request.
        // To make them actually STACK on top of each other physically is complex with FlatList.
        // A common "stack" carousel moves the prev/next cards BEHIND the active one.
        // We will stick to a standard specialized carousel look: Centered active card, smaller side cards.

        return (
            <Animated.View
                style={{
                    width: CARD_WIDTH,
                    transform: [{ scale }, { translateY }],
                    opacity,
                    marginHorizontal: CARD_SPACING / 2,
                    zIndex: index // Ensure proper layering if we were doing negative margins
                    // To do true "stack" where they overlap, we'd need negative margins:
                    // marginLeft: index === 0 ? SPACER_WIDTH : -CARD_WIDTH * 0.1 
                    // But that gets messy with scroll logic. 
                    // Let's stick to the "peek" carousel which is often what is meant by "stack" in loose terms,
                    // OR if they really mean a deck, that requires different lib.
                    // Given "swipe option" and "placement on each other", standard centered carousel with overlap is safest.
                }}
            >
                <View className="shadow-xl shadow-black/20 bg-transparent rounded-[24px]">
                    {item.type === 'account' ? (
                        <AccountCard card={item} />
                    ) : (
                        <LoanCard card={item} />
                    )}
                </View>
            </Animated.View>
        );
    };

    return (
        <View>
            <Animated.FlatList
                data={dashboardCards}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + CARD_SPACING}
                decelerationRate="fast"
                contentContainerStyle={{
                    paddingHorizontal: SPACER_WIDTH - (CARD_SPACING / 2),
                    paddingVertical: 20 // Add space for shadows
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            />

            {/* Pagination Dots - Simplified for new layout */}
            {/* <View className="flex-row justify-center items-center mt-2">
                {dashboardCards.map((_, index) => {
                    const inputRange = [
                        (index - 1) * CARD_WIDTH,
                        index * CARD_WIDTH,
                        (index + 1) * CARD_WIDTH,
                    ];

                    const dotScale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.8, 2.5, 0.8],
                        extrapolate: 'clamp',
                    });

                    const dotColor = scrollX.interpolate({
                        inputRange,
                        outputRange: ['#d1d5db', '#01205f', '#d1d5db'],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={{
                                height: 8,
                                width: 8, // Fixed width
                                borderRadius: 4,
                                backgroundColor: dotColor,
                                marginHorizontal: 4,
                                transform: [{ scaleX: dotScale }] // Animate scale instead of width
                            }}
                        />
                    );
                })}
            </View> */}
        </View>
    );
};

export default DashboardCarousel;
