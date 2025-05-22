import { Tabs } from 'expo-router';
import { Chrome as Home, Search, ShoppingBag, Sparkles } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.lightGray,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter_500Medium',
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontFamily: 'Poppins_600SemiBold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} strokeWidth={2} />
          ),
          headerTitle: 'AutoDinar',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Search color={color} size={size} strokeWidth={2} />
          ),
          headerTitle: 'Explore',
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag color={color} size={size} strokeWidth={2} />
          ),
          headerTitle: 'My Orders',
        }}
      />
      <Tabs.Screen
        name="ai-picks"
        options={{
          title: 'AI Picks',
          tabBarIcon: ({ color, size }) => (
            <Sparkles color={color} size={size} strokeWidth={2} />
          ),
          headerTitle: 'AI Recommendations',
        }}
      />
    </Tabs>
  );
}