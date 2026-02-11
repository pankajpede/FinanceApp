import React, { useState, useRef, useEffect } from 'react';
import Slide1 from '../../assets/images/splash/slide-1.svg';
import Slide2 from '../../assets/images/splash/slide-2.svg';
import Slide3 from '../../assets/images/splash/slide-3.svg';

console.log('Slide1 type:', typeof Slide1, Slide1);

import {
    View,

    FlatList,
    useWindowDimensions,
    TouchableOpacity,
    Image,
    NativeSyntheticEvent,
    NativeScrollEvent,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    SharedValue,
    withDelay,
    runOnJS,
    Easing,
    Extrapolation,
    interpolate,
    withRepeat,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Button, Text } from '../../services/UIComponents';
import { Lightbulb } from 'lucide-react-native';

// ==========================================
// Slide Data & Interfaces (Existing)
// ==========================================
interface Slide {
    id: string;
    title: string;
    subtitle: string;
    image: React.FC<any>;
}

const slides: Slide[] = [
    {
        id: '1',
        title: 'All your finances, one place',
        subtitle:
            'Manage savings, cards, and loans on Onella with clarity, security, and complete financial control.',
        image: Slide1,
    },
    {
        id: '2',
        title: 'Save, borrow, and grow',
        subtitle:
            'Access high-yield savings and loans with transparent options from multiple trusted banking partners.',
        image: Slide2,
    },
    {
        id: '3',
        title: 'One platform. Many banks.',
        subtitle:
            'Compare offers and choose what works best for your goals, lifestyle, and long-term plans.',
        image: Slide3,
    },
];


type SplashScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Splash'
>;

// ==========================================
// Components (Paginator)
// ==========================================
const Paginator = ({
    data,
    scrollX,
}: {
    data: Slide[];
    scrollX: SharedValue<number>;
}) => {
    const { width } = useWindowDimensions();

    return (
        <View className="flex-row h-16">
            {data.map((_, i) => {
                const animatedDotStyle = useAnimatedStyle(() => {
                    const dotWidth = withSpring(
                        scrollX.value > (i - 0.5) * width && scrollX.value < (i + 0.5) * width ? 30 : 10
                    );
                    const opacity = withSpring(
                        scrollX.value > (i - 0.5) * width && scrollX.value < (i + 0.5) * width ? 1 : 0.3
                    );
                    const backgroundColor = scrollX.value > (i - 0.5) * width && scrollX.value < (i + 0.5) * width ? '#01205f' : '#888';

                    return {
                        width: dotWidth,
                        opacity,
                        backgroundColor
                    };
                });

                return (
                    <Animated.View
                        key={i.toString()}
                        style={[animatedDotStyle, { height: 10, borderRadius: 5, marginHorizontal: 5 }]}
                    />
                );
            })}
        </View>
    );
};

// ==========================================
// Splash Overlay Component
// ==========================================
const SplashOverlay = ({ onFinish }: { onFinish: () => void }) => {
    const scale1 = useSharedValue(0);
    const scale2 = useSharedValue(0);
    const scale3 = useSharedValue(0);
    const containerOpacity = useSharedValue(1);

    // Initial delay before starting animation
    useEffect(() => {
        // Sequence of appearances
        // Circle 1 (Big, Low Opacity)
        scale1.value = withDelay(500, withSpring(1));

        // Circle 2 (Medium, higher opacity)
        scale2.value = withDelay(1000, withSpring(1));

        // Circle 3 (Small, high opacity)
        scale3.value = withDelay(1500, withSpring(1, {}, (finished) => {
            if (finished) {
                // Wait 3 seconds then fade out
                containerOpacity.value = withDelay(3000, withTiming(0, { duration: 800 }, (isFinished) => {
                    if (isFinished) {
                        runOnJS(onFinish)();
                    }
                }));
            }
        }));
    }, []);

    const circle1Style = useAnimatedStyle(() => ({
        transform: [{ scale: scale1.value }],
        opacity: 0.1,
    }));

    const circle2Style = useAnimatedStyle(() => ({
        transform: [{ scale: scale2.value }],
        opacity: 0.6,
    }));

    const circle3Style = useAnimatedStyle(() => ({
        transform: [{ scale: scale3.value }],
        opacity: 1,
    }));

    const containerStyle = useAnimatedStyle(() => ({
        opacity: containerOpacity.value,
    }));

    // Colors from request: #2B3674 (Blue), #51b051 (Green)
    return (
        <Animated.View style={[StyleSheet.absoluteFill, styles.splashContainer, containerStyle]}>
            {/* Background Overlay */}
            <View style={[StyleSheet.absoluteFill, { backgroundColor: '#01205f', opacity: 0.9 }]} />

            {/* Circle 1 - Biggest */}
            <Animated.View style={[styles.circle, { width: 300, height: 300, backgroundColor: '#c1d0f0ff', borderRadius: 150 }, circle1Style]} />

            {/* Circle 2 - Medium */}
            <Animated.View style={[styles.circle, { width: 220, height: 220, backgroundColor: '#b9c7e3ff', borderRadius: 110 }, circle2Style]} />

            {/* Circle 3 - Smallest with Content */}
            <Animated.View style={[styles.circle, { width: 150, height: 150, backgroundColor: '#edf1f9ff', borderRadius: 75, justifyContent: 'center', alignItems: 'center' }, circle3Style]}>
                {/* Provided CSS inspired Logo representation */}
                <View style={styles.innerLogo}>
                    <Lightbulb color="#01205f" size={40} />
                </View>
            </Animated.View>
        </Animated.View>
    );
};

