import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Button, Text } from '../../services/UIComponents';

import { Lightbulb } from 'lucide-react-native';
import { AntDesign } from '@expo/vector-icons';
import { FcGoogle, GoogleIcon } from '../../components/icons/GoogleIcon';

type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AuthLandingScreen() {
    const navigation = useNavigation<AuthScreenNavigationProp>();

    return (
        <SafeAreaView className="flex-1 bg-white px-6 justify-center mb-6">
            {/* Logo Section */}
            <View className="items-start mb-12">
                <View className="flex-row items-center justify-center mb-3">
                    {/* Placeholder Logo Icon */}
                    <View className="w-10 h-10 bg-primary rounded-lg mr-3 items-center justify-center">
                        <Lightbulb color="white" size={17} />
                    </View>
                    <Text className="text-2xl font-bold text-primary">Onella</Text>
                </View>

                <Text className="text-start text-gray-500 text-lg pr-4">
                    Onella is an authentication platform delivering a smooth login experience.
                </Text>
            </View>

            {/* Main Actions */}
            <View className="gap-4 w-full">
                <Button
                    className="bg-primary rounded-xl"
                    size="lg"
                    onPress={() => navigation.navigate('Login')}
                    label="Login"
                />

                <Button
                    variant="outline"
                    className="rounded-xl border-gray-300"
                    size="lg"
                    onPress={() => navigation.navigate('SignUp')}
                    label="Sign up"
                />
            </View>

            {/* Divider */}
            <View className="flex-row items-center my-8">
                <View className="flex-1 h-[1px] bg-gray-300" />
                <Text className="mx-4 text-gray-400 text-lg text-center">Or</Text>
                <View className="flex-1 h-[1px] bg-gray-300" />
            </View>

            {/* Social Logins */}
            <View className="gap-4">
                <Button variant="outline" size='lg' className="rounded-xl border-gray-300 flex-row gap-2 justify-center" onPress={() => { }}>
                    <GoogleIcon width={20} height={20} />
                    <Text className="text-black font-medium">Continue with Google</Text>
                </Button>

                <Button variant="outline" size='lg' className="rounded-xl border-gray-300 flex-row gap-2 justify-center" onPress={() => { }}>
                    <AntDesign name="apple" size={20} color="black" />
                    <Text className="text-black font-medium">Continue with Apple</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}
