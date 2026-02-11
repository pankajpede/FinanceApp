import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Activity, User } from 'lucide-react-native';
import { Dimensions, View } from 'react-native';

// Import Screens
import InsightsScreen from '../screens/InsightsScreen';
import ActionsScreen from '../screens/ActionsScreen';
import ActivityScreen from '../screens/ActivityScreen';
import ProfileScreen from '../screens/ProfileScreen';

// EXISTING Home Screen (Ref: ClientDashboard)
import ClientDashboard from '../client-dashboard/ClientDashboard';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const ClientTabNavigator = () => {

    // Updated TabIcon to accept 'icon' as a React Node
    const TabIcon = ({ focused, icon }: { focused: boolean, icon: React.ReactNode }) => {
        if (focused) {
            return (
                <View className="bg-[#01205f] w-12 h-12 rounded-full items-center justify-center shadow-lg shadow-blue-900/40" style={{ transform: [{ translateY: -2 }] }}>
                    {icon}
                </View>
            );
        }
        return icon;
    };

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 5,
                    backgroundColor: 'white',
                    borderRadius: 40,
                    height: 70,
                    width: width - 40,
                    marginHorizontal: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.15,
                    shadowRadius: 10,
                    borderTopWidth: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                tabBarItemStyle: {
                    height: 70,
                    paddingTop: 15,
                    paddingLeft: 10,
                }
            }}
        >

            <Tab.Screen
                name="Actions"
                component={ActionsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={<MaterialCommunityIcons name="lightbulb-outline" size={24} color={focused ? "white" : "#64748b"} />}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Insights"
                component={InsightsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={<Ionicons name="pie-chart-outline" size={24} color={focused ? "white" : "#64748b"} />}
                        />
                    )
                }}
            />

            {/* CENTER HOME TAB */}
            <Tab.Screen
                name="Home"
                component={ClientDashboard}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={<Ionicons name="home-outline" size={24} color={focused ? "white" : "#64748b"} />}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Activity"
                component={ActivityScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={<Activity size={24} color={focused ? "white" : "#64748b"} />}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={<User size={24} color={focused ? "white" : "#64748b"} />}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default ClientTabNavigator;