// ==========================================
// Main Screen Component
// ==========================================
export default function SplashScreen() {
    const { width } = useWindowDimensions();
    const navigation = useNavigation<SplashScreenNavigationProp>();

    // State to toggle between Splash and Onboarding
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const slidesRef = useRef<FlatList>(null);

    const viewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: any[] }) => {
            if (viewableItems && viewableItems.length > 0) {
                setCurrentIndex(viewableItems[0].index);
            }
        }
    ).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollX.value = event.nativeEvent.contentOffset.x;
    };

    const scrollToNext = () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.replace('AuthLanding');
        }
    };

    const scrollToPrev = () => {
        if (currentIndex > 0) {
            slidesRef.current?.scrollToIndex({ index: currentIndex - 1 });
        }
    };

    const skip = () => {
        navigation.replace('AuthLanding');
    };

    // Auto-scroll logic
    useEffect(() => {
        if (!isSplashVisible && currentIndex < slides.length - 1) {
            const timer = setTimeout(() => {
                scrollToNext();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, isSplashVisible]);



    return (
        <SafeAreaView className="flex-1 bg-[#ffffff] relative">
            {/* Overlay Splash */}
            {isSplashVisible && (
                <View style={[StyleSheet.absoluteFill, { zIndex: 9999 }]}>
                    <SplashOverlay onFinish={() => setIsSplashVisible(false)} />
                </View>
            )}

            {/* Onboarding Content (Always rendered behind, revealed after splash) */}
            <View style={{ flex: 1, opacity: isSplashVisible ? 0 : 1 }}>
                {/* Skip Button */}
                <View className="w-full flex-row justify-end p-5">
                    <Button variant="ghost" onPress={skip}>
                        <Text className="text-gray-500 font-bold text-base">Skip</Text>
                    </Button>
                </View>

                {/* Slides */}
                <View className="flex-[3]">
                    <FlatList
                        data={slides}
                        renderItem={({ item }) => (
                            <View className="items-center justify-center p-5" style={{ width }}>
                                <View className="flex-[0.5] justify-center items-center w-full mb-0">
                                    {/* SVG Image Component */}
                                    <View className="w-full h-64 items-center justify-center">
                                        <item.image width={'80%'} height={'100%'} />
                                    </View>
                                </View>

                                <View className="flex-[0.3]">
                                    <Text variant="h3" className="text-center mb-3 text-black">
                                        {item.title}
                                    </Text>
                                    <Text variant="muted" className="text-center px-4 text-lg">
                                        {item.subtitle}
                                    </Text>
                                </View>
                            </View>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        bounces={false}
                        keyExtractor={(item) => item.id}
                        onScroll={scrollHandler}
                        onViewableItemsChanged={viewableItemsChanged}
                        viewabilityConfig={viewConfig}
                        ref={slidesRef}
                        scrollEventThrottle={32}
                    />
                </View>

                {/* Footer / Controls */}
                <View className="absolute bottom-[30px] w-full flex-row justify-between items-center px-8">
                    {/* Paginator (Left) */}
                    <View className="flex justify-center align-middle mb-0 absolute top-[15px] left-[25px]">
                        <Paginator data={slides} scrollX={scrollX} />
                    </View>

                    {/* Buttons (Right) */}
                    <View className="flex flex-1 justify-end flex-row items-center gap-1 mt-0">
                        {currentIndex > 0 && (
                            <Button variant="ghost" onPress={scrollToPrev}>
                                <Text className="text-gray-500 text-lg px-2">Back</Text>
                            </Button>
                        )}

                        <Button variant="default" onPress={scrollToNext} className="bg-primary dark:bg-white rounded-full h-12 px-6">
                            <Text className="text-white dark:text-black text-lg font-bold">
                                {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
                            </Text>
                        </Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    splashContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FDF5F2', // Same as background
    },
    circle: {
        position: 'absolute',
    },
    innerLogo: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
